<template>
  <div>
    <card>
      <h2 class="card-title">Distribution Input</h2>
      <form>
        <div class="form-row">
          <div class="col text-center">
            <table class="text-center">
              <tr v-for="(row, i) in userDistribution" :key="i">
                <td v-for="(data, j) in userDistribution[i]" :key="j">
                  <base-input
                    v-validate="modelValidations.userInput"
                    type="number"
                    min="0"
                    step="1"
                    v-model="userDistribution[i][j]"
                    :error="getError('input-' + i + '-' + j)"
                    :name="'input-' + i + '-' + j"
                  ></base-input>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="form-row">
          <div class="col text-center">
            <h6>Width</h6>
            <base-button type="primary" @click="addWidth()">+</base-button>
            <base-button type="primary" @click="removeWidth()">-</base-button>
          </div>

          <div class="col text-center">
            <h6>Height</h6>
            <base-button type="primary" @click="addHeight()">+</base-button>
            <base-button type="primary" @click="removeHeight()">-</base-button>
          </div>
        </div>
      </form>
    </card>

    <card>
      <h2 class="card-title">Area To Area Flow Mapping</h2>
      <form>
        <div class="form-row" v-for="(mapping , index) in areaMappings" :key="index">
          <div class="col">
            <base-input type="number" step="1" v-validate="modelValidations.userInput" name="'From-'+index" label="From" v-model="mapping.from"></base-input>
          </div>
          <div class="col">
            <base-input type="number" step="1" v-validate="modelValidations.userInput" name="'To-'+index" label="To" v-model="mapping.to"></base-input>
          </div>
          <div class="col">
            <base-input type="number" step="1" v-validate="modelValidations.userInput" name="'Flow-'+index" label="Value" v-model="mapping.value"></base-input>
          </div>

        </div>


        <div class="form-row">
          <h6></h6>
          <div class="col text-center">
            <base-button type="primary" @click="addMapping()">+</base-button>
          </div>
          <div class="col text-center">
            <base-button type="primary" @click="removeMapping()">-</base-button>
          </div>
        </div>
      </form>
    </card>

    <card>
      <h2 class="card-title">Basic Data</h2>
      <form>
        <div class="form-row">
          <div class="col">
            <base-input
              type="number"
              placeholder="Area size"
              min="0.1"
              step="0.1"
              v-model="areaSize"
              label="Grid Size (meters)"
            />
          </div>
        </div>
      </form>
    </card>





    <div class="row" id="result-display">
      <card class="text-center">
        <h2 class="card-title">Current Distribution</h2>
        <div class="dist-container">
          <svg
            x="0"
            y="0"
            height="100%"
            width="100%"
            :viewBox="
              '0 0 ' +
                displayDistribution[0].length * 100 * 1 +
                ' ' +
                displayDistribution.length * 100 * 1
            "
          >
            <rect
              v-for="element in distToDraw(displayDistribution)"
              :key="element.id"
              :x="element.j * 100"
              :y="element.i * 100"
              width="100"
              height="100"
              :style="{
                fill: element.color,
                stroke: 'black',
                strokeWidth: 1,
                fillOpacity: 1,
                strokeOpacity: 1
              }"
            ></rect>
          </svg>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import EasyPZ from "easypz";

export default {
  data() {
    return {
      displayDistribution: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 2],
        [0, 1, 1, 1, 2],
        [0, 1, 1, 1, 2],
        [0, 1, 1, 1, 2]
      ],
      distributions: [],
      userDistribution: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      areaMappings: [
        {
          from: 0,
          to: 0,
          value: 0
        }
      ],
      areaSize: 1,
      modelValidations: {
        userInput: {
          integer: true
        }
      }
    };
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    removeWidth() {
      for (let arr of this.userDistribution) {
        arr.pop();
      }
    },
    addWidth() {
      var size = this.userDistribution[0].length;
      for (let arr of this.userDistribution) {
        arr.splice(size, 0, 0);
      }
    },
    addHeight() {
      var size = this.userDistribution[0].length;
      var arr = new Array();
      for (let i = 0; i < size; i++) {
        arr.push(0);
      }
      this.userDistribution.push(arr);
    },
    removeHeight() {
      this.userDistribution.pop();
    },
    addMapping(){
      this.areaMappings.push( {
          from: 0,
          to: 0,
          value: 0
        });
    },
    removeMapping(){
      this.areaMappings.pop();
    },
    distToDraw(distribution){
      var list = new Array();
      var valueSet = new Object();
      for (var i = 0; i < distribution.length; i++) {
        for (var j = 0; j < distribution[i].length; j++) {
          var value = distribution[i][j];
          if (value in valueSet) {
            var elem = {
              id: i + "-" + j,
              value: distribution[i][j],
              i: i,
              j: j,
              color: valueSet[value]
            };
            list.push(elem);
          } else {
            var hue =
              "rgb(" +
              Math.floor(Math.random() * 256) +
              "," +
              Math.floor(Math.random() * 256) +
              "," +
              Math.floor(Math.random() * 256) +
              ")";
            valueSet[value] = hue;
            var elem = {
              id: i + "-" + j,
              value: distribution[i][j],
              i: i,
              j: j,
              color: hue
            };
            list.push(elem);
          }
        }
      }
      /* console.log(list); */
      return list;
    }
  },
  computed: {

  }
};
</script>

<style scoped>
.dist-container {
  height: 250px !important;
}

td {
  min-width: 100px;
}

table {
  width: 100%;
  display: block;
  overflow: auto;
}
</style>

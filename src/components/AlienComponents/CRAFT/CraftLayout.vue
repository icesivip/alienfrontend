<template>
  <div>
    <card class="text-center">
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
                    class="user-input"
                  ></base-input>
                </td>
              </tr>
            </table>
          </div>

          <!--           <div class="col text-center">
            <div class="view-table text-center">
              <div class="view-row" v-for="(row, i) in userDistribution" :key="i">
                <base-input v-for="(data, j) in userDistribution[i]" :key="j"
                    v-validate="modelValidations.userInput"
                    type="number"
                    min="0"
                    step="1"
                    v-model="userDistribution[i][j]"
                    :error="getError('input-' + i + '-' + j)"
                    :name="'input-' + i + '-' + j"
                    class="user-input"
                  ></base-input>
              </div>
            </div>
          </div> -->
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

    <card class="text-center">
      <h2 class="card-title">Area To Area Flow Mapping</h2>
      <form>
        <div
          class="form-row"
          v-for="(mapping, index) in areaMappings"
          :key="index"
        >
          <div class="col">
            <base-input
              type="number"
              step="1"
              v-validate="modelValidations.userInput"
              name="'From-'+index"
              label="From"
              v-model="mapping.from"
              min="0"
            ></base-input>
          </div>
          <div class="col">
            <base-input
              type="number"
              step="1"
              v-validate="modelValidations.userInput"
              name="'To-'+index"
              label="To"
              v-model="mapping.to"
              min="0"
            ></base-input>
          </div>
          <div class="col">
            <base-input
              type="number"
              step="1"
              v-validate="modelValidations.userInput"
              name="'Flow-'+index"
              label="Value"
              v-model="mapping.value"
              min="0"
            ></base-input>
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

    <card class="text-center">
      <h2 class="card-title">
        Fixed Areas
      </h2>
      <form>
        <div class="form-row" v-for="(n, index) in fixedAreas" :key="index">
          <div class="col">
            <base-input
              type="number"
              min="0"
              step="1"
              v-model="fixedAreas[index]"
              :label="'Fixed Area # ' + index"
            ></base-input>
          </div>
        </div>

        <div class="form-row">
          <h6></h6>
          <div class="col text-center">
            <base-button type="primary" @click="addFixedArea()">+</base-button>
          </div>
          <div class="col text-center">
            <base-button type="primary" @click="removeFixedArea()"
              >-</base-button
            >
          </div>
        </div>
      </form>
    </card>

    <card class="text-center">
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

    <card class="text-center">
      <base-button type="primary" class="expand" @click="log()"
        >Solve!</base-button
      >
    </card>

    <hr />

    <div v-if="distributions.length > 0">
      <!--       <slider ref="slider"
        v-model="selectedDistribution"
        :options="{step: 1}"
        v-bind:range="{min: 0 , max:sliderMax}"
        @input="updateSelectedDist()"
        type="success"
      >
      </slider> -->

      <!--             <slider
        v-model="selected"
        :options="{ step: 1 }"
        :range="{ min: 0, max: distributions.length - 1 }"
      >
      </slider> -->

      <card class="text-center">
        <h2 class="card-title">Current Distribution</h2>
        <form>
          <div class="form-row">
            <div class="col">
              <h6>Distribution Selector</h6>
              <el-select
                class="select-danger"
                placeholder="Select Distribution"
                v-model="selectedDistribution"
              >
                <el-option
                  v-for="(value, index) in distributions"
                  class="default"
                  :value="index"
                  :label="index"
                  :key="index"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </form>
        <hr />

        <div class="dist-container">
          <svg
            x="0"
            y="0"
            height="100%"
            width="100%"
            :viewBox="
              '0 0 ' +
                distributions[selectedDistribution].distribution[0].length *
                  100 *
                  1 +
                ' ' +
                distributions[selectedDistribution].distribution.length *
                  100 *
                  1
            "
          >
            <rect
              v-for="element in distToDraw(
                distributions[selectedDistribution].distribution
              )"
              :key="'grid-' + element.id"
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

            <circle
              v-for="element in distToDraw(
                distributions[selectedDistribution].distribution
              )"
              :key="'circle-' + element.id"
              :cx="element.j * 100 + 50"
              :cy="element.i * 100 + 50"
              r="30"
              stroke="black"
              stroke-width="1"
              fill="white"
            />

            <text
              :x="element.j * 100 + 40"
              :y="element.i * 100 + 63"
              font-family="Univers"
              font-size="35"
              font-weight="bold"
              v-for="element in distToDraw(
                distributions[selectedDistribution].distribution
              )"
              :key="'txt-' + element.id"
            >
              {{ element.value }}
            </text>
          </svg>
        </div>
        <hr />
        <div>
          <h6>Logistic Cost:</h6>
          <p>{{ distributions[selectedDistribution].cost }}</p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import EasyPZ from "easypz";
import { Slider } from "src/components";
import axios from "axios";
import { Select, Option } from "element-ui";
export default {
  data() {
    return {
      colorMap: {},
      distributions: [
      ],
      selectedDistribution: 0,
      userDistribution: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      areaMappings: [],
      fixedAreas: [],
      areaSize: 1,
      selected: 0,
      modelValidations: {
        userInput: {
          integer: true
        }
      }
    };
  },

  components: {
    slider: Slider,
    [Select.name]: Select,
    [Option.name]: Option
  },
  methods: {
    log() {
      axios
        .post("http://proyectovip.icesi.edu.co/craft", this.requestBody)
        .then(response => {
          console.log(response);

          response.data.distributions.sort(function(a, b) {
            if (a.cost > b.cost) {
              return 1;
            }
            if (b.cost > a.cost) {
              return -1;
            }
            return 0;
          });
          this.distributions = response.data.distributions;
          /*           this.$refs.slider.noUiSlider.updateOptions(this.sliderOptions); */
        })
        .catch(e => {
          console.log(e);
        });

      /*       axios
        .post(`http://localhost:8080/craft`, {
          data: this.requestBody
        })
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
                this.errors.push(e)
        }); */
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    updateSelectedDist() {
      this.selectedDistribution = Math.round(this.selectedDistribution);
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
    addMapping() {
      this.areaMappings.push({
        from: 0,
        to: 0,
        value: 0
      });
    },
    removeMapping() {
      this.areaMappings.pop();
    },
    addFixedArea() {
      this.fixedAreas.push(0);
    },
    removeFixedArea() {
      this.fixedAreas.pop();
    },
    distToDraw(distribution) {
      var list = new Array();
      for (var i = 0; i < distribution.length; i++) {
        for (var j = 0; j < distribution[i].length; j++) {
          var value = distribution[i][j];
          if (value in this.colorMap) {
            var elem = {
              id: i + "-" + j,
              value: distribution[i][j],
              i: i,
              j: j,
              color: this.colorMap[value]
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
            this.colorMap[value] = hue;
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
    requestBody() {
      var mappings = new Object();
      for (let map of this.areaMappings) {
        var key = map.from + "-" + map.to;
        mappings[key] = map.value;
      }

      return {
        areaMappings: mappings,
        areaSize: this.areaSize,
        distribution: this.userDistribution,
        maxSwapAttempts: 500,
        nonSwappableAreas: this.fixedAreas
      };
    },
    sliderMax() {
      return this.distributions.length - 1;
    }
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

tr {
  width: 100%;
}

.expand {
  width: 100%;
}

table {
  width: 100%;
  display: block;
  overflow: auto;
}

.user-input {
  padding: 5px;

  min-width: 100px;
}

.view-table {
  display: block;
  width: 100%;
  overflow: auto;
}
.view-row {
  display: table-row;
  width: 100% !important;
}
.view-row > div {
  display: table-cell;
}
.view-name {
  text-align: center;
}
</style>

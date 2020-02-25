<template>
  <div>
    <card class="text-center">
      <h2 class="card-title">
        Variables
      </h2>
      <div class="row">
        <div class="table-responsive">
          <table class="text-center table">
            <thead>
              <tr>
                <th>
                  <p>Variable</p>
                </th>
                <th>
                  <p>
                    Type
                  </p>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(coef, i) in model.objectiveFunction.coefficients"
                :key="i"
              >
                <td>
                  <p>
                    X<sub>{{ i + 1 }}</sub>
                  </p>
                </td>
                <td>
                  <el-select
                    placeholder="Function Type"
                    v-model="model.variables[i]"
                    @change="emitModel"
                  >
                    <el-option
                      v-for="(option, i) in variableTypes"
                      :key="i"
                      :value="option"
                      :label="option"
                    >
                    </el-option>
                    <!-- <el-option
                      value="Continuous"
                      label="Continuous"
                      key="Continuous"
                    >
                    </el-option>
                    <el-option value="Integer" label="Integer" key="Integer">
                    </el-option>
                    <el-option value="Binary" label="Binary" key="Binary">
                    </el-option> -->
                  </el-select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <base-button type="primary" block @click="addVariable()">
            Add Variable
          </base-button>
        </div>
        <div class="col">
          <base-button type="primary" block @click="removeVariable()">
            Remove Variable
          </base-button>
        </div>
      </div>
    </card>

    <card class="text-center">
      <h2 class="card-title">Objective Function</h2>
      <div class="table-responsive">
        <table class="text-center table">
          <thead>
            <tr>
              <th id="type">
                <p>Type</p>
              </th>
              <th
                v-for="(coef, i) in model.objectiveFunction.coefficients"
                :key="i"
              >
                <p>
                  X<sub>{{ i + 1 }}</sub>
                </p>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td id="type">
                <el-select
                  placeholder="Function Type"
                  v-model="model.objectiveFunction.type"
                  @change="emitModel"
                >
                  <el-option
                    class="select-success"
                    value="Maximize"
                    label="Maximize"
                    key="Maximize"
                  >
                  </el-option>
                  <el-option
                    class="select-danger"
                    value="Minimize"
                    label="Minimize"
                    key="Minimize"
                  >
                  </el-option>
                </el-select>
              </td>
              <td
                v-for="(coef, i) in model.objectiveFunction.coefficients"
                :key="i"
              >
                <base-input
                  type="number"
                  step="1"
                  v-model="model.objectiveFunction.coefficients[i]"
                  :name="'input-' + i"
                  class="user-input"
                  @change="emitModel"
                ></base-input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>

    <card class="text-center">
      <h2 class="card-title">Contraints</h2>
      <div class="table-responsive">
        <table class="text-center table">
          <thead>
            <tr>
              <th v-for="(variable, i) in model.variables" :key="i">
                <p>
                  X<sub>{{ i + 1 }}</sub>
                </p>
              </th>

              <th>
                Type
              </th>

              <th>
                Limit
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(constraint, i) in model.constraints" :key="i">
              <td v-for="(variable, j) in model.variables" :key="j">
                <base-input
                  type="number"
                  step="0.01"
                  v-model="model.constraints[i].coefficients[j]"
                  :name="'Constraint_' + i + '_' + j"
                  class="user-input"
                  @change="emitModel"
                ></base-input>
              </td>

              <td>
                <el-select
                  placeholder="Type"
                  v-model="model.constraints[i].type"
                  @change="emitModel"
                >
                  <el-option class="select" value="<=" label="<=" key="<=">
                  </el-option>
                  <el-option class="select" value=">=" label=">=" key=">=">
                  </el-option>
                  <el-option class="select" value="=" label="=" key="=">
                  </el-option>
                </el-select>
              </td>

              <td>
                <base-input
                  type="number"
                  step="0.01"
                  v-model="model.constraints[i].limit"
                  :name="'Constraint_limit_' + i"
                  class="user-input"
                  @change="emitModel"
                ></base-input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col">
          <base-button type="primary" block @click="addConstraint()">
            Add Constraint
          </base-button>
        </div>
        <div class="col">
          <base-button type="primary" block @click="removeConstraint()">
            Remove Constraint
          </base-button>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import EasyPZ from "easypz";
import axios from "axios";
import { Select, Option } from "element-ui";
import swal from "sweetalert2";
export default {
  data() {
    return {
      model: Object,
      modelType: "Mixed",
      minVars: 2,
      maxVars: Infinity
    };
  },
  created:function(){
    this.model={
        objectiveFunction: { coefficients: [1, 1], type: "Maximize" },
        constraints: [{ coefficients: [1, 1], type: "<=", limit: 10 }],
        variables: ["Continuous", "Continuous"]
      }
      this.emitModel()
  },

  components: {},
  methods: {
    emitModel(){
      this.$emit("input", this.model);
    },
    addVariable() {
      if (this.model.variables.length < this.maxVars) {
        this.model.objectiveFunction.coefficients.push(1);
        this.model.constraints.forEach(element => element.coefficients.push(1));
        this.model.variables.push("Continuous");
        this.emitModel()
      } else {
        swal({
          type: "error",
          title: "Error",
          text:
            "Maximum number of variables for this solver exceeded.Can't add."
        });
      }
    },
    removeVariable() {
      if (this.model.variables.length > this.minVars) {
        this.model.objectiveFunction.coefficients.pop();
        this.model.constraints.forEach(element => element.coefficients.pop());
        this.model.variables.pop();
        this.emitModel()
      } else {
        swal({
          type: "error",
          title: "Error",
          text:
            "Minimum number of variables for this solver reached. Can't delete."
        });
      }
    },
    removeConstraint() {
      this.model.constraints.pop();
      this.emitModel()
    },
    addConstraint() {
      this.model.constraints.push({
        coefficients: Array(this.model.variables.length).fill(1),
        type: "<=",
        limit: 10
      });
      this.emitModel()
    }
  },
  computed: {
    variableTypes() {
      if (this.modelType == "Mixed") {
        return ["Continuous", "Binary", "Integer"];
      } else {
        return ["Continuous"];
      }
    }
  },
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  }
};
</script>

<style scoped>
.expand {
  width: 100%;
}

td {
  padding: 5px;
}

#type {
  min-width: 150px;
}

.user-input {
  padding: 1px;
  vertical-align: center;
  min-width: 100px;
  margin: 0;
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

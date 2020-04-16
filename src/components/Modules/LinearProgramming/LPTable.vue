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
                  <el-tooltip
                    content="Choose the type of variable for your problem."
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <el-select
                    class="select-primary"
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
                    </el-select>
                  </el-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <el-tooltip
            content="This is used to add a variable to the model."
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button type="primary" block @click="addVariable()">
              Add Variable
            </base-button>
          </el-tooltip>
        </div>
        <div class="col">
          <el-tooltip
            content="This is used to remove a variable from the model."
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button type="primary" block @click="removeVariable()">
              Remove Variable
            </base-button>
          </el-tooltip>
        </div>
      </div>
    </card>

    <card class="text-center">
      <h2 class="card-title">Objective Function</h2>
      <h5>Z = &#8721; W<sub>i</sub> * X<sub>i</sub></h5>
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
                <el-tooltip
                  content="Use this to select the type of model you want to solve (Minimize or Maximize)."
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <el-select
                  class="select-primary"
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
                </el-tooltip>
              </td>
              <td
                v-for="(coef, i) in model.objectiveFunction.coefficients"
                :key="i"
              >
                <el-tooltip
                  content="Here you can adjust the coefficient of every variable in the objective function."
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-input
                    type="number"
                    step="1"
                    v-model="model.objectiveFunction.coefficients[i]"
                    :name="'input-' + i"
                    class="user-input"
                    @change="emitModel"
                  ></base-input>
                </el-tooltip>
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
                <el-tooltip
                  content="Here you can adjust the coefficient of every variable in every constraint."
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-input
                    type="number"
                    step="0.01"
                    v-model="model.constraints[i].coefficients[j]"
                    :name="'Constraint_' + i + '_' + j"
                    class="user-input"
                    @change="emitModel"
                  ></base-input>
                </el-tooltip>
              </td>

              <td>
                <el-tooltip
                  content="Here you can select the type of constraint you want."
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <el-select
                  class="select-primary"
                    placeholder="Type"
                    v-model="model.constraints[i].type"
                    @change="emitModel"
                  >
                    <el-option class="select" value="<=" :label="'\u2264'" key="<=">
                    </el-option>
                    <el-option class="select" value=">=" :label="'\u2265'" key=">=">
                    </el-option>
                    <el-option class="select" value="=" label="=" key="=">
                    </el-option>
                  </el-select>
                </el-tooltip>
              </td>

              <td>
                <el-tooltip
                  content="This input allows you to adjust the limit for any constraint."
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-input
                    type="number"
                    step="0.01"
                    v-model="model.constraints[i].limit"
                    :name="'Constraint_limit_' + i"
                    class="user-input"
                    @change="emitModel"
                  ></base-input>
                </el-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col">
          <el-tooltip
            content="Use this to add a constraint to your model."
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button type="primary" block @click="addConstraint()">
              Add Constraint
            </base-button>
          </el-tooltip>
        </div>
        <div class="col">
          <el-tooltip
            content="Use this to remove a constraint from your model."
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button type="primary" block @click="removeConstraint()">
              Remove Constraint
            </base-button>
          </el-tooltip>
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
  props: ["maximumVars", "problemType"],
  data() {
    return {
      model: Object,
      modelType: this.problemType || "Mixed",
      minVars: 2,
      maxVars: this.maximumVars || Infinity
    };
  },
  created: function() {
    this.model = {
      objectiveFunction: { coefficients: [1,1 ], type: "Maximize" },
      constraints: [{ coefficients: [1, 1], type: "<=", limit: 1 }],
      variables: ["Continuous", "Continuous"]
    };
    this.emitModel();
  },

  components: {},
  methods: {
    emitModel() {
      this.$emit("input", this.model);
    },
    addVariable() {
      console.log(this.maxVars);
      if (this.model.variables.length < this.maxVars) {
        this.model.objectiveFunction.coefficients.push(1);
        this.model.constraints.forEach(element => element.coefficients.push(1));
        this.model.variables.push("Continuous");
        this.emitModel();
      } else {
        swal({
          type: "error",
          title: "Error",
          text:
            "Maximum number of variables for this solver exceeded. Can't add."
        });
      }
    },
    removeVariable() {
      if (this.model.variables.length > this.minVars) {
        this.model.objectiveFunction.coefficients.pop();
        this.model.constraints.forEach(element => element.coefficients.pop());
        this.model.variables.pop();
        this.emitModel();
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
      this.emitModel();
    },
    addConstraint() {
      this.model.constraints.push({
        coefficients: Array(this.model.variables.length).fill(1),
        type: "<=",
        limit: 10
      });
      this.emitModel();
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

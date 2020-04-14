<template>
  <div>
    <div class="col-12" align="center">
      <h1>Simplex Method</h1>
    </div>
    <div class="col-12" align="center">
      <el-tooltip
        content="Know when and how to use it"
        effect="light"
        :open-delay="300"
        placement="top"
      >
        <base-button type="primary" @click.native="modals.notice = true">About</base-button>
      </el-tooltip>
    </div>
    <modal :show.sync="modals.notice" footerClasses="justify-content-center" type="notice">
      <h5 slot="header" class="title title-up">About Simplex</h5>
      <div class="instruction">
        <div class="row">
          <strong><i class="tim-icons icon-book-bookmark text-primary"></i>What is it?</strong>
          <p class="description">
            It is an analytic method for solving problems of linear programming using algebraic operations.
            This method provides a strategy for evaluating the feasible results finding the
            optimal value of the objective function.
          </p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong><i class="tim-icons icon-notes text-info"></i>When to use it?</strong>
          <p
            class="description"
          >This method can be applied for problems of linear programming that use two or more variables.</p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong><i class="tim-icons icon-paper text-success"></i>Instructions</strong>
          <p class="description">
            For using the program you will need an objective function and the respective constraints.
            As a result, the program is going to show the type and value of the optimal
            solution (if there is one) and the values of the basic and non basic variables.
          </p>
        </div>
      </div>
      <div slot="footer" class="justify-content-center">
        <base-button type="primary" round @click.native="modals.notice = false">Let's start!</base-button>
      </div>
    </modal>

    <br />

    <div class="col-lg-12" align="center">
      <form>
        <card>
          <div>
            <div class="row">
              
                <label class="col-sm-2 col-form-label" style="font-size: 1.00rem">Problem Title</label>
              
              <div class="col-sm-8">
                <el-tooltip
                content="Type the name of the problem here"
                effect="light"
                :open-delay="300"
                placement="top"
              >
                <base-input
                  name="required"
                  v-validate="modelValidations.required"
                  v-model="model.required"
                  :error="getError('required')"
                ></base-input></el-tooltip>
              </div>
            </div>

            <div class="row"></div>
          </div>
        </card>
      </form>
    </div>
    <div class="col-lg-12">
      <LPTable v-model="lpModel" problemType="Continuous"></LPTable>
    </div>
    <div align="center">
      <el-tooltip
        content="Use this each time you change the params of the problem"
        effect="light"
        :open-delay="300"
        placement="top"
      >
        <base-button style="width: 50%" round type="primary" @click="solveSolution">Start solving</base-button>
      </el-tooltip>
    </div>
    <br />
    <div v-if="iteration >= 0" class="col-lg-12">
      <card>
        <h2 class="text-center card-title">Solution Data Table</h2>
        <hr />
        <h4 v-if="iteration == 0">Slack variables created</h4>
        <h4 v-else>Iteration {{iteration}}: {{operationsDone}}</h4>

        <table class="text-center table solution-table">
          <thead>
            <tr>
              <th>Basic Variables</th>
              <th v-for="item in variableNames" v-bind:key="item" v-html="item"></th>
              <th>RHS</th>
              <th>Theta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m,j) in tablaResultados" v-bind:key="j">
              <td v-if="j==0">Z</td>
              <td v-else>{{varsBase[j-1]}}</td>
              <td v-for="(n, i) in m" :key="i">{{n}}</td>
              <td
                v-if="j>=1 && theta != null && theta[j-1]<maxValue"
              >{{theta[j-1]}}</td>
              <td v-else-if="j>=1 && theta != null">&#8734;</td>
              <td v-else>-</td>
            </tr>
          </tbody>
        </table>
      </card>
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto" align="center">
          <el-tooltip
            content="Turn back the table if you need it"
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button
              native-type="submit"
              v-on:click="stepByStep(-1)"
              type="primary"
              :disabled="itAble"
            >
              <i class="tim-icons icon-minimal-left"></i>Last Iteration
            </base-button>
          </el-tooltip>
          <el-tooltip
            content="Use this option to iterate once a time"
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button
              native-type="submit"
              v-on:click="stepByStep(1)"
              type="primary"
              :disabled="nextAble"
            >
              Next Iteration
              <i class="tim-icons icon-minimal-right"></i>
            </base-button>
          </el-tooltip>
        </div>
        <div class="col-md-6 ml-auto" align="center">
          <el-tooltip
            content="Get the solution of the problem in one jump"
            effect="light"
            :open-delay="300"
            placement="top"
          >
            <base-button
              round
              native-type="submit"
              v-on:click="finalSol()"
              type="primary"
              :disabled="nextAble"
            >Final Solution</base-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <br/>
    <!-- <h3>{{messageSol}}</h3> -->

    <div v-if="messageSol != null" class="col-lg-12">
      <div class="row">
        <div class="col-md-6">
          <card>
            <h2 class="text-center card-title">Results per variable</h2>
            <table class="text-center table solution-table">
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(n, i) in variableNames" :key="i">
                  <td v-html="n"></td>
                  <td
                    v-if="varsValuesSolution != null"
                  >{{varsValuesSolution[i]}}</td>
                </tr>
                <tr>
                  <td>Z</td>
                  <td
                    v-if="varsValuesSolution != null"
                  >{{varsValuesSolution[variableNames.length]}}</td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>

        <div class="col-md-6">
          <card>
          <h2 class="text-center card-title">Sensitivity Analysis</h2>
          <li class="list-group-item">
          <h4>
            Equations for Shadow Prices intervals
          </h4>
          <h4 class="text-center" v-html="equationsConstraints"></h4>
          </li>
          <li class="list-group-item">
          <h4>
            Equations for Reduced Costs intervals
          </h4>
          <h4 class="text-center" v-html="equationsFO"></h4>
          </li>
          </card>
        </div>
      </div>
      <card>
        <h2 class="text-center card-title">Reduced Costs Table</h2>
        <table class="text-center table solution-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Final Value</th>
              <th>Reduced Costs</th>
              <th>Coefficient Obj Function</th>
              <th>Permissible to Reduce</th>
              <th>Permissible to Increase</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in nVarDecision" :key="i">
              <td v-html="variableNames[i-1]"></td>
              <td v-if="varsValuesSolution != null">{{varsValuesSolution[i-1]}}</td>
              <td
                v-if="reducedCosts != null && reducedCosts[i-1]<maxValue"
              >{{reducedCosts[i-1]}}</td>
              <td v-else>&#8734;</td>
              <td v-if="fobj != null">{{fobj[i-1][0]}}</td>
              <td
                v-if="intervalsDFO != null && intervalsDFO[i-1][0]<maxValue"
              >{{intervalsDFO[i-1][0]}}</td>
              <td v-else>&#8734;</td>
              <td
                v-if="intervalsDFO != null && intervalsDFO[i-1][1]<maxValue"
              >{{intervalsDFO[i-1][1]}}</td>
              <td v-else>&#8734;</td>
            </tr>
          </tbody>
        </table>
      </card>
      <card>
        <h2 class="text-center card-title">Shadow Prices Table</h2>
        <table class="text-center table solution-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Final Value</th>
              <th>Shadow Prices</th>
              <th>RHS Constraints</th>
              <th>Permissible to Reduce</th>
              <th>Permissible to Increase</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in finalValuesConstraints.length" :key="i">
              <td>Constraint {{i}}</td>
              <td>{{finalValuesConstraints[i-1]}}</td>
              <td
                v-if="shadowPrice != null && shadowPrice[0][i-1]<maxValue"
              >{{shadowPrice[0][i-1]}}</td>
              <td v-else>&#8734;</td>
              <td v-if="rhsinitialM != null">{{rhsinitialM[i]}}</td>
              <td
                v-if="intervalsDConstraints != null && intervalsDConstraints[i-1][0]<maxValue"
              >{{intervalsDConstraints[i-1][0]}}</td>
              <td v-else>&#8734;</td>
              <td
                v-if="intervalsDConstraints != null && intervalsDConstraints[i-1][1]<maxValue"
              >{{intervalsDConstraints[i-1][1]}}</td>
              <td v-else>&#8734;</td>
            </tr>
          </tbody>
        </table>
      </card>
    </div>
  </div>
</template>
<script>
import Tablex from "./../../../components/Modules/Table";
import axios from "axios";
import LPTable from "./../../../components/Modules/LinearProgramming/LPTable";
import { isNull } from "util";
import { Modal, BaseAlert } from "src/components";

export default {
  name: "starter-page",
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      lpModel: {},
      variableNames: [],
      tablaResultados: [],
      intervalsDFO: null,
      theta: null,
      intervalsDConstraints: null,
      rhsinitialM: [],
      messageSol: null,
      query: "",
      iteration: -1,
      itAble: true,
      nextAble: false,
      operationsDone: "",
      equationsFO: null,
      equationsConstraints: null,
      reducedCosts: null,
      varsValuesSolution: [],
      nVarDecision: 0,
      fobj: null,
      shadowPrice: null,
      finalValuesConstraints: [],
      varsBase: null,
      maxValue: Number.MAX_SAFE_INTEGER,
      modals: {
        notice: false
      },
      model: {
        required: "",
        number: ""
      },
      modelValidations: {
        required: {
          required: true
        },

        number: {
          numeric: true
        }
      }
    };
  },
  components: {
    LPTable,
    Modal,
    BaseAlert
  },
  methods: {
    nextPage() {
      this.$router.push("dashboard");
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        this.$emit("on-submit", this.registerForm, isValid);
      });
    },
    buildQuery() {
      //?type=MAXIMIZE&equations=1 Z -3 X1 -2 X2 -5 X3 = 0n0 Z 1 X1 2 X2 1 X3 <= 430n0 Z 3 X1 0 X2 2 X3 <= 460n0 Z 1 X1 4 X2 0 X3 <= 420
      this.query = "?type=";
      this.query +=
        this.lpModel.objectiveFunction.type.toUpperCase() + "&equations=";
      this.query += "1 Z ";
      for (
        var i = 0;
        i < this.lpModel.objectiveFunction.coefficients.length;
        i++
      ) {
        this.query +=
          -this.lpModel.objectiveFunction.coefficients[i] +
          " X" +
          (i + 1) +
          " ";
      }
      this.query += "= 0n";
      for (var i = 0; i < this.lpModel.constraints.length; i++) {
        this.query += "0 Z ";
        for (
          var j = 0;
          j < this.lpModel.constraints[i].coefficients.length;
          j++
        ) {
          this.query +=
            this.lpModel.constraints[i].coefficients[j] + " X" + (j + 1) + " ";
        }
        this.query += this.lpModel.constraints[i].type + " ";
        this.query += this.lpModel.constraints[i].limit + "n";
      }
    },
    solveSolution() {
      this.buildQuery();
      this.iteration = -1;
      this.stepByStep(1);
      return null;
    },
    stepByStep(val) {
      var next = this.query;
      if (val == 1 && (this.messageSol == null || this.iteration == -1))
        this.iteration++;
      else if (val == -1 && this.iteration > 0) this.iteration--;
      if (this.iteration > 0) this.itAble = false;
      else this.itAble = true;
      next = next.replace("?", "?iteration=" + this.iteration + "&");
      this.callServer(next, false);
    },
    finalSol() {
      this.callServer(this.query, true);
    },
    callServer(route, isFinal) {
      axios
        .get(
          "https://alien-backend-v2.herokuapp.com/api/simplexAlgorithmModule/simplexMethod/" +
            route
          //"http://localhost:8080/api/simplexAlgorithmModule/simplexMethod/"+route
        )
        .then(response => {
          this.messageSol = response.data.messageSol;
          this.tablaResultados = response.data.actualMatrix;
          this.variableNames = response.data.everyVariableName;
          this.convertSubIndex();
          this.rhsinitialM = response.data.rhsinitialM;
          this.operationsDone = response.data.operationsDone;
          if (isFinal) {
            this.iteration = response.data.iterationID + 1;
          }
          if (response.data.analysis != null) {
            this.intervalsDFO = response.data.analysis.intervalsDFO;
            this.intervalsDConstraints =
              response.data.analysis.intervalsDConstraints;
            this.equationsConstraints =
              response.data.analysis.equationsConstraints;
            this.equationsFO = response.data.analysis.equationsFO;
            console.log(this.equationsFO);
            this.shadowPrice = response.data.analysis.shadowPrice;
            this.nextAble = true;
            this.itAble = false;
            this.notifyVue("bottom", "left");
          } else this.nextAble = false;
          this.reducedCosts = response.data.reducedCosts;
          this.varsValuesSolution = response.data.varsValuesSolution;
          this.nVarDecision = response.data.nVarDecision;
          this.fobj = response.data.fobj;
          this.finalValuesConstraints = response.data.finalValuesConstraints;
          this.theta = response.data.theta;
          this.varsBase = response.data.varsBase;
          console.log(response.data);
        });
    },
    convertSubIndex() {
      for (let index = 0; index < this.variableNames.length; index++) {
        var element = this.variableNames[index];
        this.variableNames[index] = "<html>" +element.charAt(0) + "<sub>" + element.substring(1) + "</sub></html>";
      }
    },
    notifyVue(verticalAlign, horizontalAlign) {
      let color = "success";
      this.$notify({
        message: "<b>" + this.messageSol + "</b>",
        timeout: 10000,
        icon: "tim-icons icon-alert-circle-exc",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color]
      });
    }
  }
};
</script>
<style>
.solution-table th{
  width: 130px;
  overflow: auto;
}
.card .alert {
  position: relative !important;
  width: 100%;
}
</style>

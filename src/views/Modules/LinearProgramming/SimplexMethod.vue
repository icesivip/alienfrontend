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
          <strong>
            <i class="tim-icons icon-book-bookmark text-primary"></i>What is it?
          </strong>
          <p class="description">
            It is an analytic method for solving problems of linear programming using algebraic operations.
            This method provides a strategy for evaluating the feasible results finding the
            optimal value of the objective function.
          </p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong>
            <i class="tim-icons icon-notes text-info"></i>When to use it?
          </strong>
          <p
            class="description"
          >This method can be applied for problems of linear programming that use two or more variables.</p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong>
            <i class="tim-icons icon-paper text-success"></i>Instructions
          </strong>
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
                    v-model="title"
                    :error="getError('required')"
                  ></base-input>
                </el-tooltip>
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
        <base-button style="width: 50%" round :loading="loading.solve" type="primary" @click="solve">Start solving</base-button>
      </el-tooltip>
    </div>
    <br />
    <div v-if="simplex.iteration >= 0" class="col-lg-12">
      <card>
        <h2 class="text-center card-title">Solution Data Table</h2>
        <hr />
        <h4 v-if="simplex.iteration == 0">Slack variables created</h4>
        <h4 v-else>Iteration {{simplex.iteration}}: {{simplex.operationsDone}}</h4>
      <div class="table-responsive">
        <table class="text-center table solution-table">
          <thead>
            <tr>
              <th>Basic Variables</th>
              <th v-for="item in simplex.variableNames" v-bind:key="item" v-html="item"></th>
              <th>RHS</th>
              <th>Theta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m,j) in simplex.tablaResultados" v-bind:key="j">
              <td v-if="j==0">Z</td>
              <td v-else>{{simplex.varsBase[j-1]}}</td>
              <td class="data-table" v-for="(n, i) in m" :key="i">{{n}}</td>
              <td v-if="j>=1 && simplex.theta != null && simplex.theta[j-1]<maxValue">{{simplex.theta[j-1]}}</td>
              <td v-else-if="j>=1 && simplex.theta != null">&#8734;</td>
              <td v-else>-</td>
            </tr>
          </tbody>
        </table>
      </div>
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
              :loading="loading.back"
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
              :loading="loading.next"
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
              :loading="loading.final"
              v-on:click="finalSol()"
              type="primary"
              :disabled="nextAble"
            >Final Solution</base-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <br />
    <!-- <h3>{{messageSol}}</h3> -->

    <div v-if="simplex.messageSol != null" class="col-lg-12">
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
                <tr v-for="(n, i) in simplex.variableNames" :key="i">
                  <td v-html="n"></td>
                  <td v-if="simplex.varsValuesSolution != null">{{simplex.varsValuesSolution[i]}}</td>
                </tr>
                <tr>
                  <td>Z</td>
                  <td v-if="simplex.varsValuesSolution != null">{{simplex.varsValuesSolution[simplex.variableNames.length]}}</td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>

        <div class="col-md-6" >
          <card>
            <h2 class="text-center card-title">Sensitivity Analysis</h2>
            <li class="list-group-item">
              <h4>Equations for Shadow Prices intervals</h4>
              <h4 class="text-center" v-html="simplex.equationsConstraints"></h4>
            </li>
            <li class="list-group-item">
              <h4>Equations for Reduced Costs intervals</h4>
              <h4 class="text-center" v-html="simplex.equationsFO"></h4>
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
            <tr v-for="i in simplex.nVarDecision" :key="i">
              <td v-html="simplex.variableNames[i-1]"></td>
              <td v-if="simplex.varsValuesSolution != null">{{simplex.varsValuesSolution[i-1]}}</td>
              <td v-if="simplex.reducedCosts != null && simplex.reducedCosts[i-1]<maxValue">{{simplex.reducedCosts[i-1]}}</td>
              <td v-else>&#8734;</td>
              <td v-if="simplex.fobj != null">{{simplex.fobj[i-1][0]}}</td>
              <td
                v-if="simplex.intervalsDFO != null && simplex.intervalsDFO[i-1][0]<maxValue"
              >{{simplex.intervalsDFO[i-1][0]}}</td>
              <td v-else>&#8734;</td>
              <td
                v-if="simplex.intervalsDFO != null && simplex.intervalsDFO[i-1][1]<maxValue"
              >{{simplex.intervalsDFO[i-1][1]}}</td>
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
            <tr v-for="i in simplex.finalValuesConstraints.length" :key="i">
              <td>Constraint {{i}}</td>
              <td>{{simplex.finalValuesConstraints[i-1]}}</td>
              <td v-if="simplex.shadowPrice != null && simplex.shadowPrice[0][i-1]<maxValue">{{simplex.shadowPrice[0][i-1]}}</td>
              <td v-else>&#8734;</td>
              <td v-if="simplex.rhsinitialM != null">{{simplex.rhsinitialM[i]}}</td>
              <td
                v-if="simplex.intervalsDConstraints != null && simplex.intervalsDConstraints[i-1][0]<maxValue"
              >{{simplex.intervalsDConstraints[i-1][0]}}</td>
              <td v-else>&#8734;</td>
              <td
                v-if="simplex.intervalsDConstraints != null && simplex.intervalsDConstraints[i-1][1]<maxValue"
              >{{simplex.intervalsDConstraints[i-1][1]}}</td>
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
      title: "",
      simplex: {
        variableNames: [],
        tablaResultados: [],
        intervalsDFO: null,
        theta: null,
        intervalsDConstraints: null,
        rhsinitialM: [],
        messageSol: null,
        iteration: -1,
        operationsDone: "",
        equationsFO: null,
        equationsConstraints: null,
        reducedCosts: null,
        varsValuesSolution: [],
        nVarDecision: 0,
        fobj: null,
        shadowPrice: null,
        finalValuesConstraints: [],
        varsBase: null
      },
      loading: {
        solve: false,
        back: false,
        next: false,
        final: false
      },
      itAble: true,
      nextAble: false,
      query: "",
      maxValue: Number.MAX_SAFE_INTEGER,
      modals: {
        notice: false
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
    solve() {
      this.loading.solve = true;
      this.buildQuery();
      this.simplex.iteration = -1;
      this.stepByStep(1);
    },
    stepByStep(val) {
      var next = this.query;
      if (val == 1 && (this.simplex.messageSol == null || this.simplex.iteration == -1)){
        this.simplex.iteration++;
        this.loading.next = true;
      }
      else if (val == -1 && this.simplex.iteration > 0) {
        this.simplex.iteration--;
        this.loading.back = true;
        }
      if (this.simplex.iteration > 0) this.itAble = false;
      else this.itAble = true;
      next = next.replace("?", "?iteration=" + this.simplex.iteration + "&");
      this.callServer(next, false);
    },
    finalSol() {
      this.loading.final = true;
      this.callServer(this.query, true);
    },
    callServer(route, isFinal) {
      axios
        .get(
           this.$store.state.backend + "/simplexAlgorithmModule/simplexMethod/" + route
        )
        .then(response => {
          this.simplex.messageSol = response.data.messageSol;
          this.simplex.tablaResultados = response.data.actualMatrix;
          this.simplex.variableNames = response.data.everyVariableName;
          this.convertSubIndex();
          this.simplex.rhsinitialM = response.data.rhsinitialM;
          this.simplex.operationsDone = response.data.operationsDone;
          if (isFinal) {
            this.simplex.iteration = response.data.iterationID + 1;
          }
          if (response.data.analysis != null) {
            this.simplex.intervalsDFO = response.data.analysis.intervalsDFO;
            this.simplex.intervalsDConstraints =
              response.data.analysis.intervalsDConstraints;
            this.simplex.equationsConstraints =
              response.data.analysis.equationsConstraints;
            this.simplex.equationsFO = response.data.analysis.equationsFO;
            console.log(this.equationsFO);
            this.simplex.shadowPrice = response.data.analysis.shadowPrice;
            this.nextAble = true;
            this.itAble = false;
            this.notifyVue("bottom", "left");
          } else this.nextAble = false;
          this.simplex.reducedCosts = response.data.reducedCosts;
          this.simplex.varsValuesSolution = response.data.varsValuesSolution;
          this.simplex.nVarDecision = response.data.nVarDecision;
          this.simplex.fobj = response.data.fobj;
          this.simplex.finalValuesConstraints = response.data.finalValuesConstraints;
          this.simplex.theta = response.data.theta;
          this.simplex.varsBase = response.data.varsBase;
          this.loading.solve = false;
          this.loading.back = false;
          this.loading.next = false;
          this.loading.final = false;
          console.log(response.data);
        });
    },
    convertSubIndex() {
      for (let index = 0; index < this.simplex.variableNames.length; index++) {
        var element = this.simplex.variableNames[index];
        this.simplex.variableNames[index] =
          "<html>" +
          element.charAt(0) +
          "<sub>" +
          element.substring(1) +
          "</sub></html>";
      }
    },
    notifyVue(verticalAlign, horizontalAlign) {
      let color = "success";
      this.$notify({
        message: "<b>" + this.simplex.messageSol + "</b>",
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
.solution-table th {
  width: 130px;
  overflow: auto;
}
.data-table {
  padding: 1px;
  vertical-align: center;
  min-width: 70px;
  margin: 0;
}
.card .alert {
  position: relative !important;
  width: 100%;
}
</style>

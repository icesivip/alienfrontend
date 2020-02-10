<template>
  <div>
    <div class="col-12" align="center">
      <h1>Simplex Method</h1>
    </div>
    <!-- Small charts -->
    <div class="row">
      <div class="col-lg-4">
        <card>
          <template slot="header">
            <h3 class="card-title">
              <i class="tim-icons icon-book-bookmark text-primary"></i> What is it?
            </h3>
          </template>
          <div style="height: 80px">
            <h5
              align="justify"
            >It is an analytic method for solving problems of linear programming using algebraic operations. This method provides a strategy for evaluating the feasible results finding the optimal value of the objective function.</h5>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <template slot="header">
            <h3 class="card-title">
              <i class="tim-icons icon-notes text-info"></i> When to use it?
            </h3>
          </template>
          <div style="height: 80px">
            <h5
              align="justify"
            >This method can be applied for problems of linear programming that use two or more variables.</h5>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <template slot="header">
            <h3 class="card-title">
              <i class="tim-icons icon-paper text-success"></i> Instructions
            </h3>
          </template>
          <div style="height: 80px">
            <h5
              align="justify"
            >For using the program you will need an objective function and the respective constraints. As a result, the program is going to show the type and value of the optimal solution (if there is one) and the values of the basic and non basic variables.</h5>
          </div>
        </card>
      </div>
    </div>
    <br />
    <br />

    <div class="col-lg-12" align="center">
      <form>
        <card>
          <div>
            <div class="row">
              <label class="col-sm-2 col-form-label" style="font-size: 1.00rem">Problem Title</label>
              <div class="col-sm-8">
                <base-input
                  name="required"
                  v-validate="modelValidations.required"
                  v-model="model.required"
                  :error="getError('required')"
                ></base-input>
              </div>
            </div>

            <div class="row">
            
             
            </div>
          </div>
         
        </card>
      </form>
    </div>
    <div class="col-lg-12">
      
      <Tablex @getSolution="solveSolution"></Tablex>
    </div>
    <div v-if="iteration >= 0">
 <h3 class="text-center">Solution Data Table</h3>
  <hr>
 <h4 v-if="iteration == 0">Slack variables created</h4>
 <h4 v-else>Iteration: {{iteration}}, {{operationsDone}}</h4>

<table class="table">
        <thead>
          <tr>
            <th class="text-center">
              Basic Variables
            </th>
            <th
              class="text-center"
              v-for="item in variableNames"
              v-bind:key="item"
            >{{item}}</th>
            <th class="text-center">
              RHS
            </th>
            <th class="text-center" v-if="theta != null">
              Theta
            </th>
          </tr>
        </thead>
        <tbody>
    <tr v-for="(m,j) in tablaResultados" v-bind:key="j">
      <td class="text-center" v-if="j==0">Z</td>
      <td class="text-center" v-else>{{varsBase[j-1]}}</td>
      <td v-for="(n, i) in m" :key="i" class="text-center">{{n}}
      </td>
      <td class="text-center" v-if="j>=1 && theta!= null"> {{theta[j-1]}}
      </td>
          </tr>
          </tbody>
      </table>

        <div class="col">
          
          <base-button native-type="submit" v-on:click="stepByStep(-1)" type="primary" style='width: 20%'>Last Iteration</base-button>
          <base-button native-type="submit" v-on:click="finalSol()" type="primary" style='width: 20%'>Final Solution</base-button>
          <base-button native-type="submit" v-on:click="stepByStep(1)" type="primary" style='width: 20%'>Next Iteration</base-button>
          
        </div>
    </div>
     <h4>{{messageSol}}</h4>

     <div v-if="messageSol != null">

       <div class ="row">
         <div class ="col">
       <h3 class="text-center">Results per variable</h3>
     <table class="table">
        <thead>
          <tr>
            <th
              class="text-center"
            >Variable</th>
            <th
              class="text-center"
            >Value</th>
          </tr>
        </thead>
        <tbody>
      <tr v-for="(n, i) in variableNames" :key="i" class="text-center">
        {{n}}
      <td class="text-center" v-if="varsValuesSolution != null">{{varsValuesSolution[i]}}
        </td>
      </tr>
      <tr class="text-center">Z
      <td class="text-center" v-if="varsValuesSolution != null">{{varsValuesSolution[variableNames.length]}}
        </td>
      </tr>
          </tbody>
      </table>
         </div>
         <div class="col">
    <h3 class = "text-center">Sensitivity Analysis</h3>
    <h4>
      <b>Equations for Shadow Prices intervals</b>
    </h4>
    <h4 v-html="equationsConstraints">
      
    </h4>
    
      <h4>
      <b>Equations for Reduced Costs intervals</b>
    </h4>
    <h4 v-html="equationsFO">
    </h4>
    </div>
       </div>
    <h3 class = "text-center">Reduced Costs Table</h3>
    <table class="table">
        <thead>
          <tr>
            <th
              class="text-center"
            >Name</th>
            <th
              class="text-center"
            >Final Value</th>
            <th
              class="text-center"
            >Reduced Costs</th>
            <th
              class="text-center"
            >Coefficient Obj Function</th>
            <th
              class="text-center"
            >Permissible to Reduce</th>
            <th
              class="text-center"
            >Permissible to Increase</th>
          </tr>
        </thead>
        <tbody>
      <tr v-for="i in nVarDecision" :key="i" class="text-center">
        {{variableNames[i-1]}}
      <td class="text-center" v-if="varsValuesSolution != null">{{varsValuesSolution[i-1]}}
        </td>
      <td class="text-center" v-if="reducedCosts != null">{{reducedCosts[i-1]}}
        </td>
        <td class="text-center" v-if="fobj != null">{{fobj[i-1][0]}}
        </td>
        <td class="text-center" v-if="intervalsDFO != null && intervalsDFO[i-1][0]<999999999999">{{intervalsDFO[i-1][0]}}
        </td>
        <td class="text-center" v-else>&#8734;
        </td>
        <td class="text-center" v-if="intervalsDFO != null && intervalsDFO[i-1][1]<999999999999">{{intervalsDFO[i-1][1]}}
        </td>
        <td class="text-center" v-else>&#8734;
        </td>
      </tr>
          </tbody>
      </table>

    <h3 class = "text-center">Shadow Prices Table</h3>
      <table class="table">
        <thead>
          <tr>
            <th
              class="text-center"
            >Name</th>
            <th
              class="text-center"
            >Final Value</th>
            <th
              class="text-center"
            >Shadow Prices</th>
            <th
              class="text-center"
            >RHS Constraints</th>
            <th
              class="text-center"
            >Permissible to Reduce</th>
            <th
              class="text-center"
            >Permissible to Increase</th>
          </tr>
        </thead>
        <tbody>
      <tr v-for="i in finalValuesConstraints.length" :key="i" class="text-center">
        Constraint {{i}}
      <td class="text-center">{{finalValuesConstraints[i-1]}}
        </td>
      <td class="text-center" v-if="shadowPrice != null">{{shadowPrice[0][i-1]}}
        </td>
        <td class="text-center" v-if="rhsinitialM != null">{{rhsinitialM[i]}}
        </td>
        <td class="text-center" v-if="intervalsDConstraints != null && intervalsDConstraints[i-1][0]<999999999999">{{intervalsDConstraints[i-1][0]}}
        </td>
        <td class="text-center" v-else>&#8734;
        </td>
        <td class="text-center" v-if="intervalsDConstraints != null && intervalsDConstraints[i-1][1]<999999999999">{{intervalsDConstraints[i-1][1]}}
        </td>
        <td class="text-center" v-else>&#8734;
        </td>
      </tr>
          </tbody>
      </table>

     </div>
  </div>

</template>
<script>
import Tablex from "src/Table.vue";
import axios from "axios";
export default {
  name: "starter-page",
  data() {
    return {
      variableNames: [],
      tablaResultados: [],
      intervalsDFO: null,
      theta: null,
      intervalsDConstraints: null,
      rhsinitialM: [],
      messageSol: null,
      nuevoqwery: "",
      iteration: -1,
      operationsDone: "",
      equationsFO: null,
      equationsConstraints: null,
      reducedCosts: null,
      varsValuesSolution: [],
      nVarDecision: 0,
      fobj: null,
      shadowPrice: null,
      finalValuesConstraints:[],
      varsBase: null,
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
    Tablex: Tablex
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
    solveSolution(qwery) {
          var nuevoqwery = "";
          var div = qwery.split("vars");
          nuevoqwery += div[0] + "equations=";
          div = div[1];
          div = div.split("objectiveFunction=");
          div = div[1];
          div = div.split("&constraints=");

          nuevoqwery += "1 Z "
          var div1 = div[0].split(",");
          for (let i = 0; i < div1.length; i++) {
            nuevoqwery += div1[i] + " X"+ (i+1) + " ";
          }
          nuevoqwery += "= 0n"
          div = div[1].split(";");
          for (let i = 0; i < div.length -1; i++) {
            var div2 = div[i].split(",");
            nuevoqwery += "0 Z "
            for (let j = 0; j < div2.length-2; j++) {
            nuevoqwery += div2[j] + " X"+ (j+1) + " ";
          }
          nuevoqwery += div2[div2.length-2] + " " + div2[div2.length-1];
          if(i < div.length-1)
          nuevoqwery += "n";
          }
          this.nuevoqwery = nuevoqwery;
          this.iteration = -1;
      this.stepByStep(1);
      return null;
    },
    stepByStep(val){
    var next = this.nuevoqwery;
    if(val == 1 && (this.messageSol == null || this.iteration == -1))
     this.iteration++;
    else if(val == -1 && this.iteration > 0)
      this.iteration--;
    next = next.replace("?","?iteration="+this.iteration+"&");
    this.callServer(next, false);
    },
    finalSol(){
      this.callServer(this.nuevoqwery, true);
    },
    callServer(route, isFinal){
      axios
        .get(
          "https://icesiviptest.herokuapp.com/simplexMethod/"+route
        )
        .then(response => {
          this.messageSol = response.data.messageSol;
          this.tablaResultados = response.data.actualMatrix;
          this.variableNames = response.data.everyVariableName;
          this.rhsinitialM = response.data.rhsinitialM;
          this.operationsDone = response.data.operationsDone;
          if(isFinal){
                this.iteration = response.data.iterationID +1;
          }
          if(response.data.analysis != null){
          this.intervalsDFO = response.data.analysis.intervalsDFO;
          this.intervalsDConstraints = response.data.analysis.intervalsDConstraints;
          this.equationsConstraints = response.data.analysis.equationsConstraints;
          this.equationsFO = response.data.analysis.equationsFO;
          console.log(this.equationsFO);
          this.shadowPrice = response.data.analysis.shadowPrice;
          }
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
  }
};
</script>
<style></style>

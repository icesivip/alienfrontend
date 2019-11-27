<template>
  <div>
     <button @click="solveSolution">holiwis</button>
     <div v-show="mostrar">
    <h1 class="text-center">Optimal Solution</h1>
    <card>
      <table class="table">
        <thead>
          <tr>
            <th class="text-center" v-for="n in cantVars" :key="n">{{"X"+n}}</th>
            <th class="text-center">Z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center" v-for="n in valuesSolution" :key="n">
              <p>{{n}}</p>
            </td>
            <td class="text-center">{{z}}</td>
          </tr>
        </tbody>
      </table>
    </card>
    <h1 class="text-center">Solution Tree Chart</h1>
    <div style="justify-content:center">
      <card type="nav-tabs" class="text-center" style="width:30rem; margin:0 auto; border: 2px inset white;">
        <div slot="header" class="card-header-primary">{{textoSolTC.name}}</div>
        <h4 class="card-title" v-for="linea in textoSolTC.title.split('\n')" :key="linea">{{linea}}</h4>
        <p class="card-text" v-for="linea in textoSolTC.desc.split('\n')" :key="linea">{{linea}}</p>
      </card>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";

export default {
  name: "branch",
  components: {},
  data: function() {
    return {
      valuesSolution: [30, 2],
      cantVars: 2,
      z: 0,
      textoSolTC: { desc: "alv", title: "huehue", name: "nombre" },
      mostrar: false,
    };
  },

  methods: {
    solveSolution: function(event) {
      axios
        .get(
          "https://icesiviptest.herokuapp.com/branchAndBound/?type=MAXIMIZE&vars=X1:C,X2:C,X3:C,X4:C,X5:C&objectiveFunction=8,4,1,2,5&constraints=9,8,5,8,2,<=,19;1,2,3,8,5,<=,90;"
        )
        .then(response => {
          this.valuesSolution = response.data.optimalSolution.variables;
          this.cantVars = 0;
          for (var key in response.data.optimalSolution.variables) {
            this.cantVars++;
          }
          this.z = response.data.optimalSolution.z;
          console.log(response.data.solutionTree.text.desc.split("\n").length);
          this.textoSolTC = response.data.solutionTree.text;
          this.mostrar = true;
        });
      return null;
    },
  }
};
</script>
<style scoped>
</style>
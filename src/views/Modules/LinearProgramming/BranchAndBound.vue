<template>
  <div>
    <div>
      <h2 class="text-center">Branch & Bound Solver</h2>

      <LPTable v-model="lpModel" problemType="Mixed"> </LPTable>

      <card class="text-center">
        <base-button type="primary" :loading="processing" block @click="solve">
          Solve
        </base-button>
      </card>

      <card v-if="optimalSolution" class="text-center">
        <h2 class="card-title">Results</h2>
        <div class="text-center" v-if="optimalSolution">
          <h3 class="text-center card-subtitle">Optimal Solution</h3>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th v-for="(key, value, index) in optimalSolution.variables" :key="index" class="text-center">
                    <p>
                      X<sub>{{ index+1 }}</sub>
                    </p>
                  </th>
                  <th class="text-center">
                    <p>
                      Z
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td v-for="(key, value, index) in optimalSolution.variables" :key="index" class="text-center">
                    {{ key.toFixed(3) }}
                  </td>
                  <td class="text-center">
                    {{ optimalSolution.z.toFixed(3) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr />

        <div v-if="treeDataset">
          <h3 class="text-center card-subtitle">Solution Tree</h3>
          <!-- <network :nodes="nodes" :edges="edges" :options="options" ref="network" class="visnet"></network> -->
          <div id="visNetwork" class="visnet"></div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import LPTable from "./../../../components/Modules/LinearProgramming/LPTable";
import axios from "axios";
// import { Network } from "vue-vis-network";
import { DataSet, Network } from "vis-network/standalone";
export default {
  data() {
    return {
      treeDataset: null,
      lpModel: {},
      processing: false,
      solTree: null,
      optimalSolution: null,
      visNetwork: null,
      options: {
        autoResize: true,
        layout: {
          hierarchical: {
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 300,
            shakeTowards:"roots"
          }
        },
        physics: {
          hierarchicalRepulsion: {
            avoidOverlap: 1,
            nodeDistance: 300
          }
        },
        nodes: {
          shape: "box"
        }
      }
    };
  },
  components: {
    LPTable
    // 'network':Network
  },
  methods: {
    buildQuery() {
      var query = "?type=";
      query += this.lpModel.objectiveFunction.type.toUpperCase() + "&vars=";
      for (var i = 0; i < this.lpModel.variables.length; i++) {
        if (this.lpModel.variables[i] == "Continuous") {
          query += "X" + (i + 1) + ":C";
        } else if (this.lpModel.variables[i] == "Binary") {
          query += "X" + (i + 1) + ":B";
        } else {
          query += "X" + (i + 1) + ":I";
        }

        if (i != this.lpModel.variables.length - 1) {
          query += ",";
        }
      }
      query += "&objectiveFunction=";
      for (
        var i = 0;
        i < this.lpModel.objectiveFunction.coefficients.length;
        i++
      ) {
        query += this.lpModel.objectiveFunction.coefficients[i];
        if (i != this.lpModel.objectiveFunction.coefficients.length - 1) {
          query += ",";
        }
      }
      query += "&constraints=";
      for (var i = 0; i < this.lpModel.constraints.length; i++) {
        for (
          var j = 0;
          j < this.lpModel.constraints[i].coefficients.length;
          j++
        ) {
          query += this.lpModel.constraints[i].coefficients[j] + ",";
        }
        query += this.lpModel.constraints[i].type + ",";
        query += this.lpModel.constraints[i].limit + ";";
      }
      return query;
    },
    getRandomUID() {
      let uniqueId =
        Math.random()
          .toString(36)
          .substring(2) + Date.now().toString(36);
      return uniqueId;
    },
    recurseOnNode(node, nodes) {
      node.id = this.getRandomUID();
      const tempNode = new Object();
      tempNode.id = node.id;
      tempNode.label = node.text.title + "\n" + node.text.desc;
      tempNode.font = "14px monospace black";
      nodes.push(tempNode);
      node.children.forEach(child => this.recurseOnNode(child, nodes));
    },
    recurseOnEdges(node, edges) {
      node.children.forEach(child => {
        let tempEdge = new Object();
        tempEdge.from = node.id;
        tempEdge.to = child.id;
        tempEdge.label = child.text.addedConstraint;
        tempEdge.arrows="to"
        edges.push(tempEdge);

        this.recurseOnEdges(child, edges);
      });
    },
    solve() {
      var qwery = this.buildQuery();
      this.processing = true;
      axios
        .get(
          this.$store.state.backend +
            "/branchAndBoundModule/branchAndBound" +
            qwery
        )
        .then(response => {
          let data = response.data;
          let nodes = [];
          this.recurseOnNode(data.solutionTree, nodes);
          this.solTree = data.solutionTree;
          this.optimalSolution = data.optimalSolution;
          let edges = [];
          this.recurseOnEdges(data.solutionTree, edges);
          this.treeDataset = {
            nodes: new DataSet(nodes),
            edges: new DataSet(edges)
          };

          this.processing = false;
          this.$nextTick(() => {
            var component = document.getElementById("visNetwork");
            const network = new Network(
              component,
              this.treeDataset,
              this.options
            );
          });
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
        });
    }
  }
};
</script>

<style>
.visnet {
  width: 100%;
  height: 500px;
}
</style>

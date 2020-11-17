<template>
    <div align="center">
        <table class="table-responsive text-white  border-white rounded container">
          <thead>
            <tr class="bg-primary">
              <th :colspan="3" scope="col" id="NodesList" class="text-center text-white ">Nodes Matrix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bg-primary text-center " scope="col"><center>Node</center></td>
              <td class="bg-white text-center text-dark" scope="col" >X</td>
              <td class="bg-white text-center text-dark" scope="col" >Y</td>
            </tr>
            <tr :key="'node' + i" v-for="(node, i) in nodes">
              <td class="bg-primary text-center">{{node.id}}</td>
              <td style='width: 9%; height: 50%;'><input type='number' v-model="nodes[i].x"></td>
              <td style='width: 9%; height: 50%;'><input type='number' v-model="nodes[i].y"></td>
              <!-- <td style='width: 9%; height: 50%;' :key="'node' + j" v-for="(nodeTwo, j) in node" ><input type='number' v-model="graph[nodeOne.id][nodeTwo.id]"></td> -->
            </tr>
          </tbody>
        </table>

        
        <div class="input-group-append mb-2 flex-nowrap justify-content-center">
          <input class="col-sm-2 btn btn-outline-primary expand" type="button" v-on:click="loadDataFile" value="Load file"><div class="col-sm-1"></div>
          <input class="col-sm-2 btn btn-outline-primary expand" type="button" v-on:click="addNode" value="Add Node"><div class="col-sm-1"></div>
          <input class="col-sm-2 btn btn-outline-danger expand" type="button" v-on:click="removeNode" value="Remove Node">
        </div>
        <div class="input-group-append mb-2 flex-nowrap justify-content-center">
          <!-- <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="generateGraph" value="Generate Graph"> -->
        </div>

        <card class="bg-secondary" v-show="fileStatus">
          <div >
            <h2>Load File</h2>
            <p>Drag and Drop here</p>
          </div>
        </card>

        <div class="input-group-append mb-2 flex-nowrap justify-content-center">
          <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="solve" value="Solve Nearest Neighbor">
        </div>

        <!-- <pre>
          {{$data}}
        </pre> -->
    </div>

</template>

<script>
export default {
  props:{
    nodes: {
      required: true
    }
  },
  data() {
    return {
      
      currentNode: 1,
      solveStatus: false,
      fileStatus: false,
    }
  },
  methods: {
    addNode(){
      this.currentNode += 1;
      let newNode = {
        id: this.currentNode,
        x: 0,
        y: 0,
      };

      this.nodes.push(newNode);
    },
    removeNode(){
      if(this.currentNode > 0){
        this.currentNode--;
        this.nodes.pop()
      }
    },
    solve(){
      this.$emit('solve', this.nodes);

    },
    loadDataFile(){
      this.fileStatus = true;
    },
  }
}
</script>

<style>
  .mt-1 {
  margin-top: 0.25rem !important;
}
</style>
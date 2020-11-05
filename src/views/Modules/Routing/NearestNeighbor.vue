<template>
  <div id="nn">
    
    <h1>NEAREST NEIGHBOR ALGORITHM</h1>
    
    <table class="table-responsive text-white  border-white rounded ">
      <thead>
        <tr class="bg-primary">
          <th :colspan="11" scope="col" id="NodesList" class="text-center text-white ">Nodes Matrix</th>
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
    
    <div v-show="fileStatus">
      <h2>Load File</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatem suscipit ea autem commodi voluptates, placeat sapiente pariatur, neque exercitationem iure facere enim consectetur nobis optio quasi maxime mollitia harum.</p>
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-2 btn btn-outline-primary expand" type="button" v-on:click="loadDataFile" value="Load file"><div class="col-sm-1"></div>
      <input class="col-sm-2 btn btn-outline-primary expand" type="button" v-on:click="addNode" value="Add Node"><div class="col-sm-1"></div>
      <input class="col-sm-2 btn btn-outline-danger expand" type="button" v-on:click="removeNode" value="Remove Node">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <!-- <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="generateGraph" value="Generate Graph"> -->
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="solve" value="Solve Nearest Neighbor">
    </div>
    
    <div v-show="solveStatus">
      <h2 class="text-center" >Results</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatem suscipit ea autem commodi voluptates, placeat sapiente pariatur, neque exercitationem iure facere enim consectetur nobis optio quasi maxime mollitia harum.</p>
    </div>
    
    
    
  <!-- <pre>
      {{$data}}
  </pre> -->

  </div>
</template>
 
<script>

export default {
  name: "nn",
  
  data() {
    return {
      nodes: [  
        {
          id: 0,
          x: 1,
          y: 2,
        },
        {
          id: 1,
          x: 3,
          y: 4,
        }
      ],
     currentNode: 1,
     solveStatus: false,
     fileStatus: false,
    };
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
    
      if(this.currentNode >0){
        this.currentNode--;
        this.nodes.pop()
      }
      
    },
    solve(){
      this.solveStatus = true;
    },
    loadDataFile(){
      this.fileStatus = true;
    },
  }
}
</script>

<style>
</style>
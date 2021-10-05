<template>
  <div align="center">
    <table class="table-responsive text-white border-white rounded container w-100">
      <thead>
        <tr class="bg-primary">
          <th
            :colspan="3"
            scope="col"
            id="NodesList"
            class="text-center text-white"
          >
            Nodes Matrix
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bg-primary text-center" scope="col">
            <center>Node</center>
          </td>
          <td class="bg-white text-center text-dark" scope="col">X</td>
          <td class="bg-white text-center text-dark" scope="col">Y</td>
        </tr>
        <tr :key="'node' + i" v-for="(node, i) in nodes">
          <td class="bg-primary text-center">{{ node.id }}</td>
          <td style="width: 9%; height: 50%">
            <input type="number" v-model="nodes[i].x" />
          </td>
          <td style="width: 9%; height: 50%">
            <input type="number" v-model="nodes[i].y" />
          </td>
          <!-- <td style='width: 9%; height: 50%;' :key="'node' + j" v-for="(nodeTwo, j) in node" ><input type='number' v-model="graph[nodeOne.id][nodeTwo.id]"></td> -->
        </tr>
      </tbody>
    </table>

    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="loadDataFile"> Load File</base-button>
      
      <div class="col-sm-1"></div>
      <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="addNode"> Add Node</base-button>
      
      <div class="col-sm-1"></div>
      <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="removeNode"> Remove Node</base-button>
      
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <!-- <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="generateGraph" value="Generate Graph"> -->
    </div>

    <card class="bg-secondary" v-show="fileStatus">
      <div id="DropArea" v-cloak @drop.prevent @dragover.prevent @drop="handleFileDrop">
        <h2>Load File</h2>
        <p>Drag and Drop here</p>
        <!-- <input
          type="file"
          name="Nodes File"
          value=""
          id="file"
          accept=".txt, .csv"
          hidden="true"
          @change="handleFileInput"
        /> -->
         <input type="file" multiple="false" @change="handleFileInput">

        <!-- <Button
          class="col-sm-2 btn btn-outline-primary expand"
          type="button"
          id="customBTN"
          @click="document.getElementById('fileInput').click()"
        >
          Load File
        </Button> -->
        <div>
          <span id="customTXT">Nothing loaded yet</span>
          {{ loaded }}
        </div>
      </div>
    </card>

    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="solve"> Solve</base-button>
      
    </div>

    <!-- <pre>
          {{$data}}
        </pre> -->
  </div>
</template>

<script>
//import { FileReader } from './fileReader.js';

export default {
  props: {
    nodes: {
      required: true,
    },
  },
  data() {
    return {
      currentNode: 1,
      solveStatus: false,
      fileStatus: false,
      loaded: "",
      //
      files: [],
    };
  },
  methods: {
    addNode() {
      this.currentNode += 1;
      let newNode = {
        id: this.currentNode,
        x: 0,
        y: 0,
      };

      this.nodes.push(newNode);
    },
    removeNode() {
      if (this.currentNode > 0) {
        this.currentNode--;
        this.nodes.pop();
      }
    },
    solve() {
      this.$emit("solve", this.nodes);
    },
    loadDataFile() {
      this.fileStatus = true;
    },
    readDataFile: function(file){
      console.log(file);
    },
    /// ======================
    handleFileDrop(e) {
      //console.log("File Dropped")
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        this.files.push(f);
      });
      this.readData();
    },
    handleFileInput(e) {
      //console.log("File Added by List")
      let files = e.target.files
        if(!files) return;
        ([...files]).forEach(f => {  
          this.files.push(f);
        });
      this.readData();
    },
    readData() {
      console.log("Reading Data");
      console.log(this.files[0]);

      let fileReader = new FileReader();
      fileReader.readAsText(this.files[0]);
      
      fileReader.onload = function() {
        let fileString = fileReader.result;
        console.log(fileString);
      };

      fileReader.onerror = function() {
        console.log(fileReader.error);
      };
      
    },
    fillMatrix(fileString) {
      //nodes
      
    }
  },
};
</script>

<style>
.mt-1 {
  margin-top: 0.25rem !important;
}
</style>
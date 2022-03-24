<template>
  <div>
  <div align="center flex-row" class="d-flex w-100">
    <div class="w-25 p-3 mt-4" >
      <div class="input-group-append mb-2 flex-column  justify-content-center w-100">
      <base-button class="w-100" native-type = "submit" type = "primary" v-on:click="loadDataFile">
        <i class="tim-icons icon-cloud-upload-94 md-ico"></i>
        <span class="md-text">Load File</span>
      </base-button>

      <div class="col-sm-1"></div>
      <base-button class="w-100 " native-typde = "submit" type = "primary" v-on:click="addNode">
        <i class="tim-icons icon-simple-add md-ico"></i>
        <span class="md-text">Add Node</span>
      </base-button>

      <div class="col-sm-1"></div>
      <base-button class="w-100 " native-type = "submit" type = "primary" v-on:click="removeNode">
        <i class="tim-icons icon-simple-delete md-ico"></i>
        <span class="md-text">Remove Node</span>
      </base-button>

    </div>
    </div>

    <div class="w-75">
      <table class="table m-0 text-white w-100 border-white rounded container">
      <thead>
        <tr class="border-0">
          <th
            :colspan="3"
            scope="col"
            id="NodesList"
            class="text-center text-dark border-0 "
          >
            Nodes Matrix
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class=" text-center text-dark " scope="col" >
            <center>Node</center>
          </td>
          <td class="bg-white text-center text-dark" scope="col">X</td>
          <td class="bg-white text-center text-dark" scope="col">Y</td>
        </tr>
        <tr :key="'node' + i" v-for="(node, i) in nodes">
          <td class="text-center text-dark border-0" >{{ node.id }}</td>
          <td  class=" p-1 border-bottom border-end border-primary m-2">
            <input type="number" v-model="nodes[i].x" class=" border-0 text-center w-100" />
          </td>
          <td  class=" p-1 border-bottom border-end border-primary m-2">
            <input type="number" v-model="nodes[i].y" class = "border-0 text-center w-100"  />
          </td>
          <!-- <td style='width: 9%; height: 50%;' :key="'node' + j" v-for="(nodeTwo, j) in node" ><input type='number' v-model="graph[nodeOne.id][nodeTwo.id]"></td> -->
        </tr>
      </tbody>
    </table>
    </div>
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

    <div class="input-group-append justify-content-end">
      <base-button class="w-25" native-type = "submit" type = "primary" v-on:click="solve"> Solve</base-button>

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
.md-ico{
  display: none;
}

@media(max-width: 950px){
  .md-ico{
    display: block;
  }
  .md-text{
    display: none !important;
  }
}
</style>

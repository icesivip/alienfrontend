<template>
    
    <div class="w-75 m-auto mb-3 ">
        <table class=" border w-100 bg-white shadow p-4 text-dark m-auto" >
            <thead>
                <tr class="text-center border">
                    <th class="text-center p-3" :colspan="2"> <b>Trucks Capacity </b></th>
                </tr>

            </thead>
            <tbody class="text-center">
                <tr class="border">
                    <td class="w-50 p-3">
                       <b> Truck </b>
                    </td>
                    <td class="w-50 p-3">
                       <b> Capacity </b>
                    </td>
                </tr>
                <tr class="border">
                    <td class="w-50 p-3">0</td>
                    <td class= "w-50 p-3 text-center"><input type="Number" name="" id=""></td>
                </tr>

                
            </tbody>
        </table>

        <div class = "w-100  d-flex mt-3 mb-5">
          <base-button class="w-50 mr-5" native-type = "submit" type = "primary"> Add Truck</base-button>
        <base-button class="w-50 ml-5 " native-type = "submit" type = "primary"> Remove Truck</base-button>
        </div>



        <div class="w-100 m-auto mt-5 shadow ">
          <table class="w-100 ">
            <thead>
              <tr>
                <th colspan="5" class="text-center bg-primary text-white">
                  nodes table
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2" class="text-center text-white bg-primary ">
                  <b>Node</b>
                </td>
                <td class="text-center text-dark bg-white" :colspan="1">
                  <b>X</b>
                </td>
                <td class="text-center text-dark bg-white">
                  <b>Y</b>
                </td>
                <td class="text-center text-dark bg-white">
                  <b>Demand</b>
                </td>
              </tr>
              <tr>
                <td colspan="2" class="text-center text-white bg-primary ">
                  <b>Node</b>
                </td>
                <td class="text-center text-dark bg-white">
                  <input type="number" name="" id="" style = "width : 20%; margin : 0%">
                </td>
                <td class="text-center text-dark bg-white">
                  <b>Y</b>
                </td>
                <td class="text-center text-dark bg-white">
                  <b>Demand</b>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
    </div>
</template>

<script>
//import { FileReader } from './fileReader.js';

export default {
  props: {
    nodes: {
      required: true,
    },
    vehicles: {
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
<template>
    
    <div class="w-75 m-auto mb-3 ">
        <table class=" border w-100 bg-white shadow p-4 text-dark m-auto" >
            <thead>
                <tr class="text-center border">
                    <th class="text-center p-3" :colspan="3"> <b>Trucks </b></th>
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
                    <td>
                      <b> Quantity </b>
                    </td>
                </tr>
                <tr class="border" :key="'truck' + i" v-for="(truck, i) in vehicles">
                    <td class="p-3 w-auto">{{i}}</td>
                    <td class= " w-auto p-3 text-center"><input type="Number" name="" id="" v-model="vehicles[i].capacity"></td>
                    <td class=" w-auto p-3 text-center">
                      <input type="number" name="" id="" v-model="vehicles[i].quantity">
                    </td>
                </tr>

                
            </tbody>
        </table>

        <div class = "w-100  d-flex mt-3 mb-5">
          <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="addTruck"> Add Truck</base-button>
        <base-button class="w-50 ml-5 " native-type = "submit" type = "primary" v-on:click = "removeTruck"> Remove Truck</base-button>
        </div>



        <div class="w-100 m-auto mt-5 mb-5 ">
          <table class="w-100 shadow ">
            <thead>
              <tr>
                <th colspan="5" class="text-center bg-primary text-white p-3">
                  Nodes Table
                </th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td colspan="2" class="text-center text-white bg-primary p-3">
                  <b>Node</b>
                </td>
                <td class="text-center text-dark bg-white p-3" :colspan="1">
                  <b>X</b>
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <b>Y</b>
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <b>Demand</b>
                </td>
              </tr>

              <tr  class="border">
                <td  :colspan="2" class="text-center text-white bg-primary p-3 ">
                  <b>DEPOT</b>
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <input type="number" name="" id="" v-model="depot.x">
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <input type="number" name="" id="" v-model="depot.y" >
                </td>
                <td class="text-center text-dark bg-white p-3">
                  
                </td>
              </tr>

              <tr :key="'node' + i" v-for="(node, i) in nodes" class="border">
                <td  :colspan="2" class="text-center text-white bg-primary p-3 ">
                  <b>{{i}}</b>
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <input type="number" name="" id="" v-model="nodes[i].x">
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <input type="number" name="" id="" v-model="nodes[i].y" >
                </td>
                <td class="text-center text-dark bg-white p-3">
                  <input type="number" name="" id="" v-model="nodes[i].demand">
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <br>
        
        <div class = "w-100  d-flex mt-3 mb-5">
          <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="addNode"> Add Node</base-button>
        <base-button class="w-50 ml-5 " native-type = "submit" type = "primary" v-on:click = "removeNode"> Remove Node</base-button>
        </div>

        <div class = "w-100  d-flex mt-3 mb-5">
          <base-button class="w-50 mr-5" native-type = "submit" type = "primary" v-on:click="addNode"> Load File</base-button>
        <base-button class="w-50 ml-5 " native-type = "submit" type = "primary" v-on:click = "removeNode"> Solve</base-button>
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
    depot: {
      required: true,
    },
  },
  data() {
    return {
      currentNode: 1,
      currentTruck : 1,
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
        demand: 0
      };

      this.nodes.push(newNode);
    },
    addTruck(){
      this.currentTruck += 1;
      let newTruck = {
        id: this.currentNode,
        capacity: 0,
        quantity: 1
      }
      this.vehicles.push(newTruck)
    },
    removeNode() {
      if (this.currentNode > 0) {
        this.currentNode--;
        this.nodes.pop();
      }
    },
    removeTruck(){
      if (this.currentTruck > 0)
      {
        this.currentNode--;
        this.vehicles.pop();
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
<template>

    <div class="w-75 m-auto mb-3 ">


      <div align="center flex-row" class="d-flex w-100">

        <div class="w-25  mt-5">

          <div class="input-group-append mb-2 flex-column  justify-content-center w-100 mt-5">
          <base-button class="w-100 " native-type = "submit" type = "primary" v-on:click="addTruck">
            <i class="tim-icons icon-simple-add md-ico"></i>
            <span class="md-text">Add Truck</span>
          </base-button>
        <base-button class="w-100 " native-type = "submit" type = "primary" v-on:click = "removeTruck">
          <i class="tim-icons icon-simple-delete md-ico"></i>
          <span class="md-text">Remove Truck</span>
        </base-button>
        </div>
        </div>
        <div class="w-75 p-3 mt-4" >
          <table class="  w-100 bg-white  p-4 text-dark m-auto" >
            <thead>
                <tr class="text-center text-dark border-0">
                    <th class="text-center p-3" :colspan="3"> <b>Trucks </b></th>
                </tr>

            </thead>
            <tbody class="text-center">
                <tr class="">
                    <td class="bg-white text-center text-dark">
                       <b> Truck </b>
                    </td>
                    <td class="bg-white text-center text-dark">
                       <b> Capacity </b>
                    </td>
                    <td class="bg-white text-center text-dark">
                      <b> Quantity </b>
                    </td>
                </tr>
                <tr class="" :key="'truck' + i" v-for="(truck, i) in vehicles">
                    <td class="text-center text-dark border-0"><b>{{i}}</b> </td>
                    <td class= "p-1 border-bottom border-end border-primary m-2"><input type="Number" name="" id="" v-model="vehicles[i].capacity" class=" border-0 text-center w-100"></td>
                    <td class=" p-1 border-bottom border-end border-primary m-2">
                      <input type="number" name="" id="" v-model="vehicles[i].quantity" class=" border-0 text-center w-100">
                    </td>
                </tr>


            </tbody>
        </table>
        </div>
      </div>




        <div align="center flex-row" class="d-flex w-100" >
          <div class="w-25 p-3 mt-4">
          <div class = "input-group-append mb-2 flex-column  justify-content-center w-100">
            <base-button class="w-100" native-type = "submit" type = "primary" v-on:click="addNode">
              <i class="tim-icons icon-simple-add md-ico"></i>
              <span class="md-text">Add Node</span>
            </base-button>
            <base-button class="w-100 " native-type = "submit" type = "primary" v-on:click = "removeNode">
              <i class="tim-icons icon-simple-delete md-ico"></i>
              <span class="md-text">Remove Node</span>
            </base-button>


          <base-button class="w-100" native-type = "submit" type = "primary" v-on:click="addNode">
            <i class="tim-icons icon-cloud-upload-94 md-ico"></i>
            <span class="md-text">Load File</span>
          </base-button>
        <base-button class="w-100 " native-type = "submit" type = "primary" v-on:click = "removeNode"> Solve</base-button>
        </div>

        </div>
        <br>
        <div class="w-75">
          <div class="w-100 m-auto mt-5 mb-5 ">
          <table class="w-100  ">
            <thead>
              <tr>
                <th colspan="5" class="text-center text-dark border-0">
                  Nodes Table
                </th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td colspan="2" class="p-1 border-bottom border-end border-white m-2 ">
                 <b> Node </b>
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

              <tr  >
                <td  :colspan="2" class="p-1 border-bottom border-end border-white m-2 ">
                  <b>DEPOT</b>
                </td>
                <td class="p-1 border-bottom border-end border-primary m-2">
                  <input type="number" name="" id="" v-model="depot.x" class="border-0 text-center w-100">
                </td>
                <td class="p-1 border-bottom border-end border-primary m-2">
                  <input type="number" name="" id="" v-model="depot.y" class="border-0 text-center w-100" >
                </td>
                <td class="p-1 border-bottom border-end border-white m-2">

                </td>
              </tr>

              <tr :key="'node' + i" v-for="(node, i) in nodes" >
                <td  :colspan="2" class="p-1 border-bottom border-end border-white m-2 ">
                  <b>{{i}}</b>
                </td>
                <td class="p-1 border-bottom border-end border-primary m-2">
                  <input type="number" name="" id="" v-model="nodes[i].x" class="border-0 text-center w-100">
                </td>
                <td class="p-1 border-bottom border-end border-primary m-2">
                  <input type="number" name="" id="" v-model="nodes[i].y" class="border-0 text-center w-100">
                </td>
                <td class="p-1 border-bottom border-end border-primary m-2">
                  <input type="number" name="" id="" v-model="nodes[i].demand" class="border-0 text-center w-100">
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        </div>
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

.md-ico{
  display: none;
}

@media(max-width: 950px){
  .md-ico{
    display: block;
  }
}
</style>

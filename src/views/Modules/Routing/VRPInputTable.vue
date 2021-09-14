<template>
    
    <div class="w-75 m-auto">
        <table class="border-5 w-100" >
            <thead>
                <tr class="text-center">
                    <th class="text-center" :colspan="2">Trucks Capacity</th>
                </tr>

            </thead>
            <tbody class="text-center">
                <tr>
                    <td class="w-50">
                        Truck
                    </td>
                    <td class="w-50">
                        Capacity
                    </td>
                </tr>
                <tr>
                    <td class="w-50">0</td>
                    <td class= "w-50"><input type="text" name="" id=""></td>
                </tr>
            </tbody>
        </table>
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
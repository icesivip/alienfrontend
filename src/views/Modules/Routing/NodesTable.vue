<template>
  <div align="center">
    <table class="table-responsive text-white border-white rounded container">
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
      <input
        class="col-sm-2 btn btn-outline-primary expand"
        type="button"
        v-on:click="loadDataFile"
        value="Load file"
      />
      <div class="col-sm-1"></div>
      <input
        class="col-sm-2 btn btn-outline-primary expand"
        type="button"
        v-on:click="addNode"
        value="Add Node"
      />
      <div class="col-sm-1"></div>
      <input
        class="col-sm-2 btn btn-outline-danger expand"
        type="button"
        v-on:click="removeNode"
        value="Remove Node"
      />
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <!-- <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="generateGraph" value="Generate Graph"> -->
    </div>

    <card class="bg-secondary" v-show="fileStatus">
      <div id="DropArea">
        <h2>Load File</h2>
        <p>Drag and Drop here</p>
        <input
          type="file"
          name="Nodes File"
          value=""
          id="file"
          accept=".txt, .csv"
          hidden="true"
        />
        <Button
          class="col-sm-2 btn btn-outline-primary expand"
          type="button"
          id="customBTN"
        >
          Load File
        </Button>
        <div>
          <span id="customTXT">Nothing loaded yet</span>
          {{ loaded }}
        </div>
      </div>
    </card>

    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input
        class="col-sm-5 btn btn-outline-primary expand"
        type="button"
        v-on:click="solve"
        value="Solve Nearest Neighbor"
      />
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
      loaded: "NOPE"
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
    }
  },
  mounted: function () {
    var f = document.getElementById("file");
    var fileList;
    //var fs = document.getElementById("fs");
    var customButton = document.getElementById("customBTN");
    var customText = document.getElementById("customTXT");

    customButton.addEventListener("click", function (e) {
      f.click();
    });

    f.addEventListener("change", function (e) {
      if (f.value) {
        customTXT.innerHTML = f.value;
      } else {
        customTXT.innerHTML = "Nothing loaded yet";
      }
    });

    f.addEventListener("change", function (event) {
      fileList = event.target.files;
      //console.log(fileList);
      getMetadataForFileList(fileList);
    });

    const dropArea = document.getElementById("DropArea");

    dropArea.addEventListener("dragover", function (event) {
      event.stopPropagation();
      event.preventDefault();
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = "copy";
    });

    dropArea.addEventListener("drop", function (event) {
      event.stopPropagation();
      event.preventDefault();
      fileList = event.dataTransfer.files;
      //console.log(fileList);
      getMetadataForFileList(fileList);
    });

    function getMetadataForFileList(data) {
      for (const file of fileList) {
        // Not supported in Safari for iOS.
        const name = file.name ? file.name : "NOT SUPPORTED";
        // Not supported in Firefox for Android or Opera for Android.
        const type = file.type ? file.type : "NOT SUPPORTED";
        // Unknown cross-browser support.
        const size = file.size ? file.size : "NOT SUPPORTED";
        //console.log({ file, name, type, size });

        readFile(file);
      }
    }

    function readFile(file) {
      var reader = new FileReader();
      reader.addEventListener("load", function (event) {
        //console.log(event.target.result);
        
        let inputString = event.target.result;
        console.log(inputString);
        this.readDataFile(inputString);
        customTXT.innerHTML = file.name;
      });

      reader.addEventListener("progress", function (event) {
        if (event.loaded && event.total) {
          const percent = (event.loaded / event.total) * 100;
          //console.log(`Progress: ${Math.round(percent)}`);
        }
      });
      reader.readAsText(file);
      
    }
  },
};
</script>

<style>
.mt-1 {
  margin-top: 0.25rem !important;
}
</style>
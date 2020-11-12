<style type="text/css">
        #mygraph {
          width: 300;
          height: 400px;
          border: 1px solid lightgray;
          background:#d1d1d1;
        }
  </style>
   <script type="text/javascript" src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
<template>
  <div id="mst">
    <table class="table-responsive table text-light">
      <thead>
        <tr class="bg-primary">
          <th :colspan="11" scope="col" id="tableGraph" class="text-center">Adjacency Matrix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="bg-primary" scope="col">Node</td>
          <td class="bg-primary" scope="col" :key="'node'+i" v-for="(nod, i) in node">{{nod.id}}</td>
        </tr>
        <tr :key="'node' + i" v-for="(nodeOne, i) in node">
          <td class="bg-primary">{{nodeOne.id}}</td>
          <td style='width: 9%; height: 50%;' :key="'node' + j" v-for="(nodeTwo, j) in node" ><input type='number' v-model="graph[nodeOne.id][nodeTwo.id]"></td>
        </tr>
      </tbody>
    </table>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="addNode" value="Add Node"><div class="col-sm-1"></div>
      <input class="col-sm-5 btn btn-outline-danger expand" type="button" v-on:click="removeNode" value="Remove Node">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-outline-success expand" type="submit" v-on:click="generateGraph" value="Generate Graph">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-outline-primary expand" type="button" v-on:click="solveMST" value="Solve">
    </div>
     <div id="mygraph"></div>
    <input class="col-sm-12 btn btn-outline-danger expand" type="button" v-on:click="nextStep" value="Next">

  </div>
</template>
 
<script>

import { DataSet, DataView, Network } from "vis";
import SPRepository from './../../../repositories/Modules/Networks/SHPath';
export default {
  name: "mst",
  
  data() {
    return {
      node: [
        {
            id: 0,
        },{
            id: 1,
        },{
            id: 2,
        },{
            id: 3,
        }
      ],
      
      graph: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
         ['', '', '', ''],
      ],
     currentNode: 3,
     
    network: {
      nodes: new DataSet(),
     edges: new DataSet(),
    },
    options : {
          edges: {
            smooth: {
              type: "curvedCW",
              roundness: 0.5
            }
          },
          physics: true
      },
    graphBack: {
      graph: [['']],
      source: '',
      path: "",
      sink: ""
    },
    path: "",
    pos: 0
    };
  },
  methods: {
    addNode(){
      this.currentNode = this.currentNode+1; // id of new node
      var newNode = {
        id: this.currentNode,   
      };
    for(let i=0; i<this.currentNode; i++){
        this.graph[i].push('');              //add the new node to all nodes
    }
    var newNodes = [];
    for(let i=0; i<=this.currentNode; i++){
        newNodes[i] = '';                  // add all nodes to new node
    }
    this.graph.push(newNodes);
    this.node.push(newNode)
    },
    removeNode(){
      this.currentNode = this.currentNode-1;
      this.graph.pop();
      this.node.pop();
    },
    generateGraph(){
       this.pos=0;
      this.network.nodes = new DataSet();
        this.network.edges = new DataSet();
        for(let i=0; i<this.graph.length; i++){
              this.network.nodes.add({id: i, label: 'Node '+i, color: 'white',font: {size: 12, strokeWidth: 2, strokeColor: 'silver'}});
        }
        var count = 0;
        for(let i=0; i<this.graph.length;i++){
            for(let j=0; j<this.graph[i].length;j++){
                var cur = this.graph[i][j];
                if(cur!=''){
                    this.network.edges.add({id: count,from:i, to:j , arrows: 'to', width: 2, length: 400, label: cur,  color:{color:'blue'}});
                    count++;
                }
            }
        }
        var container = document.getElementById("mygraph");
         this.globalGraph = new Network(container,this.network, this.options);
        
    },
    nextStep(){
      if(this.pos<this.path.length){
            var actual = this.path[this.pos].split(',');
            var a; 
            var edgeID; 
            var b;
            console.log(actual);
            if(actual.length==1){
                var act2 = this.path[this.pos-1].split(',');
                a = act2[0];
                edgeID = act2[1];
                b = act2[2];
                if(actual[0]=="1"){
                    var edge = this.network.edges.get(parseInt(edgeID, 10));
                    edge.color = {color:'red'};
                    this.network.edges.update(edge);
                }
            }else{
                a = actual[0];
                edgeID = actual[1];
                b = actual[2];
                try {
                    var edge = this.network.edges.get(parseInt(edgeID, 10));
                    edge.color = {color:'black'};
                    this.network.edges.update(edge);

                }
                catch (err) {
                   alert(err);
                }
            }
            this.pos++;
            if(this.pos<this.path.length){
              actual = this.path[this.pos].split(",");
              if(actual.length==1 && actual[0]=="0"){
                this.pos++;
              }
            }
      }
    },
    solveMST(){
      this.pos=0;
      this.graphBack.graph = this.graph;
      var gr = this.graphBack;
      SPRepository.solveMST(gr).then((response) => {
          if(response.status < 400){
            this.path = response.data.split("-");
            console.log(this.path);
          }
        }
      );
    },
  }
}

</script>

<style>
</style>
<style type="text/css">
        #mygraph {
          width: 300;
          height: 400px;
          border: 1px solid lightgray;
          background:#d1d1d1;
        }
          #separator{
            height: 60px;
        }
  </style>
   <script type="text/javascript" src="https://visjs.github.io/vis-network/standalone/umd/vis-network.min.js"></script>
<template>
  <div id="shPath">
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
      <div class="col text-center"> Source<input type="number" min="0" style="width: 100%" v-model="from"></div>
      <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="solveModelDijkstra" value="Solve Dikjstra">
    </div>
    <h2 class="text-center">Results</h2>
     <div id="mygraph"></div>
      <input class="col-sm-12 btn btn-outline-danger expand" type="button" v-on:click="nextStep" value="Next">

  <div id="separator"></div>

       <div class="input-group-append mb-2 flex-nowrap justify-content-center">
          <div class="col text-center"> Destination<input type="number" min="0" style="width: 100%" v-model="sink"></div>
          <input class="col-sm-5 btn btn-outline-primary expand" type="button" v-on:click="getPath"  value="Show Path">
        </div>
       <div id="separator"><h2 class="text-center">Distance:</h2> <h2 class="text-center" id="distance"></h2></div>
    
  </div>
</template>
 
<script>

import { DataSet, DataView, Network } from "vis";
import SPRepository from './../../../repositories/Modules/Networks/SHPath';
export default {
  name: "shPath",
  
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
     from : "",
     sink: "",
    network: {
      nodes: new DataSet(),
      edges: new DataSet(),
     
    },options : {
          edges: {
            smooth: {
              type: "curvedCW",
              roundness: 0.6
            }
          },
          physics: true
      },
    path : [''],
    pos: 0,
    graphBack: {
      graph: [['']],
      source: '',
      path: "",
      sink: ""
    },
     globalGraph: null
    } 
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
         var net = new Network(container,this.network, this.options);
    },
     nextStep(){
       var actual;
       for(let i=this.pos; i<this.path.length;i++){
          actual = this.path[this.pos].split(',');
         if(actual.length<4){
           this.pos++;
         }else{
           break;
         }
       }
        if(actual.length==4){
            var a = actual[0];
            var edgeID = actual[1];
            var b = actual[2];
            var valid = actual[3];
           console.log("a: "+ a+" edgeID: "+ edgeID+ " b: "+ b+" valid: "+ valid);
            try {
              
                var edge = this.network.edges.get(parseInt(edgeID, 10));
                edge.color = {color:'red'};
                this.network.edges.update(edge);
                
                var nodeA = this.network.nodes.get(parseInt(a, 10));
                nodeA.color = 'blue';
                this.network.nodes.update(nodeA);
                var nodeB = this.network.nodes.get(parseInt(b, 10));
                nodeB.color ='gray';
                this.network.nodes.update(nodeB);

                console.log("edge found: " + edge.id+ " nodeA: " + nodeA.id+ " nodeB: "+ nodeB.id);
            }
            catch (err) {
                alert(err);
            }
        }this.pos++;
    },
     showPath(data){
      // this.resetGraph();
            var arr = data.split('-');
            for(let i=0; i<arr.length-1; i++){
                var actual = arr[i].split(',');
                var a = actual[0];
                var edgeID = actual[1];
                var b = actual[2]; 
                try {
              
                var edge = this.network.edges.get(parseInt(edgeID, 10));
                edge.color = {color:'#645E4F'};
                this.network.edges.update(edge);
                
                var nodeA = this.network.nodes.get(parseInt(a, 10));
                nodeA.color = '#FCCE78';
                this.network.nodes.update(nodeA);
                var nodeB = this.network.nodes.get(parseInt(b, 10));
                nodeB.color ='#FCCE78';
                this.network.nodes.update(nodeB);

                console.log("edge found: " + edge.id+ " nodeA: " + nodeA.id+ " nodeB: "+ nodeB.id);
            }
            catch (err) {
                alert(err);
            }
            
            document.getElementById("distance").innerHTML = arr[arr.length-1];
            }
        },
        resetGraph(){
          for(var i=0;this.network.nodes.length;i++){
            try {
                var nodeA = this.network.nodes.get(parseInt(i,10));

                nodeA.color = '#FCCE78';
                this.network.nodes.update(nodeA);
            }
            catch (err) {
                alert(err);
            }
          }
        },
    solveModelDijkstra(){
      this.pos=0;
      this.graphBack.source = this.from;
      this.graphBack.graph = this.graph;
      var gr = this.graphBack;
      SPRepository.solveDijkstra(gr).then((response) => {
          if(response.status < 400){
            this.path = response.data.split("-");
            console.log(this.path);
          }
        }
      );
    }, getPath(){
      this.pos=0;
      this.graphBack.source = this.from;
      this.graphBack.graph = this.graph;
      this.graphBack.sink = this.sink;
      var gr = this.graphBack;
      SPRepository.getPath(gr).then((response) => {
          if(response.status < 400){
            this.showPath(response.data);
            console.log(response.data);
          }
        }
      );
    }
  }
}

</script>

<style>
</style>
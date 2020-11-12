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
  <div id="MFP">
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
      <div class="col text-center"> Source<input type="number" min="0" style="width: 100%" v-model="source"></div>
      <div class="col text-center"> Sink <input type="number" min="0" style="width: 100%" v-model="sink"></div>
    </div>

    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-outline-primary expand" type="button" v-on:click="solveFlow" value="Solve Max flow">
    </div>
     <div id="mygraph"></div>
     <input class="col-sm-12 btn btn-outline-danger expand" type="button" v-on:click="nextStep" value="Next">
  <div id="separator"><h2 class="text-center">Total flow:</h2> <h2 class="text-center" id="totalFlow"></h2></div>
  
     <div id="mynetwork"></div>

  </div>
</template>

<script>

import { DataSet, DataView, Network } from "vis";
import SPRepository from './../../../repositories/Modules/Networks/SHPath';

export default {
  name: "mfp",

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
     source: "",
     sink: "",
     path: "",
     pos:0,
     step:0,
   network: {
      nodes: new DataSet(),
      edges: new DataSet(),
    },
    options : {
          edges: {
            smooth: {
              type: "curvedCW",
              roundness: 0.2
            }
          },
          physics: true
      },
    graphBack: {
      graph: [['']],
      source: "",
      path: "",
      sink: ""
    },
      


    options : {
          edges: {
            smooth: {
              type: "curvedCW",
              roundness: 0.6
            }
          },
          physics: true
      }
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
                    this.network.edges.add({id: count,from:j, to:i , arrows: 'to', width: 2, length: 400, label: "0",  color:{color:'red'}});
                    count++;
                }

            }
        }
        this.step=0;
        var container = document.getElementById("mygraph");
         var net = new Network(container,this.network, this.options);
    },
    nextStep(){
        var actual = this.path[this.pos];
        var arr = actual.split("-");
        var cnt = parseInt(actual[actual.length-1],10);
        if(this.pos<this.path.length-1){
          console.log("path lenghth  " + this.path.length + "pos   " + this.pos )
        if(this.step==0){
          
          for(let i=0; i<arr.length-1; i++){
                var actual2 = arr[i].split(',');
                var a = actual2[0];
                var edgeID = actual2[1];
                var b = actual2[2]; 
                console.log(a+" "+edgeID+" "+b );
              try{
                var edge = this.network.edges.get(parseInt(edgeID,10));
                edge.color = {color:'#645E4F'};
                edge.id = edgeID;
                this.network.edges.update(edge);
                
                var nodeA = this.network.nodes.get(parseInt(a, 10));
                nodeA.color ='#FCCE78';
                this.network.nodes.update(nodeA);
                var nodeB = this.network.nodes.get(parseInt(b, 10));
                nodeB.color ='#FCCE78';
                this.network.nodes.update(nodeB);
              }catch(err){
                alert(err);
              }
            }this.step++;
        }else{
            for(let i=0; i<arr.length-1; i++){
              var actual2 = arr[i].split(',');
              var edgeID = actual2[1];
              console.log(edgeID);
              var edg = this.network.edges.get(parseInt(edgeID,10)); //arista normal
              edg.label = ""+(parseInt(edg.label,10)-cnt);
              var edg2 =null;
              if(parseInt(edgeID,10)%2==0){
                 edg2 = this.network.edges.get(parseInt(edgeID,10)+1); // arista al reves
              }else{
                edg2 = this.network.edges.get(parseInt(edgeID,10)-1); 
              }
              edg2.label = ""+(parseInt(edg2.label,10)+cnt);
              this.network.edges.update(edg);
              this.network.edges.update(edg2);
            }
            this.step=0;
           this.pos++;
        }document.getElementById("totalFlow").innerHTML = cnt;
        }
    },
    solveFlow(){
      this.pos=0;
      this.step=0;
      this.graphBack.source = this.source;
      this.graphBack.graph = this.graph;
      this.graphBack.sink = this.sink;
      var gr = this.graphBack;
      SPRepository.solveFlow(gr).then((response) => {
          if(response.status < 400){
           this.path = response.data.split("\n");
           console.log(this.path);
          }
        }
      );
    }
  }
}

</script>

<style>

</style>

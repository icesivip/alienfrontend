<template>
  <div>
    <div>
      <h2 class="text-center">Graphical Method Solver</h2>
    </div>
    <LPTable v-model="lpModel" maximumVars="2" problemType="Continuous"> </LPTable>
    <base-button type="primary" block @click="solveSolution">
      Solve
    </base-button>

    <h2 class="text-center">Solution Space Chart</h2>
   <line-chart style="height: 25%"
              :chart-data="myChart.data" v-if="myChart"
              :extra-options="myChart.options">
  </line-chart>

    <h2 class="text-center">Basic Feasible Solution</h2>
    <table class="table">
      <thead>
        <tr>
          <th
            class="text-center"
            v-for="item in headSolution"
            v-bind:key="item.title"
          >
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in elements" :key="n">
          <td class="text-center">
            {{ solutionsX[n] }}
          </td>
          <td class="text-center">
            {{ solutionsY[n] }}
          </td>
          <td class="text-center">
            {{ solutionsZ[n] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Table from "./../../../components/Modules/Table";
import axios from "axios";
import Chart from "chart.js";
import zoom from "chartjs-plugin-zoom";
import LPTable from "./../../../components/Modules/LinearProgramming/LPTable";

import LineChart from 'src/components/Charts/LineChart'
import BarChart from 'src/components/Charts/BarChart'
import PieChart from 'src/components/Charts/PieChart'

export default {
  data() {
    return {
      myChart: null,
      lpModel: {},
      headSolution: [],
      solutionsX: [],
      solutionsY: [],
      solutionsZ: [],
      elements: 0,
      height: "device-height"
    };
  },
  components: {
    "app-table": Table,
    LPTable,
    LineChart,
    BarChart,
    PieChart
  },
  mounted() {},
  methods: {
    buildQuery() {
      //?type=MAXIMIZE&vars=X1:I,X2:B&objectiveFunction=1,6&constraints=1,6,<=,67;1,1,<=,5;

      var query = "?type=";
      query += this.lpModel.objectiveFunction.type.toUpperCase() + "&vars=";
      for (var i = 0; i < this.lpModel.variables.length; i++) {
        if (this.lpModel.variables[i] == "Continuous") {
          query += "X" + (i + 1) + ":C";
        } else if (this.lpModel.variables[i] == "Binary") {
          query += "X" + (i + 1) + ":B";
        } else {
          query += "X" + (i + 1) + ":I";
        }

        if (i != this.lpModel.variables.length - 1) {
          query += ",";
        }
      }
      query += "&objectiveFunction=";
      for (
        var i = 0;
        i < this.lpModel.objectiveFunction.coefficients.length;
        i++
      ) {
        query += this.lpModel.objectiveFunction.coefficients[i];
        if (i != this.lpModel.objectiveFunction.coefficients.length - 1) {
          query += ",";
        }
      }
      query += "&constraints=";
      for (var i = 0; i < this.lpModel.constraints.length; i++) {
        for (
          var j = 0;
          j < this.lpModel.constraints[i].coefficients.length;
          j++
        ) {
          query += this.lpModel.constraints[i].coefficients[j] + ",";
        }
        query += this.lpModel.constraints[i].type + ",";
        query += this.lpModel.constraints[i].limit + ";";
      }
      return query
    },
    solveSolution() {
      var qwery = this.buildQuery();
      axios
        .get("https://viptest1.herokuapp.com/graphicalMethod/" + qwery)
        .then(response => {
          console.log(response);
          var constraints = response.data.constraints;
          var optimal = response.data.optimalSolution;
          var solList = response.data.solutionList;
          for(var i=0;i<solList.length;i++){
            for(var j=i+1;j<solList.length;j++){
              if(solList[i].z==solList[j].z && solList[i].variables.X1==solList[j].variables.X1 && solList[i].variables.X2==solList[j].variables.X2){
                solList.splice(j,1)
                j--;
                break;
              }
            }
          }
          console.log(solList)
          var solX = [];
          var solY = [];
          constraints.forEach(element => {
            // Esto fue lo que cambie para graficar las restricciones de no negatividad
            var cx;
            var cy;
            if (element.xValue == 0) {
              cx = 0;
              cy = element.rightValue / element.yValue;
            } else if (element.yValue == 0) {
              cy = 0;
              cx = element.rightValue / element.xValue;
            } else {
              cx = element.rightValue / element.xValue;
              cy = element.rightValue / element.yValue;
            }
            if (cx != Infinity && cx != -Infinity) {
              solX.push(cx);
            }
            if (cy != Infinity && cy != -Infinity) {
              solY.push(cy);
            }
          });
          this.headSolution = [];
          this.headSolution.push({ title: "X1" });
          this.headSolution.push({ title: "X2" });
          this.headSolution.push({ title: "Z" });
          var contador = 0;
          this.solutionsY = [];
          this.solutionsZ = [];
          this.solutionsX = [];
          solList.forEach(element => {
            solX.push(element.variables.X1);
            this.solutionsX.push(element.variables.X1);
            solY.push(element.variables.X2);
            this.solutionsY.push(element.variables.X2);
            this.solutionsZ.push(element.z);
            contador++;
          });
          this.elements = contador;
          var minX;
          var maxX;
          minX = Math.min.apply(Math, solX);
          maxX = Math.max.apply(Math, solX);
          if (minX > 0) {
            minX = 0;
          }
          minX = minX - 1;
          maxX = maxX + 1;
          constraints.forEach(element => {
            if (element.xValue != 0 && element.yValue != 0) {
              solY.push(
                (element.rightValue - (element.xValue * minX + 1)) /
                  element.yValue
              );
              solY.push(
                (element.rightValue - (element.xValue * maxX - 1)) /
                  element.yValue
              );
            }
          });
          var minY;
          var maxY;
          minY = Math.min.apply(Math, solY);
          maxY = Math.max.apply(Math, solY);
          if (minY > 0) {
            minY = 0;
          }
          minY = minY - 1;
          maxY = maxY + 1;
          if (minX == 0 && maxX == 0) {
            maxX = 1;
          }
          if (minY == 0 && maxY == 0) {
            maxY = 1;
          }
          var constCount;
          constCount = constraints.length;
          var dataframe;
          dataframe = [];
          var dataAux;
          dataAux = [];
          var colorAux;
          colorAux = [];
          solList.forEach(element => {
            dataAux.push({ x: element.variables.X1, y: element.variables.X2 });
            colorAux.push("rgba(255, 255, 0, 1)");
          });
          dataframe.push({
            label: "Y ",
            data: dataAux,
            backgroundColor: colorAux,
            borderColor: ["rgba(100, 100, 0, 1)"],
            borderWidth: 1,
            fill: true,
            pointRadius: 5,
            showLine: false,
            steppedLine: false,
            lineTension: 0
          });
          var count;
          count = 1;
          constraints.forEach(element => {
            dataAux = [];
            var area;
            area = "start";
            if (element.xValue == 0 || element.yValue == 0) {
              if (element.xValue == 0) {
                dataAux.push({
                  x: minX,
                  y: element.rightValue / element.yValue
                });
                dataAux.push({
                  x: maxX,
                  y: element.rightValue / element.yValue
                });
                if (element.type == "<=") {
                  if (element.yValue < 0) {
                    area = "end";
                  } else {
                    area = "start";
                  }
                } else if (element.type == ">=") {
                  if (element.yValue < 0) {
                    area = "start";
                  } else {
                    area = "end";
                  }
                } else {
                  area = false;
                }
              } else {
                dataAux.push({
                  x: element.rightValue / element.xValue,
                  y: minY
                });
                dataAux.push({
                  x: element.rightValue / element.xValue,
                  y: maxY
                });
                if (element.type == "<=") {
                  if (element.yValue < 0) {
                    area = "start";
                    dataAux.push({ x: maxX, y: maxY });
                  } else {
                    area = "start";
                    dataAux.push({ x: minX, y: maxY });
                  }
                } else if (element.type == ">=") {
                  if (element.yValue < 0) {
                    area = "start";
                    dataAux.push({ x: minX, y: maxY });
                  } else {
                    area = "start";
                    dataAux.push({ x: maxX, y: maxY });
                  }
                } else {
                  area = false;
                }
              }
            } else {
              if (element.type == "<=") {
                if (element.yValue < 0) {
                  area = "end";
                } else {
                  area = "start";
                }
              } else if (element.type == ">=") {
                if (element.yValue < 0) {
                  area = "start";
                } else {
                  area = "end";
                }
              } else {
                area = false;
              }
              dataAux.push({
                x: minX,
                y: (element.rightValue - element.xValue * minX) / element.yValue
              });
              dataAux.push({
                x: maxX,
                y: (element.rightValue - element.xValue * maxX) / element.yValue
              });
            }
            //console.log(dataframe);
            dataframe.push({
              label: "C" + count,
              //showLine = 'true',
              data: dataAux,
              pointRadius: 0,
              borderDash: [10, 5],
              //   backgroundColor: ["rgba(69,255,48, 0.4)"],
              backgroundColor: ["rgba(0, 255, 0, 0.2)"],

              borderColor: ["rgba(0,100, 0, 1)"],
              borderWidth: 1,
              fill: area,
              steppedLine: false,
              lineTension: 0
              //fillBetweenSet: 1,
              //fillBetweenColor: "rgba(255,0,0, 0.2)"
            });
            count++;
          });
          this.myChart ={
            //type: 'scatter',
            type: "line",
            data: {
              datasets: dataframe
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: false
                      //min: minY,
                      //max: maxY
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "X2"
                    },
                    gridLines: {
                      // You can change the color, the dash effect, the main axe color, etc.
                      borderDash: [1, 2],
                      zeroLineColor: "rgba(0,0,0,1)"
                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      beginAtZero: false,
                      min: minX,
                      max: maxX
                    },
                    type: "linear",
                    position: "bottom",
                    scaleLabel: {
                      display: true,
                      labelString: "X1"
                    },
                    gridLines: {
                      // You can change the color, the dash effect, the main axe color, etc.
                      borderDash: [1, 2],
                      zeroLineColor: "rgba(0,0,0,1)"
                    }
                  }
                ]
              },
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                zoom: {
                  // Container for pan options
                  pan: {
                    // Boolean to enable panning
                    enabled: true,
                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    mode: "xy",
                    rangeMin: {
                      // Format of min pan range depends on scale type
                      x: null,
                      y: null
                    },
                    rangeMax: {
                      // Format of max pan range depends on scale type
                      x: null,
                      y: null
                    },
                    // Function called once panning is completed
                    // Useful for dynamic data loading
                    onPan: function({ chart }) {
                      console.log(`I was panned!!!`);
                    }
                  },
                  // Container for zoom options
                  zoom: {
                    // Boolean to enable zooming
                    enabled: true,
                    // Enable drag-to-zoom behavior
                    drag: false,
                    // Drag-to-zoom rectangle style can be customized
                    // drag: {
                    // 	 borderColor: 'rgba(225,225,225,0.3)'
                    // 	 borderWidth: 5,
                    // 	 backgroundColor: 'rgb(225,225,225)'
                    // },
                    // Zooming directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: "xy",
                    rangeMin: {
                      // Format of min zoom range depends on scale type
                      x: null,
                      y: null
                    },
                    rangeMax: {
                      // Format of max zoom range depends on scale type
                      x: null,
                      y: null
                    },
                    // Speed of zoom via mouse wheel
                    // (percentage of zoom on a wheel event)
                    speed: 0.1,
                    // Function called once zooming is completed
                    // Useful for dynamic data loading
                    onZoom: function({ chart }) {
                      console.log(`I was zoomed!!!`);
                    }
                  }
                }
              }
            }
          }
        });
      return null;
    }
  },
  created() {
    // this.addPlugin(zoom);
  }
};
</script>

<style></style>

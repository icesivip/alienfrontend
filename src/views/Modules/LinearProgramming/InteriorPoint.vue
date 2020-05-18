<template>
  <div>
    <div>
      <h2 class="text-center">Interior Point Solver</h2>

      <LPTable v-model="lpModel" problemType="Continuous"> </LPTable>

      <card class="text-center">
        <base-button type="primary" :loading="processing" block @click="solve">
          Solve
        </base-button>
      </card>

      <card v-if="solList" class="text-center">
        <h2 class="card-title">Results</h2>
        <div class="text-center" v-if="myChart">
          <h3 class="text-center card-subtitle">Solution Space Chart</h3>
          <scatter-chart
            style="height: 25%"
            ref="Chart"
            :chart-data="myChart.data"
            :extra-options="myChart.options"
          >
          </scatter-chart>
        </div>

        <hr />

        <div v-if="solList">
          <h3 class="text-center card-subtitle">Solution Path</h3>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th><p>Step</p></th>
                  <th
                    v-for="(key, value, index) in solList[0].variables"
                    :key="index"
                  >
                    <p>
                      X<sub>{{ index + 1 }}</sub>
                    </p>
                  </th>

                  <th><p>Z</p></th>
                  <th><p>Feasible</p></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(constraint, index) in solList" :key="index">
                  <td>
                    <p>
                      {{ index + 1 }}
                    </p>
                  </td>

                  <td
                    v-for="(key, index2) in solList[index].variables"
                    :key="index + ',' + index2 + ''"
                  >
                    <p>
                      {{ key.toFixed(3) }}
                    </p>
                  </td>

                  <td>
                    <p>
                      {{ solList[index].z.toFixed(3) }}
                    </p>
                  </td>

                  <td>
                    <p>
                      {{ solList[index].feasible ? "Yes" : "No" }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import LPTable from "./../../../components/Modules/LinearProgramming/LPTable";
import axios from "axios";
import ScatterChart from "src/components/Charts/ScatterChart";
export default {
  data() {
    return {
      lpModel: {},
      processing: false,
      myChart: null,
      solList: null
    };
  },
  components: {
    LPTable,
    ScatterChart
  },
  methods: {
    buildQuery() {
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
      return query;
    },
    solve() {
      var qwery = this.buildQuery();
      this.processing = true;
      axios
        .get(
          this.$store.state.backend +
            "/interiorPointModule/interiorPoint" +
            qwery
        )
        .then(response => {
          this.solList = response.data.solutionPath;
          if (response.data.constraints != null) {
            console.log(response);
            var data = response.data;
            var maxX = data.maxX;
            var maxY = data.maxY;
            var dataframe = [];
            var constraints = data.constraints;
            var dataAux = [];
            var colors = [];
            data.solutionPath.forEach(element => {
              if (element.variables.X1 > maxX) {
                maxX = element.variables.X1;
              }
              if (element.variables.X2 > maxY) {
                maxY = element.variables.X2;
              }
              if (element.feasible) {
                colors.push("rgba(0, 255, 0, 1)");
              } else {
                colors.push("rgba(255, 0, 0, 1)");
              }
              dataAux.push({
                x: element.variables.X1,
                y: element.variables.X2
              });
            });
            dataframe.push({
              label: " Solution Path",
              data: dataAux,
              pointBackgroundColor: colors,
              borderColor: ["rgba(0,0,0,1)"],
              borderDash: [1, 1],
              borderWidth: 1,
              fill: false,
              pointRadius: 3,
              showLine: true,
              steppedLine: false,
              lineTension: 0
            });

            var count = 1;
            constraints.forEach(element => {
              dataAux = [];
              let area = "start";
              if (element.xValue == 0 || element.yValue == 0) {
                if (element.xValue == 0) {
                  dataAux.push({
                    x: 0,
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
                    y: 0
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
                      dataAux.push({ x: 0, y: maxY });
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
                  x: 0,
                  y: (element.rightValue - element.xValue * 0) / element.yValue
                });
                dataAux.push({
                  x: maxX,
                  y:
                    (element.rightValue - element.xValue * maxX) /
                    element.yValue
                });
              }
              //console.log(dataframe);
              dataframe.push({
                label: "C" + count,
                showLine: "true",
                data: dataAux,
                pointRadius: 0,
                borderDash: [10, 5],
                backgroundColor: ["rgba(0, 255, 0, 0.2)"],
                borderColor: ["rgba(0,100,0,1)"],
                borderWidth: 1,
                fill: area,
                steppedLine: false,
                lineTension: 0
              });

              count++;
            });
            console.log(dataframe);
            data = { datasets: dataframe };
            let options = {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: false,
                      min: 0,
                      max: maxY
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
                      min: 0,
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
                      x: 0,
                      y: 0
                    },
                    rangeMax: {
                      // Format of max pan range depends on scale type
                      x: maxX,
                      y: maxY
                    },
                    // Function called once panning is completed
                    // Useful for dynamic data loading
                    onPan: function({ chart }) {
                      //console.log(`I was panned!!!`);
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
                      x: 0,
                      y: 0
                    },
                    rangeMax: {
                      // Format of max zoom range depends on scale type
                      x: maxX,
                      y: maxY
                    },
                    // Speed of zoom via mouse wheel
                    // (percentage of zoom on a wheel event)
                    speed: 0.01,
                    // Function called once zooming is completed
                    // Useful for dynamic data loading
                    onZoom: function({ chart }) {
                      console.log(`I was zoomed!!!`);
                    }
                  }
                }
              }
            };
            if (!this.myChart) {
              this.myChart = {
                //type: 'scatter',
                data: data,
                options: options
              };
            } else {
              this.myChart.options = options;
              this.myChart.data = data;
              this.$refs.Chart.updateGradients(data);
            }
          } else {
            this.myChart = null;
          }

          this.processing = false;
        })
        .catch(error => {
          console.log(error);
          this.processing = false;
        });
    }
  }
};
</script>

<style></style>

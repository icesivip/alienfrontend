<template>
  <div>
    <div class="col-12" align="center">
      <h1>Inventory Control Systems</h1>
    </div>
    <div class="col-12" align="center">
      <el-tooltip
        content="Know when and how to use it"
        effect="light"
        :open-delay="300"
        placement="top"
      >
        <base-button type="primary" @click.native="modals.notice = true">About</base-button>
      </el-tooltip>
    </div>
    <modal :show.sync="modals.notice" footerClasses="justify-content-center" type="notice">
      <h5 slot="header" class="title title-up">About Inventory Control Systems</h5>
      <div class="instruction">
        <div class="row">
          <strong>
            <i class="tim-icons icon-book-bookmark text-primary"></i>What is it?
          </strong>
          <p class="description">
            Inventory management is a component of supply chain management that involves supervising inventory, and stock items.
            The inventory control systems, by applying methods and precedures, helps business owners to know when it is time to
            restock products or buy more material to make them.
          </p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong>
            <i class="tim-icons icon-notes text-info"></i>When to use it?
          </strong>
          <p class="description">
            Inventory control systems are used to determine the quantity and the moment to order or produce an specific item.
            The system you choose depends on the type of review used and the way orders are made.
          </p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong>
            <i class="tim-icons icon-paper text-success"></i>Instructions
          </strong>
          <p class="description">
            After you choose the type of system to control the inventory, you will need to fill the information required.
            The program gives the outputs associated to the system selected.
          </p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong>
            <i class="tim-icons icon-paper text-success"></i>Considerations
          </strong>
          <p class="description">There are two considerations within this module:</p>
          <p class="description">
            1. There are many ways of calculating the Security Stock. In this case, it is calculated as “P1”, which refers to the probability of
            not having missing parts in each replenishment cycle/Lead Time.
          </p>
          <p
            class="description"
          >2. The distribution of the demand during the replenishment cycle or the forecast errors follows a normal distribution.</p>
        </div>
      </div>
      <div slot="footer" class="justify-content-center">
        <base-button type="primary" round @click.native="modals.notice = false">Let's start!</base-button>
      </div>
    </modal>

    <br />

    <div class="col-lg-12" align="center">
      <form>
        <card>
          <div>
            <div class="row">
              <label class="col-sm-2 col-form-label" style="font-size: 1.00rem">Problem Title</label>
              <div class="col-sm-8">
                <base-input name="title" v-model="title"></base-input>
              </div>
            </div>
          </div>
        </card>
      </form>
    </div>
    <div class="col-lg-12" align="center">
      <card>
        <h2 class="card-title">Type of System</h2>
        <el-tooltip
          content="Select one of the system types to show the parameters needed"
          effect="light"
          :open-delay="300"
          placement="top"
        >
          <base-input>
            <el-select
              class="select-primary col-lg-6"
              placeholder="Choose the system type"
              v-model="selects.chooseSystem"
            >
              <el-option
                v-for="option in selects.systemType"
                class="select-primary"
                :value="option"
                :label="option"
                :key="option"
              ></el-option>
            </el-select>
          </base-input>
        </el-tooltip>
      </card>
    </div>
    <form class="form-horizontal col-lg-12" v-if="selects.chooseSystem!=null">
      <card>
        <h4 slot="header" class="card-title">{{selects.chooseSystem}}</h4>
        <div align="right">
        <el-tooltip
          content="Know when and how to use it"
          effect="light"
          :open-delay="300"
          placement="top"
        >
          <base-button
            v-if="selects.chooseSystem.startsWith('(s,Q)')"
            type="primary"
            @click.native="modals.sq = true"
          >Read More</base-button>
          <base-button
            v-if="selects.chooseSystem.startsWith('(R,S)')"
            type="primary"
            @click.native="modals.rs = true"
          >Read More</base-button>
          <base-button
            v-if="selects.chooseSystem.startsWith('(s,S)')"
            type="primary"
            @click.native="modals.ss = true"
          >Read More</base-button>
        </el-tooltip>
        </div>
        <br>
        <modal :show.sync="modals.sq" footerClasses="justify-content-center" type="notice">
          <h5 slot="header" class="title title-up">About (s,Q):</h5>
          <p class="description">
            In this system, when the Forecasted Inventory is smaller or equal to the reorder point “s”,
            an order is placed for the order quantity “Q”. It is assumed that the replenishment cycle L is constant.
          </p>
          <div class="picture">
            <img src="img/project/equationsSQ.jpg" alt="Thumbnail Image" class="rounded" />
          </div>
          <div class="instruction">
            <strong>Equations</strong>
            <p class="description">D: Average demand (units/year)</p>
            <p class="description">d: Forecast demand (units/period)</p>
            <p class="description">A: order cost ($/unit)</p>
            <p class="description">k: security factor</p>
            <p class="description">v: Unit value of the item ($/unit)</p>
            <p class="description">r: annual keeping percentage (%/year)</p>
            <p class="description">IS: Safety Stock (units)</p>
            <p class="description">L: Lead Time (period)</p>
            <p
              class="description"
            >p1: probability of not having missing parts in each replenishment cycle.</p>
            <p
              class="description"
            >pz(k): probabilidad de que la normal unitaria z tome un mayor o igual que k.</p>
            <p class="description">Q: Order quantity (units)</p>
            <p class="description">s: Reorder point (units)</p>
            <p class="description">xL: Forecast demand according to the Lead Time (units)</p>
            <p class="description">L: Standard deviation of the lead time (units)</p>
            <p
              class="description"
            >1:Standard deviation of the forecasting errors (it is calculated with the square root of the mean error of prediction (RMSEP) or 1,2533* Mean Absolute Deviation (MAD)).</p>
          </div>

          <div slot="footer" class="justify-content-center">
            <base-button type="primary"  round @click.native="modals.sq = false">I got it</base-button>
          </div>
        </modal>

        <modal :show.sync="modals.rs" footerClasses="justify-content-center" type="notice">
          <h5 slot="header" class="title title-up">About (R,S):</h5>
          <p class="description">
            In this system, the inventory is reviewed every R units of time and an amount equal to the difference
            between the maximum value of inventory S and the Forecasted Inventory value at the time of the review is ordered.
          </p>
          <div class="picture">
            <img src="img/project/equationsRS.jpg" alt="Thumbnail Image" class="rounded" />
          </div>
          <div class="instruction">
            <strong>Equations</strong>
            <p class="description">D: Average demand (units/year)</p>
            <p class="description">d: Forecast demand (units/period)</p>
            <p class="description">EOQ: Order quantity (units)</p>
            <p class="description">v: Unit value of the item ($/unit)</p>
            <p class="description">r: annual keeping percentage (%/year)</p>
            <p class="description">R: Review time</p>
            <p class="description">A’: order cost ($/unit) plus review cost</p>
            <p class="description">k: security factor</p>
            <p class="description">L: Lead Time</p>
            <p class="description">S: Maximum inventory (units)</p>
            <p
              class="description"
            >p1: Probability of not having missing parts in each replenishment cycle.</p>
            <p
              class="description"
            >1:Standard deviation of the forecasting errors (it is calculated with the square root of the mean error of prediction (RMSEP) or 1,2533* Mean Absolute Deviation (MAD))</p>
            <p
              class="description"
            >R+L: Standard deviation of the forecasting errors according to the Lead Time + Review time</p>
            <p class="description">xR+L: Forecast demand according to the Lead Time + Review time</p>
          </div>

          <div slot="footer" class="justify-content-center">
            <base-button type="primary" round @click.native="modals.rs = false">I got it</base-button>
          </div>
        </modal>

        <modal :show.sync="modals.ss" footerClasses="justify-content-center" type="notice">
          <h5 slot="header" class="title title-up">About (s,S):</h5>
          <p class="description">
            In this system, each time the Forecasted Inventory is smaller or equal to the reorder point “s”, a quantity “Q”
            that is equal to “S-s” is ordered, so the Forecasted Inventory reaches the level of the maximum inventory S.
          </p>
          <div class="picture">
            <img src="img/project/equationsSS.jpg" alt="Thumbnail Image" class="rounded" />
          </div>
          <div class="instruction">
            <strong>Equations</strong>
            <p class="description">D: Average demand (units/year)</p>
            <p class="description">d: Forecast demand (units/period)</p>
            <p class="description">EOQ: Order quantity (units)</p>
            <p class="description">v: Unit value of the item ($/unit)</p>
            <p class="description">r: annual keeping percentage (%/year)</p>
            <p class="description">R: Review time</p>
            <p class="description">A’: order cost ($/unit) plus review cost</p>
            <p class="description">k: security factor</p>
            <p class="description">IS: Safety Stock (units)</p>
            <p class="description">L: Lead Time</p>
            <p class="description">s: Reorder point (units)</p>
            <p class="description">S: Maximum inventory (units)</p>
            <p class="description">xL: Forecast demand according to the Lead Time (units)</p>
            <p
              class="description"
            >p1: Probability of not having missing parts in each replenishment cycle.</p>
            <p
              class="description"
            >1:Standard deviation of the forecasting errors (it is calculated with the square root of the mean error of prediction (RMSEP) or 1,2533* Mean Absolute Deviation (MAD))</p>
            <p
              class="description"
            >R+L: Standard deviation of the forecasting errors according to the Lead Time + Review time</p>
            <p class="description">xR+L: Forecast demand according to the Lead Time + Review time</p>
            <p class="description">Q (s,S): Order quantity for the s,S inventory system (units)</p>
            <p class="description">E: Forecasted inventory</p>
          </div>

          <div slot="footer" class="justify-content-center">
            <base-button type="primary" round @click.native="modals.ss = false">I got it</base-button>
          </div>
        </modal>

        <div>
          <div class="row">
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Unit Time of the Average Demand</label>
                <div class="col-8">
                  <el-tooltip
                    content="Select one of the unit times available"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input :error="getError('unitTAvgDemand')">
                      <el-select
                        class="select-primary"
                        placeholder="Unit Time"
                        v-model="inventorySystemDTO.unitTAvgDemand"
                      >
                        <el-option
                          v-for="option in selects.unitTime"
                          class="select-primary"
                          :value="option"
                          :label="option"
                          :key="option"
                        ></el-option>
                      </el-select>
                    </base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Average Demand</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the average demand of the unit time specified for this"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      placeholder="Average Demand"
                      type="number"
                      :error="getError('averageDemand')"
                      v-model="inventorySystemDTO.averageDemand"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Unit Time of the Problem Variables</label>
                <div class="col-8">
                  <el-tooltip
                    content="Select one of the unit times available"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input :error="getError('unitTVariables')">
                      <el-select
                        class="select-primary"
                        placeholder="Unit Time"
                        v-model="inventorySystemDTO.unitTVariables"
                      >
                        <el-option
                          v-for="option in selects.unitTime"
                          class="select-primary"
                          :value="option"
                          :label="option"
                          :key="option"
                        ></el-option>
                      </el-select>
                    </base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Forecast Demand</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the forecast demand taking the unit time specified in problem variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      placeholder="Forecast Demand"
                      type="number"
                      :error="getError('forecastDemand')"
                      v-model="inventorySystemDTO.forecastDemand"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6" v-if="!selects.chooseSystem.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-4 col-form-label">Review Cost</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the review cost with the same currency of every money variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      type="number"
                      placeholder="Review Cost"
                      :error="getError('reviewCost')"
                      v-model="inventorySystemDTO.reviewCost"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6" v-if="!selects.chooseSystem.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-4 col-form-label">Forecasting Errors Demand Standard Dev</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the forecasting errors demand standard deviation taking the unit time specified in problem variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      placeholder="Forecasting Errors Demand Standard Deviation"
                      type="number"
                      :error="getError('standardDevFrcErrorsDemand')"
                      v-model="inventorySystemDTO.standardDevFrcErrorsDemand"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6" v-if="selects.chooseSystem.startsWith('(s,S)')">
              <div class="row">
                <label class="col-4 col-form-label">Effective Inventory</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the effective inventory, remember... on hand - outgoing + incoming."
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      type="number"
                      placeholder="Effective Inventory"
                      :error="getError('effectiveInventory')"
                      v-model="inventorySystemDTO.effectiveInventory"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Order Cost</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the order cost with the same currency of every money variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      type="number"
                      placeholder="Order Cost"
                      :error="getError('orderCost')"
                      v-model="inventorySystemDTO.orderCost"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6" v-if="inventorySystemDTO.unitTAvgDemand == 'Daily'">
              <div class="row">
                <label class="col-4 col-form-label">Business Days</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the business days, this parameter is enabled when your average demand is daily"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      type="number"
                      name="businessDays"
                      v-validate="'required|min_value:0'"
                      placeholder="Business Days"
                      :error="getError('businessDays')"
                      v-model="inventorySystemDTO.businessDays"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Lead Time</label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the lead time taking the unit time specified in problem variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      type="number"
                      placeholder="Lead Time"
                      :error="getError('leadTime')"
                      v-model="inventorySystemDTO.leadTime"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6" v-if="!selects.chooseSystem.startsWith('(R,S)')">
              <div class="row">
                <label class="col-4 col-form-label">
                  Lead Time Standard Dev:
                  <div class="row">
                    <div class="col-6">
                      <el-tooltip
                        content="Active this option if you calculate the lead time SD with the forecasting errors demand SD"
                        effect="light"
                        :open-delay="300"
                        placement="top"
                      >
                        <base-radio name="sdf" class="mb-3" v-model="radio.sDLT">Calculated</base-radio>
                      </el-tooltip>
                    </div>
                    <div class="col-6">
                      <div>
                        <base-radio name="sdl" class="mb-3" v-model="radio.sDLT">Known</base-radio>
                      </div>
                    </div>
                  </div>
                </label>
                <div class="col-8">
                  <el-tooltip
                    content="Fill the lead time standard deviation taking the unit time specified in problem variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      v-if="radio.sDLT=='sdl'"
                      placeholder="Lead Time Standard Deviation"
                      type="number"
                      v-model="inventorySystemDTO.standardDevLeadTime"
                    ></base-input>
                  </el-tooltip>
                  <el-tooltip
                    content="Fill the forecasting errors demand standard deviation taking the unit time specified in problem variables"
                    effect="light"
                    :open-delay="300"
                    placement="top"
                  >
                    <base-input
                      v-if="radio.sDLT=='sdf'"
                      placeholder="Forecasting Errors Demand Standard Dev"
                      type="number"
                      v-model="inventorySystemDTO.standardDevFrcErrorsDemand"
                    ></base-input>
                  </el-tooltip>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">Service Level</label>
                <div class="col-8 text-center">
                  <label>{{inventorySystemDTO.serviceLevel}}%</label>
                  <slider
                    :error="getError('serviceLevel')"
                    v-model="inventorySystemDTO.serviceLevel"
                    type="primary"
                    :options="{step: 0.5}"
                  ></slider>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="row">
                <label class="col-4 col-form-label">
                  Keeping Cost:
                  <div class="row">
                    <div class="col-6">
                      <el-tooltip
                        content="Active this option if you calculate the keeping cost with the unit value and keeping percentage"
                        effect="light"
                        :open-delay="300"
                        placement="top"
                      >
                        <base-radio name="iC" class="mb-3" v-model="radio.kC">Calculated</base-radio>
                      </el-tooltip>
                    </div>
                    <div class="col-6">
                      <div>
                        <base-radio name="H" class="mb-3" v-model="radio.kC">Known</base-radio>
                      </div>
                    </div>
                  </div>
                </label>
                <div class="col-8">
                  <base-input
                    v-if="radio.kC=='H'"
                    placeholder="Keeping Cost"
                    :error="getError('keepingCost')"
                    type="number"
                    v-model="inventorySystemDTO.keepingCost"
                  ></base-input>
                  <base-input
                    v-if="radio.kC=='iC'"
                    placeholder="Unit Cost"
                    type="number"
                    v-model="unitValue"
                  ></base-input>
                  <div class="text-center">
                    <label v-if="radio.kC=='iC'">Keeping Percentage: {{annualKeepingPercentage}}%</label>
                    <label v-else>Disabled</label>
                    <slider
                      :disabled="radio.kC=='H'"
                      v-model="annualKeepingPercentage"
                      type="danger"
                      :options="{step: 0.5}"
                    ></slider>
                  </div>
                  <!-- <base-input type="number" placeholder="Keeping Percentage" :disabled="radio.kC=='H'" v-model="inventorySystemDTO.keepingPercentage"></base-input> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="text-center">
          <base-button style="width: 50%" @click="solve()" type="primary">Solve</base-button>
        </div>
      </card>
      <card v-if="messageSolution != null">
        <h4 slot="header" align="center" v-html="messageSolution"></h4>
      </card>
    </form>
  </div>
</template>
<script>
import { Select, Option } from "element-ui";
import { Modal, BaseAlert } from "src/components";
import { Slider } from "src/components";
import { BaseCheckbox, BaseRadio } from "src/components/index";
import axios from "axios";
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Modal,
    BaseAlert,
    Slider,
    BaseCheckbox,
    BaseRadio
  },
  data() {
    return {
      title: "",
      radio: {
        kC: "H",
        sDLT: "sdl"
      },
      inventorySystemDTO: {
        unitTAvgDemand: null,
        serviceLevel: 98
      },
      messageSolution: null,
      unitValue: null,
      annualKeepingPercentage: 30,
      standardDevFrcErrorsDemand: null,
      modals: {
        notice: false,
        sq: false,
        ss: false,
        rs: false
      },
      model: {
        required: "",
        number: ""
      },
      selects: {
        chooseSystem: null,
        systemType: [
          "(s,Q) Continuous review fixed-order-quantity system",
          "(s,S) Continuous review order-up-to system",
          "(R,S) Periodic review fixed-order interval system"
        ],
        unitTime: ["Annual", "Daily"]
      }
    };
  },
  name: "inventory",
  created() {
    axios
      .get(this.$store.state.backend + "/inventoryManagementModule/toFill")
      .then(response => {
        console.log(response.data);
        this.selects.unitTime = response.data;
      });
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        this.$emit("on-submit", this.registerForm, isValid);
      });
    },
    nextPage() {
      this.$router.push("dashboard");
    },
    solve() {
      var query = this.buildQuery();
      this.callServer(query);
    },
    buildQuery() {
      var problem = this.selects.chooseSystem.split(" ");
      var query = problem[0];
      return query;
    },
    callServer(route) {
      this.errors.clear();
      if (this.radio.kC == "iC")
        this.inventorySystemDTO.keepingCost =
          (this.unitValue * this.annualKeepingPercentage) / 100;
      if (this.radio.sDLT == "sdf")
        this.inventorySystemDTO.standardDevLeadTime =
          this.inventorySystemDTO.standardDevFrcErrorsDemand *
          Math.sqrt(this.inventorySystemDTO.leadTime);
      //console.log(this.inventorySystemDTO);
      axios
        .post(
          this.$store.state.backend +
            "/inventoryManagementModule/solve" +
            route,
          this.inventorySystemDTO
        )
        .then(response => {
          console.log(response.data);
          this.messageSolution = response.data.messageSolution;
        })
        .catch(error => {
          if (!error.response) {
            this.notifyError("bottom", "left", 'Network Error');
        }
          else if (typeof error.response.data == "string")
            this.notifyError("bottom", "left", error.response.data);
          else {
            var list = error.response.data;
            for (let index = 0; index < list.length; index++) {
              this.errors.add({
                field: list[index].field,
                msg: list[index].defaultMessage
              });
            }
          }
        });
    },
    notifyError(verticalAlign, horizontalAlign, message) {
      this.$notify({
        message: "<b>" + message + "</b>",
        timeout: 3000,
        icon: "tim-icons icon-simple-remove",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: "danger"
      });
    }
  }
};
</script>
<style>
#selector {
  min-width: 300px;
  width: 50%;
}
</style>

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
        <el-select
          class="select-primary"
          id="selector"
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
      </card>
    </div>
    <form class="form-horizontal col-lg-12" v-if="selects.chooseSystem!=null">
      <card>
        <h4 slot="header" class="card-title">{{selects.chooseSystem}}</h4>
        <div>
          <div class="row">
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.chooseSystem.startsWith('(s,Q)') || selects.chooseSystem.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Demand Type</label>
                <div class="col-6">
                  <el-select
                    class="select-primary"
                    placeholder="Demand Type"
                    v-model="inventorySystemDTO.demandType"
                  >
                    <el-option
                      v-for="option in selects.demandType"
                      class="select-primary"
                      :value="option"
                      :label="option"
                      :key="option"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.chooseSystem.startsWith('(s,Q)') || selects.chooseSystem.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Demand</label>
                <div class="col-6">
                  <base-input placeholder="Demand" type="number" :error="getError('demand')" v-model="inventorySystemDTO.demand"></base-input>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.chooseSystem.startsWith('(s,Q)') || selects.chooseSystem.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Demand Standard Dev</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Demand SD" v-model="inventorySystemDTO.standardDeviationDemand"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(R,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Review Time</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Review Time" v-model="inventorySystemDTO.reviewTime"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(R,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Available Inventory</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Available Inventory" v-model="inventorySystemDTO.availableInventory"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Order Cost</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Order Cost" v-model="inventorySystemDTO.orderCost"></base-input>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.chooseSystem.startsWith('(s,Q)') || selects.chooseSystem.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Lead Time</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Lead Time" v-model="inventorySystemDTO.leadTime"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Lead Time Standard Dev</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Lead Time SD" v-model="inventorySystemDTO.standardDeviationLeadTime"></base-input>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.chooseSystem.startsWith('(s,Q)') || selects.chooseSystem.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Service Level</label>
                <div class="col-6 text-center">
                  <label>{{inventorySystemDTO.serviceLevel}}%</label>
                  <slider
                    v-model="inventorySystemDTO.serviceLevel"
                    type="primary"
                    :options="{step: 0.5}"
                  ></slider>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Keeping Cost: 
                  <div class="row">
                  <div class="col-6">
                <base-radio name="iC" class="mb-3" v-model="radio.kC">Calculated</base-radio>
                  </div>
                   <div class="col-6">
                     <div>
                <base-radio name="H" class="mb-3" v-model="radio.kC">Known</base-radio>
                     </div>
                </div>
                  </div>
                </label>
                <div class="col-6">
                  <base-input v-if="radio.kC=='H'" placeholder="Keeping Cost" type="number" text="hola" v-model="inventorySystemDTO.keepingCost"></base-input>
                  <base-input v-if="radio.kC=='iC'" placeholder="Unit Cost" type="number" v-model="unitCost"></base-input>
                  <div class="text-center">
                  <label v-if="radio.kC=='iC'">Keeping Percentage: {{keepingPercentage}}%</label>
                  <label v-else>Disabled</label>
                  <slider
                  :disabled="radio.kC=='H'"
                    v-model="keepingPercentage"
                    type="danger"
                    :options="{step: 0.5}"
                  ></slider>
                </div>
                  <!-- <base-input type="number" placeholder="Keeping Percentage" :disabled="radio.kC=='H'" v-model="inventorySystemDTO.keepingPercentage"></base-input> -->
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Business Days</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Business Days" v-model="inventorySystemDTO.businessDays"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(s,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Inventory Max Level</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Inventory Max Lvl" v-model="inventorySystemDTO.maxLevelInventory"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.chooseSystem.startsWith('(s,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Inventory Min Level</label>
                <div class="col-6">
                  <base-input type="number" placeholder="Inventory Min Lvl" v-model="inventorySystemDTO.minLevelInventory"></base-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="text-center">
          <base-button @click="solve()" type="primary">Solve</base-button>
        </div>
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
        kC: "H"
      },
      inventorySystemDTO: {
        demand: null,
        orderCost: null,
        keepingCost: null,
        serviceLevel: 98,
        standardDeviationDemand: null,
        standardDeviationLeadTime: null,
        businessDays: null,
        leadTime: null,
        maxLevelInventory: null,
        minLevelInventory: null,
        reviewTime: null,
        availableInventory: null,
        demandType: null
      },
      invSolution: {
        quantity: -1,
        safetyStock: -1,
        reorderPoint: -1
      },
        unitCost: null,
        keepingPercentage: 30,
      modals: {
        notice: false
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
          "(R,S) Periodic review fixed-order interval system",
          "(R,s,S) Periodic review optional replenishment system"
        ],
        demandType: ["Annual"]
      }
    };
  },
  name: "inventory",
  created() {
    axios
      .get(this.$store.state.backend + "/inventoryManagementModule/toFill")
      .then(response => {
        console.log(response.data);
        this.selects.demandType = response.data;
      });
  },
  methods: {
    getError (fieldName) {
      return this.errors.first(fieldName)
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
      if(this.radio.kC == 'iC')
      this.inventorySystemDTO.keepingCost = this.unitCost * this.keepingPercentage/100;
      axios
        .post(
          this.$store.state.backend +
            "/inventoryManagementModule/solve" +
            route,
          this.inventorySystemDTO
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response);
          if (typeof error.response.data == "string")
            this.notifyError("bottom", "left", error.response.data);
          else{
            var list = error.response.data;
            for (let index = 0; index < list.length; index++) {
             this.errors.add({field: list[index].field, msg: list[index].defaultMessage});
            }
            
          }
          // this.notifyError("bottom", "left", error.response.data.message);
        });
    },
    notifyError(verticalAlign, horizontalAlign, message) {
      let color = "success";
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
  width: 450px;
}
</style>

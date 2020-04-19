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
          placeholder="System Type"
          v-model="selects.simple"
        >
          <el-option
            v-for="option in selects.systemType"
            class="select-succes"
            :value="option.value"
            :label="option.label"
            :key="option.label"
          ></el-option>
        </el-select>
      </card>
    </div>
    <form class="form-horizontal col-lg-12" v-if="!selects.simple.startsWith('Choose')">
      <card>
        <h4 slot="header" class="card-title">{{selects.simple}}</h4>
        <div>
          <div class="row">
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Annual Demand</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.annualDemand"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(R,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Daily Demand</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.dailyDemand"></base-input>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.simple.startsWith('(s,Q)') || selects.simple.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-form-label">Standard Dev Daily Demand</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.standardDeviationDailyDemand"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(R,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Review Time</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.reviewTime"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(R,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Available Inventory</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.availableInventory"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Order Costs</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.orderCost"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Keeping Costs</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.keepingCost"></base-input>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.simple.startsWith('(s,Q)') || selects.simple.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Lead Time</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.leadTime"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Standard Dev Lead Time</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.standardDeviationLeadTime"></base-input>
                </div>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-4"
              v-if="selects.simple.startsWith('(s,Q)') || selects.simple.startsWith('(R,S)')"
            >
              <div class="row">
                <label class="col-6 col-form-label">Service Level</label>
                <div class="col-7 text-center">
                  <label>{{invParams.serviceLevel}}%</label>
                  <slider v-model="invParams.serviceLevel" type="primary" :options="{step: 0.5}"></slider>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,Q)')">
              <div class="row">
                <label class="col-6 col-form-label">Business Days</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.businessDays"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Max Level Inventory</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.maxLevelInventory"></base-input>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4" v-if="selects.simple.startsWith('(s,S)')">
              <div class="row">
                <label class="col-6 col-form-label">Min Level Inventory</label>
                <div class="col-7">
                  <base-input type="number" v-model="invParams.minLevelInventory"></base-input>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import axios from "axios";
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Modal,
    BaseAlert,
    Slider
  },
  data() {
    return {
      title: "",
      invParams: {
        annualDemand: null,
        dailyDemand: null,
        orderCost: null,
        keepingCost: null,
        serviceLevel: 98,
        standardDeviationDailyDemand: null,
        standardDeviationLeadTime: null,
        businessDays: null,
        leadTime: null,
        maxLevelInventory: null,
        minLevelInventory: null,
        reviewTime: null,
        availableInventory: null
      },
      invSolution: {
        quantity: -1,
        safetyStock: -1,
        reorderPoint: -1
      },
      modals: {
        notice: false
      },
      model: {
        required: "",
        number: ""
      },
      selects: {
        simple: "Choose the system type",
        systemType: [
          {
            value: "(s,Q) Continuous review fixed-order-quantity system",
            label: "(s,Q) Continuous review fixed-order-quantity system"
          },
          {
            value: "(s,S) Continuous review order-up-to system",
            label: "(s,S) Continuous review order-up-to system"
          },
          {
            value: "(R,S) Periodic review fixed-order interval system",
            label: "(R,S) Periodic review fixed-order interval system"
          },
          {
            value: "(R,s,S) Periodic review optional replenishment system",
            label: "(R,s,S) Periodic review optional replenishment system"
          }
        ]
      }
    };
  },

  name: "inventory",
  methods: {
    nextPage() {
      this.$router.push("dashboard");
    },
    solve() {
      var query = this.buildQuery();
      this.callServer(query);
    },
    buildQuery() {
      var problem = this.selects.simple.split(" ");
      var query = problem[0] + "/?system=" + problem[0];
      if (
        this.invParams.annualDemand != null &&
        this.invParams.annualDemand != ""
      )
        query += "&annualDemand=" + this.invParams.annualDemand;
      if (
        this.invParams.dailyDemand != null &&
        this.invParams.dailyDemand != ""
      )
        query += "&dailyDemand=" + this.invParams.dailyDemand;
      if (this.invParams.orderCost != null && this.invParams.orderCost != "")
        query += "&orderCost=" + this.invParams.orderCost;
      if (
        this.invParams.keepingCost != null &&
        this.invParams.keepingCost != ""
      )
        query += "&keepingCost=" + this.invParams.keepingCost;
      if (
        this.invParams.serviceLevel != null &&
        this.invParams.serviceLevel != ""
      )
        query += "&serviceLevel=" + this.invParams.serviceLevel / 100;
      if (
        this.invParams.standardDeviationDailyDemand != null &&
        this.invParams.standardDeviationDailyDemand != ""
      )
        query +=
          "&standardDeviationDailyDemand=" +
          this.invParams.standardDeviationDailyDemand;
      if (
        this.invParams.standardDeviationLeadTime != null &&
        this.invParams.standardDeviationLeadTime != ""
      )
        query +=
          "&standardDeviationLeadTime=" +
          this.invParams.standardDeviationLeadTime;
      if (
        this.invParams.businessDays != null &&
        this.invParams.businessDays != ""
      )
        query += "&businessDays=" + this.invParams.businessDays;
      if (this.invParams.leadTime != null && this.invParams.leadTime != "")
        query += "&leadTime=" + this.invParams.leadTime;
      if (
        this.invParams.maxLevelInventory != null &&
        this.invParams.maxLevelInventory != ""
      )
        query += "&maxLevelInventory=" + this.invParams.maxLevelInventory;
      if (
        this.invParams.minLevelInventory != null &&
        this.invParams.minLevelInventory != ""
      )
        query += "&minLevelInventory=" + this.invParams.minLevelInventory;
      if (this.invParams.reviewTime != null && this.invParams.reviewTime != "")
        query += "&reviewTime=" + this.invParams.reviewTime;
      if (
        this.invParams.availableInventory != null &&
        this.invParams.availableInventory != ""
      )
        query += "&availableInventory=" + this.invParams.availableInventory;
      return query;
    },
    callServer(route) {
      axios
        .get(
          //"https://alien-backend-v2.herokuapp.com/api/inventoryManagementModule/solve" + route
          "http://localhost:8080/api/inventoryManagementModule/solve" + route
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
          console.log(error.response);
          if(typeof error.response.data == 'string')
          this.notifyError("bottom", "left", error.response.data);
          else
          this.notifyError("bottom", "left", error.response.data.message);
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
  width: 500px;
}
</style>

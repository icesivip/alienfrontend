<template>
  <div id="mrp">
    <table class="table-responsive table text-light">
      <thead>
        <tr>
          <th :colspan="11" scope="col" id="MRPtableHeader" class="text-center">MRP</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="col">Id</td>
          <td scope="col">Product Name</td>
          <td scope="col">Available Inventory</td>
          <td scope="col">Security Inventory</td>
          <td scope="col">Parent Product Id</td>
          <td scope="col">Amount to Manufacture Parent</td>
          <td scope="col">Lead time</td>
          <td scope="col">Cost of the article</td>
          <td scope="col">Maintenance cost</td>
          <td scope="col">Ordering cost</td>
          <td scope="col">Lot sizing rule</td>
        </tr>
        <tr :key="'prod' + i" v-for="(product, i) in products">
          <td><base-input class="user-input" type='text' v-model="products[i].itemCode"></base-input></td>
          <td><base-input class="user-input" type='text' v-model="products[i].itemName"></base-input></td>
          <td><base-input class="user-input" type='number' min='0' v-model="products[i].initialInventory"></base-input></td>
          <td><base-input class="user-input" type='number' min='0' v-model="products[i].securityStock"></base-input></td>
          <td><base-input class="user-input" type='text' v-model="products[i].parentProductId"></base-input></td>
          <td><base-input class="user-input" type='number' min='0' v-model="products[i].amountOfParent"></base-input></td>
          <td><base-input class="user-input" type='number' min='0' v-model="products[i].leadTime"></base-input></td>
          <td><base-input class="user-input" type='text' v-model="products[i].costOfTheArticle"></base-input></td>
          <td><base-input class="user-input" type='text' v-model="products[i].maintenanceCost"></base-input></td>
          <td><base-input class="user-input" type='text' v-model="products[i].orderingCost"></base-input></td>
          <td class="col-md-2 pt-0">
            <el-select
              v-validate="'required'"
              name="lotSizingRule"
              class="col-sm-12 pt-1 select-danger"
              placeholder="Lot Sizing Rule"
              v-model="products[i].lotSizingRule"
            >
              <el-option
                v-for="(lotSizingRule,i) in lotSizingRules"
                class="select-danger"
                :value="lotSizingRule"
                :label="lotSizingRule"
                :key="'lsr'+i"
              ></el-option>
            </el-select>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mb-4 flex-nowrap">
      <el-select
        v-validate="'required'"
        name="periodicity"
        class="col-sm-3 select-danger"
        placeholder="Periodicity"
        v-model="periodicity"
      >
        <el-option
          v-for="(period,i) in periods"
          class="select-danger"
          :value="period"
          :label="period"
          :key="'per'+i"
        ></el-option>
      </el-select>
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-5 btn btn-primary expand" type="button" v-on:click="addConstraint" value="Add product"><div class="col-sm-1"></div>
      <input class="col-sm-5 btn btn-primary expand" type="button" v-on:click="removeConstraint" value="Remove product">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-primary expand" type="submit" v-on:click="createMrp" value="Create MRP">
    </div>
    <div class="input-group-append mb-2 flex-nowrap justify-content-center">
      <input class="col-sm-11 btn btn-primary expand" type="button" v-on:click="paintTree" value="Show product tree">
    </div>
    <div id="viewTree"></div>
    <div class="row">
      <div class="col-sm-3">
        <label class="col-form-label">Enter here the number of periods for the MPS table</label>
      </div>
      <div class="col-sm-5 mb-0">
        <input class="form-control" min="1" v-model="newNumberOfPeriods">
      </div>
      <div class="col-sm-3">
        <button class="btn btn-primary" v-on:click="createTable">Create table</button>
      </div>
    </div>
    <div>
      <table v-if="tableIsCreated" class='table-responsive table text-light'>
        <thead>
          <tr>
            <th :colspan="numberOfPeriods+2" scope='col' id='MPStableHeader' class='text-center'>MPS</th>
          </tr>
        </thead>
        <tbody :key="'mrp' + j" v-for="(mrp, j) in products">
          <tr>
            <th scope='col'>Period</th>
            <th scope='col' class='text-center' :key="'hp'+period" v-for="period in headerPeriods">{{ period }}</th>
          </tr>
          <tr v-if="j == 0">
            <td scope='row'>Gross Requeriments</td>
            <td :key="'gr'+ j + '-' + i" v-for="(grossReq, i) in products[j].grossRequirements">
              <input class="form-control" min='0' v-model="products[j].grossRequirements[i]">
            </td>
          </tr>
          <tr v-else>
            <td scope='row'>Gross Requeriments</td>
            <td :key="'gr'+ j + '-' + i" v-for="(grossReq, i) in products[j].grossRequirements">
              {{grossReq}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Scheduled Receptions</td>
            <td :key="'sr'+ j + '-' + i" v-for="(schedReq, i) in products[j].scheduledRequirements">
              <input class="form-control" min='0' v-model="products[j].scheduledRequirements[i]">
            </td>
          </tr>
          <tr>
            <td scope='row'>Available Inventory Programmed</td>
            <td :key="'aip'+ j + '-' + i" v-for="(avaInvPro, i) in products[j].availInventProgrammed" >
              {{avaInvPro}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Net requirements</td>
            <td :key="'aip'+ j + '-' + i" v-for="(netReq, i) in products[j].netRequirements">
              {{netReq}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Receptions of planned orders</td>
            <td :key="'rcpo'+ j + '-' + i" v-for="(recepPlOrd, i) in products[j].receptionPlannedOrders">
              {{recepPlOrd}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Release of planned orders</td>
            <td :key="'rlpo'+ j + '-' + i" v-for="(relePlOrd, i) in products[j].releasePlannedOrders">
              {{relePlOrd}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import { Network } from "vis"
import MRPRepository from './../../../repositories/Modules/MasterPlanSchedule/MaterialRequirementsPlanning';

export default {
  name: "mrp",
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      periods: ['Annual', 'Monthly', 'Weekly', 'Daily'],
      lotSizingRules: ['Lot for Lot', 'Economic Order Quantity', 'Periods Of Supply', 'Least Unit Cost', 'Least Total Cost'],
      
      //TO-DO - not important right now
      //Add mrp to product object instead of keeping it as another one.

      allProductsIds: ['none'],
      products: [{
        itemCode: '',
        itemName: '',
        leadTime: 1,
        securityStock: '',
        initialInventory: 0,
        costOfTheArticle: 0,
        maintenanceCost: 0,
        orderingCost: 0,
        lotSizingRule: '',
        parentProductId: 'none',
        amountOfParent: 1,
        grossRequirements: [],
        scheduledRequirements: [],
        availInventProgrammed: [],
        netRequirements: [],
        receptionPlannedOrders: [],
        releasePlannedOrders: []
      }],

      periodicity: '',

      tableIsCreated: false,
      newNumberOfPeriods: 1,
      numberOfPeriods: 0,

      headerPeriods: [],
    };
  },
  methods: {
    addConstraint(){
      var newProduct = {
        itemCode: '',
        itemName: '',
        leadTime: 1,
        securityStock: '',
        initialInventory: 0,
        costOfTheArticle: 0,
        maintenanceCost: 0,
        orderingCost: 0,
        lotSizingRule: '',
        parentProductId: 'none',
        amountOfParent: 1,
        grossRequirements: [],
        scheduledRequirements: [],
        availInventProgrammed: [],
        netRequirements: [],
        receptionPlannedOrders: [],
        releasePlannedOrders: []
      };
      for(var i = 0; i < this.numberOfPeriods; i++){
        newProduct.grossRequirements[i] = 0;
        newProduct.scheduledRequirements[i] = 0;
        newProduct.availInventProgrammed[i] = 0;
        newProduct.netRequirements[i] = 0;
        newProduct.receptionPlannedOrders[i] = 0;
        newProduct.releasePlannedOrders[i] = 0;
      }
      this.products.push(newProduct)
    },
    removeConstraint(){
      this.products.pop()
    },
    cleanUpData(){
      for(let i = 0; i < this.products.length; i++){
        var parent = false;
        if(this.products[i].parentProductId !== 'none'){
          parent = true;
        }
        for(let j = 0; j < this.products[i].grossRequirements.length; j++){
          if(parent){
            this.products[i].grossRequirements[j] = 0;
          }
          this.products[i].availInventProgrammed[j] = 0;
          this.products[i].netRequirements[j] = 0;
          this.products[i].receptionPlannedOrders[j] = 0;
          this.products[i].releasePlannedOrders[j] = 0;
        }
      }
    },
    createMrp(){
      this.cleanUpData();
      var MrpData = {
        periodicity: this.periodicity,
        products: this.products
      }
      MRPRepository.createMRP(MrpData).then((response) => {
        if(response.status < 400){
          this.products = response.data;
        }
      });
    },
    paintTree(){
      let nodes = [];
      let edges = [];
      let nodesNames = [];
      let nodesIds = [];
      for(let i = 0; i < this.products.length; i++){
        nodesNames.push(this.products[i].itemName);
        nodesIds.push(this.products[i].itemCode);
      }
      for(let i = 0; i < this.products.length; i++){
        nodes.push({id: i, label: nodesNames[i] + ' (' + this.products[i].amountOfParent + ')', 
          font: {size:12, strokeWidth: 1, strokeColor: 'silver'}});
        if(this.products[i].parentProductId !== 'none'){
          edges.push({from: nodesIds.indexOf(this.products[i].parentProductId), to:i, width: 2, length: 350});
        }
      }
      var container = document.getElementById("viewTree");
			var dataTree = {
				nodes: nodes,
				edges: edges
			};
			var options = {
				nodes: {
					size: 40
				}
			};
			var paintTree = new Network(container, dataTree, options);
    },
    createTable(){
      if(!this.tableIsCreated){
        this.tableIsCreated = true;
      }
      if(this.numberOfPeriods < this.newNumberOfPeriods){
        for (let i = this.numberOfPeriods; i < this.newNumberOfPeriods; i++) {
          this.headerPeriods[i] = parseInt(i)+1;
          for(let j = 0; j < this.products.length; j++){
            this.products[j].grossRequirements[i] = 0;
            this.products[j].scheduledRequirements[i] = 0;
            this.products[j].availInventProgrammed[i] = 0;
            this.products[j].netRequirements[i] = 0;
            this.products[j].receptionPlannedOrders[i] = 0;
            this.products[j].releasePlannedOrders[i] = 0;
          }
        }
      }else if(this.numberOfPeriods > this.newNumberOfPeriods){
        for (let i = this.newNumberOfPeriods; i < this.numberOfPeriods; i++) {
          this.headerPeriods.pop();
          for(let j = 0; j < this.products.length; j++){
            this.products[j].grossRequirements.pop();
            this.products[j].scheduledRequirements.pop();
            this.products[j].availInventProgrammed.pop();
            this.products[j].netRequirements.pop();
            this.products[j].receptionPlannedOrders.pop();
            this.products[j].releasePlannedOrders.pop();
          }
        }
      }
      this.numberOfPeriods = this.newNumberOfPeriods;
    },
  }
};
</script>

<style>
</style>
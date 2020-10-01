<template>
  <div id="mps">
    <div class="row mb-2">
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
          <tr>
            <th scope='col'>Period</th>
            <th scope='col' class='text-center' :key="'hp'+period" v-for="period in headerPeriods">{{ period }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope='row'>Gross Requeriments</td>
            <td :key="'gr' + i" v-for="(grossReq, i) in product.grossRequirements">
              <input class="form-control" min='0' v-model="product.grossRequirements[i]">
            </td>
          </tr>
          <tr>
            <td scope='row'>Scheduled Receptions</td>
            <td :key="'sr' + i" v-for="(schedReq, i) in product.scheduledRequirements">
              <input class="form-control" min='0' v-model="product.scheduledRequirements[i]">
            </td>
          </tr>
          <tr>
            <td scope='row'>Available Inventory Programmed</td>
            <td :key="'aip' + i" v-for="(avaInvPro, i) in product.availInventProgrammed">
              {{avaInvPro}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Net requirements</td>
            <td :key="'aip' + i" v-for="(netReq, i) in product.netRequirements">
              {{netReq}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Receptions of planned orders</td>
            <td :key="'rcpo' + i" v-for="(recepPlOrd, i) in product.receptionPlannedOrders">
              {{recepPlOrd}}
            </td>
          </tr>
          <tr>
            <td scope='row'>Release of planned orders</td>
            <td :key="'rlpo' + i" v-for="(relePlOrd, i) in product.releasePlannedOrders">
              {{relePlOrd}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row m-1">
      <label class="col-form-label col-sm-1" for="itemName">Item Name: </label>
      <input class="form-control col-sm-2" type="text" name="itemName" v-model="product.itemName">
      <label class="col-form-label col-sm-1" for="levelCode">Level Code: </label> 
      <input class="form-control col-sm-2" type="text" name="levelCode" v-model="product.itemCode">
      <label class="col-form-label col-sm-1" for="leadTime">Lead Time: </label> 
      <input class="form-control col-sm-2" min="0" name="leadTime" v-model="product.leadTime">
      <label class="col-form-label col-sm-1" for="securityStock">Security Stock: </label>
      <input class="form-control col-sm-2" min="0" name="securityStock" v-model="product.securityStock">
    </div>
    <div class="row m-1">
      <label class="col-form-control col-sm-1" for="initialInventory">Initial Inventory: </label>
      <input class="form-control col-sm-2" min="0" name="initialInventory" v-model="product.initialInventory">
      <label class="col-form-control col-sm-1" for="costArticle">Cost of the article: </label> 
      <input class="form-control col-sm-2" type="text" name="costArticle" v-model="product.costOfTheArticle">
      <label class="col-form-control col-sm-1" for="maintenanceCost">Maintenance Cost: </label>
      <input class="form-control col-sm-2" type="text" name="maintenanceCost" v-model="product.maintenanceCost">
      <label class="col-form-control col-sm-1" for="orderingCost">Ordering Cost: </label>
      <input class="form-control col-sm-2" type="text" name="orderingCost" v-model="product.orderingCost">
    </div>
    <div class="row m-1">
      <label class="col-form-control col-sm-1" for="TPeriodOFSupply">(T) Periods of Supply: </label>
      <input class="form-control col-sm-2" min="0" name="TPeriodOFSupply" v-model="product.periodsOfSupply">
      <el-select
        v-validate="'required'"
        name="periodicity"
        class="col-sm-3 select-danger"
        placeholder="Periodicity"
        v-model="product.periodicity"
      >
        <el-option
          v-for="(periodOption,i) in periodicityOptions"
          class="select-danger"
          :value="periodOption"
          :label="periodOption"
          :key="'per'+i"
        ></el-option>
      </el-select>
      <el-select
        v-validate="'required'"
        name="lotSizingRule"
        class="col-sm-3 select-danger"
        placeholder="Lot Sizing Rule"
        v-model="product.lotSizingRule"
      >
        <el-option
          v-for="(lotSizingOption,i) in lotSizingRulesOptions"
          class="select-danger"
          :value="lotSizingOption"
          :label="lotSizingOption"
          :key="'lsr'+i"
        ></el-option>
      </el-select>
    </div>
    <div class="row m-1">
      <div class="col">
        <input type="button" class="ml-5 btn btn-primary expand" value="Calculate MPS" v-on:click="solveModel">
      </div>
      <div class="col">
        <input type="button" class="ml-5 btn btn-primary expand" value="Calculate all" v-on:click="solveAllModels">
      </div>
      <div class="col">
        <input type="button" class="ml-5 btn btn-primary expand" value="Compare results" v-on:click="compareResults">
      </div>
    </div>
  </div>
</template>

<script>
import { Select, Option } from "element-ui";
import MPSRepository from './../../../repositories/Modules/MasterPlanSchedule/MasterProductionSchedule';

export default {
  name: 'mps',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data(){
    return {
      periodicityOptions: [
        'Annual', 'Monthly', 'Weekly', 'Daily'
      ],
      lotSizingRulesOptions: [
        'Lot for Lot', 'Economic Order Quantity', 'Periods Of Suply', 'Period Order Quantity', 
        'Least Unit Cost', 'Least Total Cost'
      ],

      tableIsCreated: false,

      product: {
        itemName: '',
        itemCode: '',
        leadTime: 1,
        securityStock: 0,
        initialInventory: 0,
        costOfTheArticle: 0,
        maintenanceCost: 0,
        orderingCost: 0,
        lotSizingRule: '',
        periodsOfSupply: 0,
        periodicity: '',
        grossRequirements: [],
        scheduledRequirements: [],
        availInventProgrammed: [],
        netRequirements: [],
        receptionPlannedOrders: [],
        releasePlannedOrders: []
      },

      headerPeriods: [], 

      numberOfPeriods: 0,
      newNumberOfPeriods: 1,
    };
  },
  methods:{
    createTable(){
      if(!this.tableIsCreated){
        this.tableIsCreated = true;
      }
      if(this.numberOfPeriods < this.newNumberOfPeriods){
        for (let i = this.numberOfPeriods; i < this.newNumberOfPeriods; i++) {
          this.headerPeriods[i] = parseInt(i)+1;
          this.product.grossRequirements[i] = 0;
          this.product.scheduledRequirements[i] = 0;
          this.product.availInventProgrammed[i] = 0;
          this.product.netRequirements[i] = 0;
          this.product.receptionPlannedOrders[i] = 0;
          this.product.releasePlannedOrders[i] = 0;
        }
      }else if(this.numberOfPeriods > this.newNumberOfPeriods){
        for (let i = this.newNumberOfPeriods; i < this.numberOfPeriods; i++) {
          this.product.headerPeriods.pop();
          this.product.grossRequirements.pop();
          this.product.scheduledRequirements.pop();
          this.product.availInventProgrammed.pop();
          this.product.netRequirements.pop();
          this.product.receptionPlannedOrders.pop();
          this.product.releasePlannedOrders.pop();
        }
      }
      this.numberOfPeriods = this.newNumberOfPeriods;
    },
    solveModel(){
      var MPSData = this.product;
      MPSRepository.solveModelWithOneRule(MPSData).then((response) => {
          if(response.status < 400){
            this.product = response.data;
          }
        }
      );
    },
    solveAllModels(){

    },
    compareResults(){

    }
  }
}
</script>

<style>

</style>

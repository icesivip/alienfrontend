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
      <h5 slot="header" class="title title-up">About Simplex</h5>
      <div class="instruction">
        <div class="row">
          <strong><i class="tim-icons icon-book-bookmark text-primary"></i>What is it?</strong>
          <p class="description">
            Inventory management is a component of supply chain management that involves supervising inventory, and stock items. 
            The inventory control systems, by applying methods and precedures, helps business owners to know when it is time to 
            restock products or buy more material to make them.
          </p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong><i class="tim-icons icon-notes text-info"></i>When to use it?</strong>
          <p
            class="description"
          >Inventory control systems are used to determine the quantity and the moment to order or produce an specific item. 
          The system you choose depends on the type of review used and the way orders are made.</p>
        </div>
      </div>
      <div class="instruction">
        <div class="row">
          <strong><i class="tim-icons icon-paper text-success"></i>Instructions</strong>
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
                <base-input
                  name="required"
                  v-validate="modelValidations.required"
                  v-model="model.required"
                  :error="getError('required')"
                ></base-input>
              </div>
            </div>
          </div>
         
        </card>
      </form>
    </div>
     <div class="col-lg-12" align="center">
         <card>
             <h2 class="card-title">
                 Type of System
             </h2>

               <el-select class="select-succes"
               id ="selector"
             placeholder="Single Select"
             v-model="selects.simple">
    <el-option v-for="option in selects.systemType"
               class="select-succes"
               :value="option.value"
               :label="option.label"
               :key="option.label">
    </el-option>
  </el-select>
         </card>
</div>
<form class="form-horizontal">
    <card>
      <h4 slot="header" class="card-title">{{selects.simple}}</h4>
      <div>
        <div class="row">
          <div class="col-sm-6 col-lg-3">
          <div class="row">
            <label class="col-7 col-form-label">Annual Demand</label>
            <div class="col-5">
            <base-input
              name="minLength"
              v-validate="modelValidations.minLength"
              v-model="model.minLength"
              :error="getError('minLength')"
            >
            </base-input>
          </div>
          </div>
          </div>
          <div class="col-sm-6 col-lg-3">
          <div class="row">
          <label class="col-7 col-form-label">Order Costs</label>
            <div class="col-5">
            <base-input
              name="maxLength"
              v-validate="modelValidations.maxLength"
              v-model="model.maxLength"
              :error="getError('maxLength')"
            >
            </base-input>
          </div>
          </div>
          </div>
          <div class="col-sm-6 col-lg-3">
          <div class="row">
          <label class="col-7 col-form-label">Keeping Costs</label>
            <div class="col-5">
            <base-input
              name="range"
              v-validate="modelValidations.range"
              v-model="model.range"
              :error="getError('range')"
            >
            </base-input>
          </div>
          </div>
          </div>
          <div class="col-sm-6 col-lg-3">
          <div class="row">
          <label class="col-7 col-form-label">Lead Time</label>
            <div class="col-5">
            <base-input
              name="minValue"
              v-validate="modelValidations.minValue"
              v-model="model.minValue"
              :error="getError('minValue')"
            >
            </base-input>
          </div>
          </div>
        </div>
          <div class="col-sm-6 col-lg-3">
        <div class="row">
          <label class="col-7 col-form-label">Service Level</label>
            <div class="col-5">
            <base-input
              name="maxValue"
              v-validate="modelValidations.maxValue"
              v-model="model.maxValue"
              :error="getError('maxValue')"
            >
            </base-input>
          </div>
        </div>
          </div>
          <div class="col-sm-6 col-lg-3">
        <div class="row">
          <label class="col-7 col-form-label">Standard Dev Daily Demand</label>
            <div class="col-5">
            <base-input
              name="maxValue"
              v-validate="modelValidations.maxValue"
              v-model="model.maxValue"
              :error="getError('maxValue')"
            >
            </base-input>
          </div>
        </div>
          </div>
          <div class="col-sm-6 col-lg-3">
        <div class="row">
          <label class="col-7 col-form-label">Standard Dev Lead Time</label>
            <div class="col-5">
            <base-input
              name="maxValue"
              v-validate="modelValidations.maxValue"
              v-model="model.maxValue"
              :error="getError('maxValue')"
            >
            </base-input>
          </div>
        </div>
          </div>
          <div class="col-sm-6 col-lg-3">
        <div class="row">
          <label class="col-7 col-form-label">Business Days</label>
            <div class="col-5">
            <base-input
              name="maxValue"
              v-validate="modelValidations.maxValue"
              v-model="model.maxValue"
              :error="getError('maxValue')"
            >
            </base-input>
          </div>
        </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <base-button
          native-type="submit"
          @click.native.prevent="validate"
          type="primary"
          >Validate inputs</base-button
        >
      </div>
    </card>
  </form>
  </div>

</template>
<script>
import {Select, Option} from 'element-ui'
import { Modal, BaseAlert } from "src/components";
export default { 
    components: {
    [Select.name]: Select,
    [Option.name]: Option,
    Modal, 
    BaseAlert
  },
    data (){

        return {
          modals: {
        notice: false
      },
            model: {
        required: "",
        number: ""
      },
      modelValidations: {
        required: {
          required: true
        }
      }, selects: {
            simple: 'Choose the system type',
            systemType: [{value: '(s,Q) Continuous review fixed-order-quantity system', label: '(s,Q) Continuous review fixed-order-quantity system'},
              {value: '(s,S) Continuous review order-up-to system', label: '(s,S) Continuous review order-up-to system'},
              {value: '(R,S) Periodic review fixed-order interval system', label: '(R,S) Periodic review fixed-order interval system'},
              {value: '(R,s,S) Periodic review optional replenishment system', label: '(R,s,S) Periodic review optional replenishment system'}
              ]
          }
      }
},


    name: "inventory",
    methods: {
    nextPage() {
      this.$router.push("dashboard");
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        this.$emit("on-submit", this.registerForm, isValid);
      });
    }
    }
} 

</script>
<style>
 #selector{
   width: 500px;
 }
</style>

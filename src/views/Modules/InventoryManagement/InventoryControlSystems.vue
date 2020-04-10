<template>
  <div>
    <div class="col-12" align="center">
      <h1>Inventory Control Systems</h1>
    </div>
    <!-- Small charts -->
    <div class="row">
      <div class="col-lg-4">
        <card>
          <template slot="header">
            <h3 class="card-title">
              <i class="tim-icons icon-book-bookmark text-primary"></i> What is it?
            </h3>
          </template>
          <div style="height: 80px">
            <h5
              align="justify"
            >Inventory management is a component of supply chain management that involves supervising inventory, and stock items. The inventory control systems, by applying methods and precedures, helps business owners to know when it is time to restock products or buy more material to make them. </h5>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <template slot="header">
            <h3 class="card-title">
              <i class="tim-icons icon-notes text-info"></i> When to use it?
            </h3>
          </template>
          <div style="height: 80px">
            <h5
              align="justify"
            >Inventory control systems are used to determine the quantity and the moment to order or produce an specific item. The system you choose depends on the type of review used and the way orders are made.</h5>
          </div>
        </card>
      </div>
      <div class="col-lg-4">
        <card>
          <template slot="header">
            <h3 class="card-title">
              <i class="tim-icons icon-paper text-success"></i> Instructions
            </h3>
          </template>
          <div style="height: 80px">
            <h5
              align="justify"
            >After you choose the type of system to control the inventory, you will need to fill the information required. The program gives the outputs associated to the system selected.   </h5>
          </div>
        </card>
      </div>
    </div>
    <br />
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

            <div class="row">
            
             
            </div>
          </div>
         
        </card>
      </form>
    </div>
    <div class="col-lg-12">
      

     </div>
     <div class="col-lg-12" align="center">
         <card>
             <h2 class="card-title">
                 Type of System
             </h2>

               <el-select class="select-succes"
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
  </div>

</template>
<script>
import {Select, Option} from 'element-ui'
export default { 
    components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
    data (){

        return {
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
<style></style>

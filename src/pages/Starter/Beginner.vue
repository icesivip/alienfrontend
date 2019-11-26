<template>
  <div class="row" >
    <div class="col-12" align="center">
      <h1>
        Simplex Method
        <h2>Solver</h2>
      </h1>
    </div>
    <div class="col-sm-3" align="left">
      
    </div>
    <br />
    <br />
    <div>
 <div class="col-md-14" align="center" >
      <form  >
        <card>
          <div>
            <div class="row">
              <label class="col-sm-2 col-form-label">Problem Title</label>
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
              <label class="col-sm-2 col-form-label">Number of Variables</label>
              <div class="col-sm-3">
                <base-input
                  name="number"
                  v-validate="modelValidations.number"
                  v-model="model.number"
                  :error="getError('number')"
                ></base-input>
              </div>
              <label class="col-sm-2 col-form-label">Number of Constraints</label>
              <div class="col-sm-3">
                <base-input
                  name="number2"
                  v-validate="modelValidations.number"
                  v-model="model.number2"
                  :error="getError('number2')"
                ></base-input>
              </div>
            </div>
          </div>
          <div class="text-center">
            <base-button native-type="submit" @click.native.prevent="validate" type="warning">Go!</base-button>
          </div>
        </card>
      </form>
 </div>
    </div>
    <div class="col-12" align="center">
      <h3>Objective Function</h3>
    </div>
      <Table></Table>
    <div class="col-12" align="center">
      <h3>Constraint Table</h3>
    </div>
    <hr />

    
  </div>
</template>
<script>
import Table from 'src/pages/Tables/Table.vue'

 
export default {
  name: "starter-page",
  data() {
    return {
      model: {
        required: "",
        number: ""
      },
      modelValidations: {
        required: {
          required: true
        },

        number: {
          numeric: true
        }
      }
    };
  },components: {
    Table: Table
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      this.$validator.validateAll().then(isValid => {
        this.$emit("on-submit", this.registerForm, isValid);
      });
    }
  }
};
</script>
<style></style>

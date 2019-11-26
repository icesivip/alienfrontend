<template>
  <div class="row">
    <div class="col-12" align="center">
      <h1>Simplex Method</h1>
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
            >It is an analytic method for solving problems of linear programming using algebraic operations. This method provides a strategy for evaluating the feasible results finding the optimal value of the objective function.</h5>
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
            >This method can be applied for problems of linear programming that use two or more variables.</h5>
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
            >For using the program you will need an objective function and the respective constraints. As a result, the program is going to show the type and value of the optimal solution (if there is one) and the values of the basic and non basic variables.</h5>
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
              <label class="col-sm-2 col-form-label" style="font-size: 1.00rem">Number of Variables</label>
              <div class="col-sm-3">
                <base-input
                  name="number"
                  v-validate="modelValidations.number"
                  v-model="model.number"
                  :error="getError('number')"
                ></base-input>
              </div>
              <label
                class="col-sm-2 col-form-label"
                style="font-size: 1.00rem"
              >Number of Constraints</label>
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
            <base-button native-type="submit" @click.native.prevent="validate" type="info" style='width: 20%'>Go!</base-button>
          </div>
        </card>
      </form>
    </div>
    <div class="col-lg-12">
      <Table></Table>
    </div>
    
      <div class="row" style='width: 100%' align='center'>
        <div class="col">
         <base-button native-type="submit" type="info" style='width: 90%'>Final Solution</base-button>
        </div>

        <div class="col">
          
          <base-button native-type="submit" type="info" style='width: 90%'>Step by Step</base-button>
        </div>
     
    </div>
  </div>
</template>
<script>
import Table from "src/pages/Tables/Table.vue";
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
  },
  components: {
    Table: Table
  },
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
};
</script>
<style></style>

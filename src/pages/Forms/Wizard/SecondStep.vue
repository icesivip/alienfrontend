<template>
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <h5 class="info-text">Are you living in a nice area?</h5>
    </div>
    <div class="col-sm-7">
      <base-input
        label="Comments"
        name="street name"
        v-model="model.street"
        :error="getError('street name')"
        v-validate="modelValidations.street"
      >
      </base-input>
    </div>


    
  </div>
</template>
<script>
import { Select, Option } from 'element-ui';

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      model: {
        street: '',
        streetNo: '',
        city: '',
        country: ''
      },
      countryOptions: [
        'Australia',
        'Germany',
        'Netherlands',
        'USA',
        'UK',
        'New Zealand'
      ],
      modelValidations: {
        street: {
          required: true,
          min: 5
        },
        streetNo: {
          required: true,
          min: 5
        },
        city: {
          required: true
        },
        country: {
          required: true
        }
      }
    };
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit('on-validated', res, this.model);
        return res;
      });
    }
  }
};
</script>
<style></style>
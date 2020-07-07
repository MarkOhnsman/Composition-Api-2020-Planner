<template>
  <div class="home">
    <h1>This is your home page.</h1>
    organizations: {{AppState.organizations}}
  </div>
</template>


<script>
import { reactive, computed } from '@vue/composition-api';
// NOTE Import the AppState to allow for intelisense 
import { AppState, Getters } from '../AppState';
import { organizationService } from '../services/OrganizationService';

export default {
  name: "home",
  // NOTE no more data method, computed objects or methods
  setup(props, context) {
    // NOTE 'state' replaces data and computed objects holding values for the local component
    // Computed should only be used when data is being manipulated by that computed
    // Use a getter for repeated computed functions
    let state = reactive({
      myOrganizations: computed(Getters.myOrganizations)
    })
    // NOTE Return should always include the state first, followed by the methods local to this component
    return {
      state,
      async addOrganization() {
        await organizationService.create()

      }
    }
  }
};
</script>


<style scoped>
</style>
<template>
  <div class="dashboard container-fluid">
    <div class="row flex-column align-items-end pt-3">
      <div class="col-3 text-right">
        <button
          v-if="!state.orgForm"
          type="button"
          @click="state.orgForm = true"
          class="btn btn-success shadow"
        >
          <small>New Org</small>
        </button>
        <button
          v-else
          type="button"
          @click="state.orgForm = false; state.newOrg = {};"
          class="btn btn-danger shadow"
        >
          <small>Cancel</small>
        </button>
      </div>
      <div v-if="state.orgForm" class="col-6">
        <form class="form-group mt-3 shadow" @submit.prevent="addOrganization">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Org Name..."
              aria-label="Org Name"
              v-model="state.newOrg.title"
              required
            />
            <input
              type="text"
              class="form-control"
              placeholder="Org Description..."
              aria-label="Org Description"
              v-model="state.newOrg.description"
              required
            />
            <div class="input-group-append">
              <button class="btn btn-success" type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="card col-4" v-for="org in state.myOrganizations" :key="org.id">
        <div class="card-body">
          <h4 class="card-title">{{org.title}}</h4>
          <p class="card-text">{{org.description}}</p>
          <button type="button" class="btn btn-outline-danger" @click="deleteOrg(org.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, computed } from '@vue/composition-api';
// NOTE Import the AppState to allow for intelisense 
import { AppState, Getters } from '../AppState';
import { organizationService } from '../services/OrganizationService';

export default {
  name: "dashboard",
  setup(props, context) {
    let state = reactive({
      myOrganizations: computed(Getters.myOrganizations),
      orgForm: false,
      newOrg: {},
    })
    return {
      state,
      async addOrganization() {
        await organizationService.create(state.newOrg)
        state.orgForm = false
        state.newOrg = {}
      },
      async deleteOrg(id) {
        await organizationService.delete(id)
      }
    }
  }
};
</script>


<style scoped>
</style>
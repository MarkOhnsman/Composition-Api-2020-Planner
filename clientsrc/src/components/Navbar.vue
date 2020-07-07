<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'home' }">2020 Planner</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Dashboard' }"
        >
          <router-link class="nav-link" :to="{ name: 'dashboard' }">My-Dashboard</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        {{AppState.profile.name}}
        <button
          class="btn btn-success"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >Login</button>
        <button class="btn btn-danger" @click="logout" v-else>Logout</button>
      </span>
    </div>
  </nav>
</template>

<script> 
import { organizationService } from "../services/OrganizationService"
import { api } from '../services/AxiosService';
import { profileService } from "../services/ProfileService"
import { reactive } from '@vue/composition-api';

export default {
  name: "Navbar",
  setup() {
    return {
      async login() {
        await this.$auth.loginWithPopup();
        if (this.$auth.bearer) {
          api.defaults.headers.authorization = this.$auth.bearer
          profileService.getProfile();
        }
      },
      async logout() {
        await this.$auth.logout({ returnTo: window.location.origin });
      }
    }
  }
};
</script>

<style></style>

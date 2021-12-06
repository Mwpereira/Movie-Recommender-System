<template>
  <div v-show="valid">
    <b-navbar class='box'>
      <template #brand>
        <!--        <b-navbar-item tag="router-link" :to="{ path: '/' }" class="m-0 p-0">-->
        <!--            <img src="../assets/icon.png" width="28px" height="50px" alt="Movie Recommender System" >-->
        <!--        </b-navbar-item>-->
      </template>
      <template #end>
        <b-navbar-item class='mr-4 navOptions'>
          <NuxtLink to="/dashboard">
            Dashboard
          </NuxtLink>
        </b-navbar-item>

        <b-navbar-item class='mr-4 navOptions'>
          <NuxtLink to="/rate">
            Rate Movies
          </NuxtLink>
        </b-navbar-item>

        <b-navbar-item class='mr-4 navOptions'>
          <NuxtLink to="/calculate">
            User CF
          </NuxtLink>
        </b-navbar-item>
        <b-navbar-item class='mr-4 navOptions'>
          <b-button @click="logout">Logout</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class='has-text-centered'>
      <h1 class='title mt-6'>Movie Recommender System</h1>
    </section>
  </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import WebStorageService from "~/services/web-storage-service";
import BuefyService from "~/services/buefy-service";

@Component
export default class TopSection extends Vue {
  get valid() {
    return this.$route.path === '/dashboard' || this.$route.path === '/rate' || this.$route.path === '/calculate'
  }

  private logout(): void {
    WebStorageService.logoutUser()
    BuefyService.successToast('Signed out')
    this.$router.push('/')
  }
}
</script>

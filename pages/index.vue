<template>
  <section class='section'>
    <section class='has-text-centered'>
      <h1 class='title'>Movie Recommender System</h1>
      <h2 class='is-size-5'>Completed By: Michael Pereira, Hitarth Chudgar, and Dhanayush Raninga</h2>
    </section>
    <section class='my-5'>
      <h3 class='is-size-5 has-text-weight-semibold mb-4'>Instructions</h3>
      <p class='mb-1'>1. Please create an account on our
        <NuxtLink to="/register">Register page</NuxtLink>
        to store your data.
      </p>
      <p class='mb-1'>2. Once you have registered, use our
        <NuxtLink to="/login">Login page</NuxtLink>
        to be authorized.
      </p>
      <p class='mb-1'>3. When you have signed in, browse through the available movies to rate and give them a rating
        from 1 to
        5.</p>
      <p class='mb-1'>4. When you have completed rating the movies, feel free to navigate to the <i>Recommendations</i>
        page to receive <br/> your movie recommendations based off of the user-based compatibility filter scores.</p>
      <section class="mt-5">
        <p class="is-underlined mb-2">Notice</p>
        <p>Data is stored within the browser's local storage.</p>
        <p>All cache can be deleted by clicking <a @click="clearLs">
          here.
        </a></p>
      </section>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import BuefyService from '~/services/buefy-service'
import WebStorageService from "~/services/web-storage-service";

@Component
export default class Index extends Vue {
  private clearLs(): void {
    WebStorageService.deleteAllData()
    BuefyService.successToast('All cache has been deleted')
  }
}
</script>

<style>
.toast.is-success {
  background-color: rgba(70, 201, 58, 0.1) !important;
}

.toast.is-danger {
  background-color: rgba(255, 71, 87, 0.1) !important;
}

.toast.is-success {
  color: rgb(70, 201, 58) !important;
}

.toast.is-danger {
  color: rgb(255, 71, 87) !important;
}
</style>

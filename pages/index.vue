<template>
  <section class='section'>
    <section class='has-text-centered'>
      <h1 class='title'>Movie Recommender System</h1>
      <h2 class='is-size-5'>Completed By: Michael Pereira, Hitarth Chudgar, and </h2>
    </section>
    <section class='my-5'>
      <h3 class='is-size-5 has-text-weight-bold mb-4'>Instructions</h3>>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import axios from 'axios'
import BuefyService from '~/services/buefy-service'

@Component
export default class Index extends Vue {

  private async invert() {
    await BuefyService.startLoading()
    await axios.post('/invert', {

    }).then(response => {

      // this.invertResults = response.data
      BuefyService.successToast('Dictionary & Postings Generated')
    }).catch(error => {
      BuefyService.dangerToast(error.response.data.error)
    })
    await BuefyService.stopLoading()
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

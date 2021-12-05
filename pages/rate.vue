<template>
  <section class='section'>
    <TopSection/>
    <section class='my-5'>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import axios from 'axios'
import BuefyService from '~/services/buefy-service'
import WebStorage from "~/services/WebStorage";

@Component
export default class Index extends Vue {

  private async invert() {
    await BuefyService.startLoading()
    await axios.post('/invert', {

    }).then(response => {
      // LsService.updateData(response.db)
      // console.log("Done")
      // this.invertResults = response.db
      BuefyService.successToast('Dictionary & Postings Generated')
    }).catch(error => {
      BuefyService.dangerToast(error.response.db.error)
    })
    await BuefyService.stopLoading()
  }
}
</script>

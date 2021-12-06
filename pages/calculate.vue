<template>
  <section class='section'>
    <b-button @click="calculate">WORK PLEASE</b-button>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import RecommenderSystemService from "~/services/recommender-system-service";

@Component
export default class Calculate extends Vue {
  private calculate() {
    RecommenderSystemService.calculateUserCF();
  }
}
</script>

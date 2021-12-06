<template>
  <section class='section'>
    <b-rate
      icon-pack="fas"
      custom-text="With Font Awesome"
      @change="success"></b-rate>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'

@Component
export default class Rate extends Vue {

}
</script>

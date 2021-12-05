<template>
  <section class='section'>
    <b-rate
      icon-pack="fas"
      @change="success"
      custom-text="With Font Awesome"></b-rate>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'

@Component
export default class Rate extends Vue {

}
</script>

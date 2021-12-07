<template>
  <section class="section box has-text-centered">
    <img :src="imgUrl" width="300px" height="500px" :alt="title"/>
    <h2 class="title is-size-5 m-6">{{ title }}</h2>
    <p class="my-6 is-flex">
      <span class="has-text-weight-semibold">Moving Rating:</span>
      <b-rate
        v-model="getRating"
        class="is-size-4 ml-3"
        icon-pack="fas"
      ></b-rate>
    </p>
  </section>
</template>

<script lang='ts'>
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component
export default class TopSection extends Vue {

}
</script>

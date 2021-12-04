<template>
  <div>
    <section class='main-content columns'>
      <div class='container column is-10'>
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Default extends Vue {
}
</script>

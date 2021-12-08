<template>
  <section class="section box has-text-centered">
    <img :src="imgUrl" width="200px" height="350px" :alt="title"/>
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
import WebStorageService from "~/services/web-storage-service";
import {movies} from "~/services/movie-information";

@Component
export default class TopSection extends Vue {
  @Prop() private title!: string;
  @Prop() private imgUrl!: string;
  @Prop() private index!: number;

  private rating = 0;

  get getRating(): number {
    return this.rating
  }

  set getRating(value: number) {
    this.rating = value
    WebStorageService.setRatings(value, movies.indexOf(this.title))
  }

  created() {
    // @ts-ignore
    this.rating = [...WebStorageService.checkForData().accounts[WebStorageService.getCurrentAuthorizedUser()].ratings][this.index];
  }
}
</script>

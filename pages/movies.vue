<template>
  <section class='section'>
    <section class="box">
      <h1 class="title">All Movies</h1>
      <p>The order of all the ratings are in the order for which these movies appear.</p>
      <div class="columns my-4 has-text-centered is-centered is-multiline">
        <div v-for="movie in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]" :key="movie" class="column is-2">
          <img :src="movies[movie]" width="150px" height="300px" :alt="movieTitles[movie]"/>
        </div>
      </div>
    </section>
    <section class="box">
      <h1 class="title">Watched Movies</h1>
      <p>These are movies you have watched and will rate on the
        <NuxtLink to="/rate-movies">Rate Movies page</NuxtLink>
        .
      </p>
      <div class="columns my-4 has-text-centered is-centered is-multiline">
        <div v-for="movie in watchedMovies" :key="movie" class="column is-2">
          <img :src="movies[movie]" width="150px" height="300px" :alt="movieTitles[movie]"/>
        </div>
      </div>
    </section>
    <section class="box">
      <h1 class="title">Recommended Movies</h1>
      <p>These are movies you can get recommended based on your ratings found on the
        <NuxtLink to="/recommendations">Recommended page</NuxtLink>
        .
      </p>
      <div class="columns my-4 has-text-centered is-centered is-multiline">
        <div v-for="movie in recommendedMovies" :key="movie" class="column is-2">
          <img :src="movies[movie]" width="150px" height="300px" :alt="movieTitles[movie]"/>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import {movieImgUrls, movies} from "~/services/movie-information";

@Component
export default class Calculate extends Vue {
  private watchedMovies = [0, 1, 4, 6, 9, 11, 12, 13, 15, 17];
  private recommendedMovies = [2, 3, 5, 7, 8, 10, 14, 16];
  private movies = movieImgUrls
  private movieTitles = movies
}
</script>

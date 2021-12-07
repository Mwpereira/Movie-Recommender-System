<template>
  <section class="section">
    <section class="box">
      <h1 class="title mb-6">Recommended Films:</h1>
      <div class="columns has-text-centered is-centered is-multiline">
        <div v-for="movie in recommendations" :key="movie" class="column is-2">
          <img :src="moviesImgUrls[movie.id]" width="300px" height="500px" :alt="movies[movie.id]"/>
          <h2 class="title is-size-5 m-6">{{ movies[movie] }}</h2>
          <p class="mt-6 mb-5 has-text-weight-semibold has-text-centered">
            Your Estimated Movie Rating is
          </p>
          <p class="mb-5 has-text-weight-semibold is-size-4">
            <span>{{ movie.score }}/5</span>
          </p>
        </div>
        <div v-if="recommendations.length === 0" class="ml-4 mb-5">
          <p>Sorry we do not have any movie recommendations for you at this time. Please adjust your data on the <NuxtLink to="/rate-movies">Ratings page</NuxtLink>.</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import BuefyService from "~/services/buefy-service";
import RecommenderSystemService from "~/services/recommender-system-service";
import {movieImgUrls, movies} from "~/services/movie-information";

@Component
export default class Recommendations extends Vue {
  private recommendations: number[] = [];
  private movies = movies
  private moviesImgUrls = movieImgUrls

  mounted() {
    this.calculate()
  }

  private async calculate() {
    BuefyService.startLoading();
    const result = await RecommenderSystemService.calculateUserCF();
    this.recommendations = result.recommendedMovies;
    const finalRecommendations: any[] = [];
    for (let i = 0; i < result.recommendedMovies.length; i++) {
      finalRecommendations.push({
        // @ts-ignore
        id: Object.values(this.recommendations)[i].id,
        // @ts-ignore
        score: Object.values(this.recommendations)[i].score.toFixed(2),
      })
    }
    this.recommendations = finalRecommendations;
    BuefyService.stopLoading();
  }
}
</script>

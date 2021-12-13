<template>
  <section class='section'>
    <div class="columns has-text-centered is-centered is-multiline">
      <div v-for="(movie, index) in movieTitles" :key="movie" class="column is-6">
        <Movie id="card" :title="movieTitles[index]" :img-url="movieImgUrls[index]" :index="indexToId(index)"/>
      </div>
      <NuxtLink to="/recommendations"><b-button class="is-dark m-6">View My Recommendations</b-button></NuxtLink>
    </div>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'

@Component
export default class RateMovies extends Vue {
  private movieTitles = [
    'Shang-Chi and the Legend of the Ten Rings',
    'Captain America: Civil War',
    'Batman Begins',
    'La La Land',
    'Mr. & Mrs. Smith',
    'Parasite',
    'Superbad',
    'Crazy Rich Asians',
    'Oceans Eleven',
    'Free Guy'
  ]

  private movieImgUrls = [
    'https://mx.web.img3.acsta.net/pictures/21/08/10/10/22/2091196.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    'https://www.goldenglobes.com/sites/default/files/articles/cover_images/2017-la_la_land.jpg?format=pjpg&auto=webp&optimize=high&width=850',
    'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR6Z4Xl5FbpSPZHYTXnLHTC47iEz5HK7I-NdcKREUWeee1TRdsR',
    'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    'https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/229943_SUPERBAD_1400x2100_English.jpg?itok=05RWmXpx',
    'https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BYzVmYzVkMmUtOGRhMi00MTNmLThlMmUtZTljYjlkMjNkMjJkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg'
  ]

  private indexToId(index: number): number {
    switch (index) {
      case 0:
        return 0
      case 1:
        return 1
      case 2:
        return 4
      case 3:
        return 9
      case 4:
        return 11
      case 5:
        return 6
      case 6:
        return 12
      case 7:
        return 13
      case 8:
        return 15
      case 9:
        return 17
      default:
        return 0
    }
  }
}
</script>

<style>
#card {
  height: 575px !important;
}
</style>

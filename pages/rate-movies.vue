<template>
  <section class='section'>
    <div class="columns has-text-centered is-multiline">
      <div v-for="(movie, index) in movieTitles" :key="movie" class="column is-6">
        <Movie id="card" :title="movieTitles[index]" :img-url="movieImgUrls[index]" :index="indexToId(index)"/>
      </div>
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
    'Parasite',
    'Superbad',
    'Crazy Rich Asians',
  ]

  private movieImgUrls = [
    'https://mx.web.img3.acsta.net/pictures/21/08/10/10/22/2091196.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_.jpg',
    'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    'https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/229943_SUPERBAD_1400x2100_English.jpg?itok=05RWmXpx',
    'https://m.media-amazon.com/images/M/MV5BMTYxNDMyOTAxN15BMl5BanBnXkFtZTgwMDg1ODYzNTM@._V1_.jpg',
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
        return 7
      case 4:
        return 8
      default:
        return 0
    }
  }
}
</script>

<style>
#card {
  height: 755px !important;
}
</style>

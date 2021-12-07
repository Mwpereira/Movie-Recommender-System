<template>
  <section class='section'>
    <h2 class="title is-size-4 has-text-weight-normal">Current User's Ratings: {{ currentUsersRatings }}</h2>
    <section class="box">
      <h2 class="title">Calculations</h2>
      <div v-if="mainData !== null">
        <p class="m-3">Summary of data calculated/used for the predicted ratings.</p>
        <b-table :data="mainData" :columns="mainDataColumns"></b-table>
      </div>
      <div v-if="similarityScoresData !== null">
        <p class="mx-3 mt-4 mb-3">Random users with similarity scores greater than 0.</p>
        <b-table :data="similarityScoresData" :columns="similarityDataColumns"></b-table>
      </div>
      <div v-if="randomUsersOriginalData !== null">
        <p class="mx-3 mt-4 mb-3">Original ratings of the random users.</p>
        <b-table :data="randomUsersOriginalData" :columns="randomUsersOriginalColumns"></b-table>
      </div>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import RecommenderSystemService from "~/services/recommender-system-service";
import BuefyService from "~/services/buefy-service";

@Component
export default class Calculations extends Vue {
  private currentUsersRatings: number[] = [];
  private mainData: any = null;
  private mainDataColumns = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'randomUsersAverage',
      label: 'Random Users Average',
    },
    {
      field: 'randomUsersRatings',
      label: 'Random Users Ratings',
    },
    {
      field: 'currentUsersAverage',
      label: 'Current Users Average',
    },
    {
      field: 'currentUsersRatings',
      label: 'Current Users Ratings',
    },
    {
      field: 'similarityScore',
      label: 'Similarity Score',
    }
  ]

  private similarityScoresData: any = null;
  private similarityDataColumns = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'score',
      label: 'Similarity Score',
    },
  ]

  private randomUsersOriginalData: any = null;
  private randomUsersOriginalColumns = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'ratings',
      label: 'Original Ratings Array',
    }
  ]

  mounted() {
    this.calculate()
  }

  private async calculate() {
    BuefyService.startLoading();
    const result = await RecommenderSystemService.calculateUserCF();
    this.mainData = result.usersRatingsMap
    this.similarityScoresData = result.similarityScoreRanking
    const originalRatings = result.randomUsersOriginalRatings
    const finalOriginalRatings: any[] = [];
    for (let i = 0; i < Object.keys(originalRatings).length; i++) {
      finalOriginalRatings.push({
        name: Object.keys(originalRatings)[i],
        ratings: Object.values(originalRatings)[i],
      })
    }
    this.randomUsersOriginalData = finalOriginalRatings
    this.currentUsersRatings = result.currentUsersRatings
    BuefyService.stopLoading();
  }
}
</script>

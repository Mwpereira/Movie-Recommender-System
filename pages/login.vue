<template>
  <section class='section'>
    <section class='has-text-centered'>
      <h1 class='title'>Movie Recommender System</h1>
    </section>
    <section class='section'>
      <div class='columns is-centered'>
        <div class='box column p-6 is-6'>
          <h2 class="is-size-5 has-text-weight-bold mb-5">Login</h2>
          <form @submit.prevent="login">
            <b-field label="Username">
              <b-input v-model="username" required></b-input>
            </b-field>

            <b-field label="Password">
              <b-input v-model="password" type="password" password-reveal required></b-input>
            </b-field>

            <b-button class="is-success my-4 mr-3" :disabled="invalid" @click="login">Login</b-button>
            <NuxtLink to="/register">
              <b-button class="button my-4">Register</b-button>
            </NuxtLink>
          </form>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import axios from 'axios'
import BuefyService from '~/services/buefy-service'
import WebStorageService from '~/services/web-storage-service';

@Component
export default class Register extends Vue {
  private username: string = '';
  private password: string = '';

  private async login() {
    await BuefyService.startLoading()
    await axios.post('/login', {
      username: this.username,
      password: this.password,
      db: WebStorageService.checkForData()
    }).then(() => {
      WebStorageService.authorizeUser(this.username);
      BuefyService.successToast('User Authorized')
      this.$router.push('/movies')
    }).catch(error => {
      BuefyService.dangerToast(error.response.data.error)
    })
    await BuefyService.stopLoading()
  }

  get invalid() {
    return this.username.length < 3 || this.username.length > 32 || this.password.length < 3 || this.password.length > 64
  }

  mounted() {
    if (WebStorageService.getCurrentAuthorizedUser() !== null) {
      this.$router.push('/movies')
    }
  }
}
</script>

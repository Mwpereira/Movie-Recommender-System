<template>
  <section class='section'>
    <section class='has-text-centered'>
      <h1 class='title'>Movie Recommender System</h1>
    </section>
    <section class='section'>
      <div class='columns is-centered'>
        <div class='box column p-6 is-6'>
          <h2 class="is-size-5 has-text-weight-bold mb-5">Register</h2>
          <form @submit.prevent="register">
            <b-field label="Username">
              <b-input v-model="username" minlength="3" maxlength="32"  required></b-input>
            </b-field>

            <b-field label="Password">
              <b-input v-model="password" type="password" minlength="3" maxlength="64" password-reveal required></b-input>
            </b-field>

            <b-field>
              <b-checkbox v-model="termsAndConditions"
                          type="is-warning" class="my-3">
                Agree to Terms and Conditions
              </b-checkbox>
            </b-field>

            <b-button class="is-success my-4 mr-3" :disabled="invalid" @click="register">Register</b-button>
            <NuxtLink to="/login">
              <b-button class="button my-4">Login</b-button>
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
  private termsAndConditions: boolean = false;

  private async register() {
    await BuefyService.startLoading()
    await axios.post('/register', {
      username: this.username,
      password: this.password,
      db: WebStorageService.checkForData()
    }).then(response => {
      WebStorageService.updateData(response.data.db)
      BuefyService.successToast('User Created')
      this.$router.push('/login')
    }).catch(error => {
      BuefyService.dangerToast(error.response.data.error)
    })
    await BuefyService.stopLoading()
  }

  get invalid() {
    return !this.termsAndConditions || this.username.length < 3 || this.username.length > 32 || this.password.length < 3 || this.password.length > 64
  }

  mounted() {
    if (WebStorageService.getCurrentAuthorizedUser() !== null) {
      this.$router.push('/movies')
    }
  }
}
</script>

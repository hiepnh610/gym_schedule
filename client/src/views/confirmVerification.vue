<template>
  <div class="container">
    <h1 class="text-center">{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
// import axios from 'axios'

// import router from '@/router'
// import config from '@/config'
// import { Response, ParamEmailVerification } from '@/util'

@Component
export default class ConfirmVerification extends Vue {
  private errContent: string = ''
  private message: string = 'test'

  // private created () {
  //   const token: string = this.$route.params.token
  //   const params: ParamEmailVerification = { token }

  //   axios
  //     .put(config.api.email, params)
  //     .then(function (response: Response) {
  //       this.message = response.data.message
  //     }.bind(this))
  //     .catch(function (error: Response) {
  //       if (error.response) {
  //         if (error.response.status === 301) {
  //           router.push('/news-feed')
  //         }

  //         if (error.response.data && error.response.data.message) {
  //           this.errContent = error.response.data.message
  //         }
  //       } else {
  //         this.$toasted.error('Error happened!!!')
  //       }
  //     }.bind(this))
  // }
}
</script>

<style lang="scss" scoped>
  h1 {
    padding-top: 100px;
  }
</style>

<template>
  <div id="dashboard">
    <div class="container">
      <div class="text-center mb-5">
        <router-link to="" class="btn btn-lg btn-primary mx-1">Calendar</router-link>

        <router-link to="/dashboard/plan" class="btn btn-lg btn-primary mx-1">Your Plan</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Dashboard extends Vue {
}
</script>

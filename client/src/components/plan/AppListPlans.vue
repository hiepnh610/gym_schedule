<template>
  <div class="row">
    <div class="col-xs-12">
      <table class="table table-striped list-plans text-left">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>type</th>
            <th>frequency</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="plan in getListPlans">
            <td class="text-center"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/15255-200.png" :alt="plan.name"></td>

            <td><a href="#" class="text-primary text-capitalize">{{ plan.name }}</a></td>

            <td>{{ plan.type }}</td>

            <td v-if="plan.frequency > 1">{{ plan.frequency }} days/week</td>

            <td v-if="plan.frequency <= 1">{{ plan.frequency }} day/week</td>

            <td class="text-right">
              <a class="btn btn-sm btn-warning m-r-5">Edit</a>

              <a class="btn btn-sm btn-danger" @click.prevent="deletePlan(plan._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'AppListPlans',
  data () {
    return {
      errContent: ''
    }
  },
  computed: {
    getListPlans () {
      return this.$store.getters.listPlans
    }
  },
  methods: {
    deletePlan (id) {
      this.$store.dispatch('setDeletePlan', id)
      axios.delete(config.domainAddress + config.api.deletePlans.replace('{id}', id))
      .then(function (response) {
        console.log(this)
      }.bind(this))
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

.list-plans {
  img {
    max-width: $size-base * 16;
  }
}
</style>

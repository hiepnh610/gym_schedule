<template>
  <div class="row" v-if="getListPlans.length > 0">
    <div class="col-12 col-lg-8 offset-lg-2">
      <table class="table table-striped table-bordered table-hover list-plans text-center">
        <thead class="thead-dark">
          <tr>
            <th>name</th>
            <th>type</th>
            <th>frequency</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="plan in getListPlans">
            <td>
              <router-link :to="'workout/' + plan._id" class="text-primary text-capitalize">{{ plan.name }}</router-link>
            </td>

            <td>{{ plan.type }}</td>

            <td v-if="plan.frequency > 1">{{ plan.frequency }} days/week</td>

            <td v-if="plan.frequency <= 1">{{ plan.frequency }} day/week</td>

            <td>
              <a href="" class="btn btn-sm btn-secondary m-r-5" @click.prevent="updatePlan(plan)">Edit</a>

              <a href="" class="btn btn-sm btn-danger" @click.prevent="deletePlan(plan._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <app-plan-update :data-plan-origin="dataPlanOrigin"></app-plan-update>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

import AppPlanUpdate from './AppPlanUpdate.vue'

export default {
  name: 'AppListPlans',

  components: { AppPlanUpdate },

  data () {
    return {
      errContent: '',
      dataPlanOrigin: ''
    }
  },

  computed: {
    getListPlans () {
      return this.$store.getters.listPlans
    }
  },

  methods: {
    updatePlan (plan) {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowUpdateModal', true)
      this.dataPlanOrigin = plan
    },

    deletePlan (id) {
      this.$store.dispatch('setDeletePlan', id)

      axios
        .delete(config.domainAddress + config.api.plans + id)
        .then(function () {
          this.$toasted.success('Delete Successfully!!!')
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }

          this.$toasted.error('Error happened!!!')
        }.bind(this))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';

.list-plans {
  thead {
    tr {
      th {
        text-align: center;
      }
    }
  }
}
</style>

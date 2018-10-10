<template>
  <div class="row">
    <div class="col-12 col-lg-10 offset-lg-1">
      <table class="table table-bordered list-plans text-center mb-5">
        <thead class="bg-success">
          <tr>
            <th>name</th>
            <th>type</th>
            <th>frequency</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="plan in listPlans" :key="plan._id">
            <td>
              <router-link :to="'workout/' + plan._id" class="text-success text-capitalize">{{ plan.name }}</router-link>
            </td>

            <td>{{ plan.type }}</td>

            <td v-if="plan.frequency > 1">{{ plan.frequency }} days/week</td>

            <td v-if="plan.frequency <= 1">{{ plan.frequency }} day/week</td>

            <td>
              <a href="" class="btn btn-sm btn-secondary mr-1" @click.prevent="updatePlan(plan)">Edit</a>

              <a href="" class="btn btn-sm btn-danger" @click.prevent="deletePlan(plan._id)">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <plan-update :data-plan-origin="dataPlanOrigin"></plan-update>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import planUpdate from './plan-update.vue'

const namespaceModal: string = 'modal'
const namespacePlan: string = 'plans'

@Component({
  components: {
  planUpdate
  },
  })
export default class ListPlans extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) setShowUpdateModal: any

  @Action('setDeletePlan', { namespace: namespacePlan }) setDeletePlan: any
  @Getter('listPlans', { namespace: namespacePlan }) listPlans: any

  message: string = ''
  dataPlanOrigin: any = ''

  updatePlan (plan: any) {
    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)

    this.dataPlanOrigin = plan
  }

  deletePlan (id: string) {
    this.setDeletePlan(id)

    axios
      .delete(config.domainAddress + config.api.plans + id)
      .then(function () {
        this.$toasted.success('Delete Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }

        this.$toasted.error('Error happened!!!')
      }.bind(this))
  }
}
</script>

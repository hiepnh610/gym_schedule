<template>
  <div class="container">
    <div class="row list-cards text-left">
      <div class="col-3" v-for="plan in listPlans" :key="plan._id">
        <div class="card border">
          <div class="image bg-light">
            <img src="@/assets/images/bulking.jpg" alt="" v-if="plan.type === 'Bulking'" />

            <img src="@/assets/images/cutting.jpg" alt="" v-if="plan.type === 'Cutting'" />

            <img src="@/assets/images/general.jpg" alt="" v-if="plan.type === 'General'" />
          </div>

          <div class="px-3 pt-3 bg-white">
            <h4>
              <router-link :to="'workouts/' + plan._id" class="text-capitalize text-secondary">{{ plan.name }}</router-link>
            </h4>

            <p class="text-muted">Type: {{ plan.type }}</p>

            <p v-if="plan.frequency > 1" class="text-muted">Frequency: {{ plan.frequency }} days/week</p>

            <p v-if="plan.frequency <= 1" class="text-muted">Frequency: {{ plan.frequency }} day/week</p>
          </div>

          <footer class="p-3 bg-light">
            <a href="#" class="btn btn-sm btn-secondary mr-1" @click.prevent="updatePlan(plan)">Edit</a>

            <a href="#" class="btn btn-sm btn-danger" @click.prevent="deletePlan(plan._id)">Remove</a>
          </footer>
        </div>
      </div>
    </div>

    <plan-update :data-plan-origin="dataPlanOrigin" />
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
    axios
      .delete(config.api.plans + id)
      .then(function () {
        this.setDeletePlan(id)

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

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
              <router-link :to="{ name: 'Workouts', params: { id: plan._id } }" v-if="plan._id" class="text-capitalize text-secondary">{{ plan.name }}</router-link>
            </h4>

            <p class="text-muted">Type: {{ plan.type }}</p>

            <p v-if="plan.frequency > 1" class="text-muted">Frequency: {{ plan.frequency }} days/week</p>

            <p v-if="plan.frequency <= 1" class="text-muted">Frequency: {{ plan.frequency }} day/week</p>
          </div>

          <footer class="p-3 bg-light text-right">
            <button class="btn btn-xs btn-transparent m-0" @click.prevent="deletePlan(plan._id)">Remove</button>

            <button class="btn btn-xs btn-light m-0" @click.prevent="updatePlan(plan)">Edit</button>
          </footer>
        </div>
      </div>
    </div>

    <plan-update :data-plan-origin="dataPlanOrigin" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

import planUpdate from './plan-update.vue'

const namespaceModal: string = 'modal'
const namespacePlan: string = 'plans'

@Component({
  components: {
  planUpdate
  }
  })
export default class ListPlans extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) private setShowUpdateModal: any

  @Action('setDeletePlan', { namespace: namespacePlan }) private setDeletePlan: any
  @Getter('listPlans', { namespace: namespacePlan }) private listPlans: any

  private message: string = ''
  private dataPlanOrigin: any = ''

  private updatePlan (plan: any) {
    this.setShowModalBackdrop(true)
    this.setShowUpdateModal(true)

    this.dataPlanOrigin = plan
  }

  private deletePlan (id: string) {
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

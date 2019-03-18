<template>
  <div id="plans-page" v-if="!isLoading">
    <div class="page-title mb-5">
      <div class="container">
        <h2 class="text-center mb-5">Plans</h2>
      </div>
    </div>

    <div class="container text-center">
      <button class="btn btn-sm btn-primary mb-5" @click.prevent="createPlan">
        Create Plan
      </button>

      <p v-if="listPlans.length === 0">Please create a plan from the under button.</p>
    </div>

    <list-plans v-if="listPlans.length > 0" />

    <plan-create />
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, setLoading } from '@/util'

import planCreate from '@/components/plan/plan-create.vue'
import listPlans from '@/components/plan/list-plans.vue'
import Loading from '@/components/loading/loading.vue'

const namespacePlan: string = 'plans'
const namespaceModal: string = 'modal'
const namespaceUser: string = 'user'

@Component({
  components: {
  planCreate,
  listPlans,
  FontAwesomeIcon,
  Loading
  }
  })
export default class Plans extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) private setShowCreateModal: any

  @Action('setListPlans', { namespace: namespacePlan }) private setListPlans: any
  @Getter('listPlans', { namespace: namespacePlan }) private listPlans: any

  @Getter('user', { namespace: namespaceUser }) private user: any

  private message: string = ''
  private isLoading: boolean = true

  private createPlan () {
    this.setShowModalBackdrop(true)
    this.setShowCreateModal(true)
  }

  private created () {
    const self: any = this

    axios
      .get(config.api.plans)
      .then(function (response: Response) {
        this.setListPlans(response.data)

        setLoading(this, false)
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = 'Error happened.'
        }
      }.bind(this))
  }
}
</script>

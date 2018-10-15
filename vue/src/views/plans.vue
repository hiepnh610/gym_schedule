<template>
  <div id="plans-page">
    <div class="text-center">
      <div class="page-title">
        <div class="container">
          <h2 class="text-center mb-5">Plans</h2>
        </div>
      </div>

      <list-plans v-if="listPlans.length > 0"></list-plans>

      <p v-if="listPlans.length === 0" class="align-center">Please create a plan from the under button.</p>

      <a href="" class="btn btn-lg btn-primary" @click.prevent="createPlan">
        Create Plan
      </a>

      <plan-create></plan-create>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, ID } from '@/util'

import planCreate from '@/components/plan/plan-create.vue'
import listPlans from '@/components/plan/list-plans.vue'

@Component({
  components: {
  planCreate,
  listPlans,
  FontAwesomeIcon,
  },
  })
export default class Plans extends Vue {
  @Action('setShowModalBackdrop', { namespace: 'modal' }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: 'modal' }) setShowCreateModal: any

  @Action('setListPlans', { namespace: 'plans' }) setListPlans: any
  @Getter('listPlans', { namespace: 'plans' }) listPlans: any

  message: string = ''

  createPlan () {
    this.setShowModalBackdrop(true)
    this.setShowCreateModal(true)
  }

  created () {
    const _this: any = this

    const params: ID = {
      id: _this.$session.get('id')
    }

    axios
      .get(config.domainAddress + config.api.plans, { params })
      .then(function (response: Response) {
        this.setListPlans(response.data)
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

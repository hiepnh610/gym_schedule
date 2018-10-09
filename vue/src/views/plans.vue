<template>
  <div class="text-center">
    <h1 class="text-center mb-5">Plan</h1>

    <list-plans v-if="listPlans.length > 0"></list-plans>

    <p v-if="listPlans.length === 0" class="align-center mb-5">Please create a plan from the under button.</p>

    <a href="" class="btn btn-md btn-success" @click.prevent="createPlan">
      <font-awesome-icon icon="plus-circle" />
      Create Plan
    </a>

    <plan-create></plan-create>
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

<style lang="scss"></style>

<template>
  <div id="plans-page" v-if="!isLoading">
    <div class="text-center">
      <div class="page-title">
        <div class="container">
          <h2 class="text-center mb-5">Plans</h2>
        </div>
      </div>

      <list-plans v-if="listPlans.length > 0"></list-plans>

      <p v-if="listPlans.length === 0" class="align-center mt-5 mb-5">Please create a plan from the under button.</p>

      <a href="" class="btn btn-lg btn-primary" @click.prevent="createPlan">
        Create Plan
      </a>

      <plan-create></plan-create>
    </div>
  </div>

  <loading v-else />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, ID, setLoading } from '@/util'

import planCreate from '@/components/plan/plan-create.vue'
import listPlans from '@/components/plan/list-plans.vue'
import Loading from '@/components/loading/loading.vue'

const namespacePlan: string = 'plans'
const namespaceModal: string = 'modal'

@Component({
  components: {
  planCreate,
  listPlans,
  FontAwesomeIcon,
  Loading,
  },
  })
export default class Plans extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any

  @Action('setListPlans', { namespace: namespacePlan }) setListPlans: any
  @Getter('listPlans', { namespace: namespacePlan }) listPlans: any

  message: string = ''
  isLoading: boolean = true

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
      .get(config.api.plans, { params })
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

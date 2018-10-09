<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showCreateModal" :class="{ 'show animated bounceIn': setShowModalBackdrop && showCreateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center mb-4 text-success">Plan Information</h2>

          <form>
            <div class="form-group">
              <label for="name-plan">Routine Name</label>

              <input type="text" id="name-plan" class="form-control" v-model="namePlan" />
            </div>

            <div class="form-group">
              <label for="type-plan">Type</label>

              <select id="type-plan" class="form-control" v-model="typePlan">
                <option value="General">General</option>
                <option value="Bulking">Bulking</option>
                <option value="Cutting">Cutting</option>
              </select>
            </div>

            <div class="form-group">
              <label for="frequency-plan">Frequency</label>

              <select id="frequency-plan" class="form-control" v-model="frequencyPlan">
                <option value="1">1 day / week</option>
                <option value="2">2 days / week</option>
                <option value="3">3 days / week</option>
                <option value="4">4 days / week</option>
                <option value="5">5 days / week</option>
                <option value="6">6 days / week</option>
                <option value="7">7 days / week</option>
              </select>
            </div>

            <p v-show="message" class="text-danger">{{ message }}</p>

            <div class="form-group text-center mb-0">
              <button href="dashboard" class="btn btn-md btn-success" @click.prevent="planCreate">
                Submit
                <font-awesome-icon icon="spinner" spin v-if="loading" />
              </button>

              <button href="dashboard" class="btn btn-md btn-secondary" @click.prevent="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
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

const namespaceModal: string = 'modal'
const namespacePlan: string = 'plans'

interface ParamsPlanCreate {
  'created_by': string;
  frequency: string;
  name: string;
  type: string;
}

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class PlanCreate extends Vue {
  @Action('setShowModalBackdrop', { namespace: namespaceModal }) setShowModalBackdrop: any
  @Action('setShowCreateModal', { namespace: namespaceModal }) setShowCreateModal: any
  @Getter('showModalBackdrop', { namespace: namespaceModal }) showModalBackdrop: any
  @Getter('showCreateModal', { namespace: namespaceModal }) showCreateModal: any

  @Action('setCreatePlan', { namespace: namespacePlan }) setCreatePlan: any

  frequencyPlan: string = ''
  loading: boolean = false
  message: string = ''
  namePlan: string = ''
  typePlan: string = ''

  closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowCreateModal(false)
  }

  planCreate () {
    if (!this.namePlan) {
      this.message = 'The routine name cannot be blank.'

      return
    }

    if (!this.typePlan) {
      this.message = 'The type cannot be blank.'

      return
    }

    if (!this.frequencyPlan) {
      this.message = 'The frequency cannot be blank.'

      return
    }

    const _this: any = this

    const params: ParamsPlanCreate = {
      created_by: _this.$session.get('id'),
      frequency: this.frequencyPlan,
      name: this.namePlan,
      type: this.typePlan
    }

    this.loading = true

    axios
      .post(config.domainAddress + config.api.plans, params)
      .then(function (response: Response) {
        this.namePlan = ''
        this.typePlan = ''
        this.frequencyPlan = ''

        this.loading = false

        this.setCreatePlan(response.data)
        this.setShowModalBackdrop(false)
        this.setShowCreateModal(false)

        this.$toasted.success('Create Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        console.log(error)

        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))
  }
}
</script>

<style lang="scss"></style>

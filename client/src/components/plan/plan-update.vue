<template>
  <div class="modal modal-xs fade text-left" v-show="setShowModalBackdrop && showUpdateModal" :class="{ 'show animated fadeInUp': setShowModalBackdrop && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title text-primary text-uppercase">Update Information</h2>
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group-header">
              <div class="form-group input-group-lg">
                <label for="name-plan">Routine Name</label>

                <input type="text" id="name-plan" class="form-control" v-model="namePlan" />
              </div>

              <div class="form-group input-group-lg">
                <label for="type-plan">Type</label>

                <div class="form-group-has-icon">
                  <font-awesome-icon icon="caret-down" />

                  <select id="type-plan" class="form-control" v-model="typePlan">
                    <option value="General">General</option>
                    <option value="Bulking">Bulking</option>
                    <option value="Cutting">Cutting</option>
                  </select>
                </div>
              </div>

              <div class="form-group input-group-lg">
                <label for="frequency-plan">Frequency</label>

                <div class="form-group-has-icon">
                  <font-awesome-icon icon="caret-down" />

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
              </div>

              <p v-show="message" class="text-danger">{{ message }}</p>
            </div>

            <div class="form-group form-button text-right mb-0">
              <button class="btn btn-xs btn-transparent m-0" @click.prevent="closeModal">Cancel</button>

              <button class="btn btn-xs btn-secondary m-0" @click.prevent="planUpdate(dataPlanOrigin._id)">
                Update
                <font-awesome-icon icon="spinner" spin v-if="loading" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import axios from 'axios'

import config from '@/config'
import { Response } from '@/util'

interface Params {
  frequency: string,
  name: string,
  type: string
}

const namespaceModal: string = 'modal'
const namespacePlan: string = 'plans'

@Component
export default class PlanUpdate extends Vue {
  @Prop() private dataPlanOrigin!: any

  @Action('setShowModalBackdrop', { namespace: namespaceModal }) private setShowModalBackdrop: any
  @Action('setShowUpdateModal', { namespace: namespaceModal }) private setShowUpdateModal: any
  @Getter('showUpdateModal', { namespace: namespaceModal }) private showUpdateModal: any

  @Action('setUpdatePlan', { namespace: namespacePlan }) private setUpdatePlan: any

  private frequencyPlan: string = ''
  private loading: boolean = false
  private message: string = ''
  private namePlan: string = ''
  private typePlan: string = ''

  private closeModal () {
    this.setShowModalBackdrop(false)
    this.setShowUpdateModal(false)
  }

  private planUpdate (id: string) {
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

    const params: Params = {
      frequency: this.frequencyPlan,
      name: this.namePlan,
      type: this.typePlan
    }

    this.loading = true

    axios
      .put(config.api.plans + id, params)
      .then(function (response: Response) {
        this.loading = false

        this.setShowUpdateModal(false)
        this.setShowModalBackdrop(false)
        this.setUpdatePlan(response.data)

        this.$toasted.success('Update Successfully!!!')
      }.bind(this))
      .catch(function (error: Response) {
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.$toasted.error('Error happened!!!')
        }

        this.loading = false
      }.bind(this))
  }

  @Watch('dataPlanOrigin', { immediate: true, deep: true })
  private dataPlan (val: any, oldVal: any) {
    this.frequencyPlan = val.frequency
    this.namePlan = val.name
    this.typePlan = val.type
  }
}
</script>

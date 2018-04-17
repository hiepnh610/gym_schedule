<template>
  <div class="modal modal-xs fade text-left" v-show="showBackgroundModal && showCreatePlan" :class="{ 'show animated bounceIn': showBackgroundModal && showCreatePlan }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center m-b-25 text-success">Plan Information</h2>

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

            <div class="form-group text-center m-b-0">
              <button href="dashboard" class="btn btn-md btn-success" @click.prevent="planCreate">Submit</button>

              <button href="dashboard" class="btn btn-md btn-light" @click.prevent="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'

export default {
  name: 'AppPlanCreate',

  data () {
    return {
      namePlan: '',
      typePlan: '',
      frequencyPlan: '',
      errContent: ''
    }
  },

  methods: {
    closeModal () {
      this.$store.dispatch('setShowBackgroundModal', false)
    },

    planCreate () {
      const params = {
        name: this.namePlan,
        type: this.typePlan,
        frequency: this.frequencyPlan,
        created_by: this.$session.get('id')
      }

      axios
        .post(config.domainAddress + config.api.plans, params)
        .then(function (response) {
          const dataItem = {
            frequency: response.data.frequency,
            name: response.data.name,
            type: response.data.type,
            created_by: response.data.created_by
          }

          this.$store.dispatch('setShowBackgroundModal', false)
          this.$store.dispatch('setCreatePlan', dataItem)
          this.namePlan = ''
          this.typePlan = ''
          this.frequencyPlan = ''
          this.$toasted.success('Create Successfully!!!')
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
  },

  computed: {
    showBackgroundModal () {
      return this.$store.getters.showBackgroundModal
    },

    showCreatePlan () {
      return this.$store.getters.showCreateModal
    }
  }
}
</script>

<style lang="scss"></style>

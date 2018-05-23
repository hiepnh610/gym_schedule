<template>
  <div class="modal modal-xs fade text-left" v-show="showBackgroundModal && showUpdateModal" :class="{ 'show animated bounceIn': showBackgroundModal && showUpdateModal }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <h2 class="text-center mb-4 text-success">Update Plan Information</h2>

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
              <button href="dashboard" class="btn btn-md btn-success" @click.prevent="planUpdate(dataPlanOrigin._id)">
                Update
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

<script>
import axios from 'axios'
import config from '@/config'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppPlanUpdate',

  components: { FontAwesomeIcon },

  props: ['dataPlanOrigin'],

  data () {
    return {
      namePlan: '',
      typePlan: '',
      frequencyPlan: '',
      loading: false,
      message: ''
    }
  },

  methods: {
    closeModal () {
      this.$store.dispatch('setShowBackgroundModal', false)
    },

    planUpdate (id) {
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

      const params = {
        name: this.namePlan,
        type: this.typePlan,
        frequency: this.frequencyPlan
      }

      this.loading = true

      axios
        .put(config.domainAddress + config.api.plans + id, params)
        .then(function (response) {
          this.loading = false

          this.$store.dispatch('setShowBackgroundModal', false)
          this.$store.dispatch('setUpdatePlan', response.data)

          this.$toasted.success('Update Successfully!!!')
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.message = error.response.data.message
          } else {
            this.$toasted.error('Error happened!!!')
          }

          this.loading = false
        }.bind(this))
    }
  },

  computed: {
    showBackgroundModal () {
      return this.$store.getters.showBackgroundModal
    },

    showUpdateModal () {
      return this.$store.getters.showUpdateModal
    },

    dataPlan () {
      return this.dataPlanOrigin
    }
  },

  watch: {
    dataPlan () {
      this.namePlan = this.dataPlan.name
      this.typePlan = this.dataPlan.type
      this.frequencyPlan = this.dataPlan.frequency
    }
  }
}
</script>

<style lang="scss"></style>

<template>
  <div class="modal modal-xs fade text-left" v-show="showBackgroundModal && showCreatePlan" :class="{ 'in animated bounceIn': showBackgroundModal && showCreatePlan }" :style="{ display: 'block' }">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name-workout">Workout Day Name</label>

              <input type="text" id="name-workout" class="form-control" v-model="workoutName" />
            </div>

            <div class="form-group">
              <label for="workout-day">Pick a Workout Day</label>

              <select id="workout-day" class="form-control" v-model="workoutDay">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div class="form-group text-center m-b-0">
              <button class="btn btn-md btn-primary text-uppercase" @click.prevent="workoutCreate">Submit</button>

              <button class="btn btn-md btn-default text-uppercase" @click.prevent="closeModal">Cancel</button>
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
  name: 'AppWorkOutCreate',
  components: {},
  data () {
    return {
      workoutName: '',
      workoutDay: ''
    }
  },
  methods: {
    closeModal () {
      this.$store.dispatch('setShowBackgroundModal', false)
    },
    workoutCreate () {
      const params = {
        name: this.workoutName,
        week_day: this.workoutDay,
        plan_id: this.$route.params.id
      }

      axios.post(config.domainAddress + config.api.workout, params)
      .then(function (response) {
        const dataItem = {
          created_by: response.data.created_by,
          name: response.data.name,
          week_day: response.data.week_day
        }

        this.$store.dispatch('setShowBackgroundModal', false)
        this.$store.dispatch('setCreateWorkout', dataItem)
        this.workoutName = ''
        this.workoutDay = ''
      }.bind(this))
      .catch(function (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errContent = error.response.data.message
        } else {
          this.errContent = 'Error happened.'
        }
      }.bind(this))
    }
  },
  created () {
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

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';
  h1 {
    margin-bottom: $size-base * 20;
  }
</style>

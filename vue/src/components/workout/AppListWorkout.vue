<template>
  <div class="row" v-if="getListWorkout.length > 0">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <table class="table table-striped table-bordered table-hover list-plans text-center">
        <thead>
          <tr>
            <th>name</th>
            <th>week day</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="plan in getListWorkout">
            <td>
              <router-link :to="'workout/' + plan._id" class="text-primary text-capitalize" @click.native="updateNamePlan(plan.name)">{{ plan.name }}</router-link>
            </td>

            <td>{{ plan.week_day }}</td>

            <td>
              <a class="btn btn-sm btn-warning m-r-5">Edit</a>

              <a class="btn btn-sm btn-danger">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppListWorkout',
  components: {},
  data () {
    return {
    }
  },
  computed: {
    getListWorkout () {
      return this.$store.getters.listPlans
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>

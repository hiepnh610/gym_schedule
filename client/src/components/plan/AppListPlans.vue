<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <table class="table table-striped list-plans text-left">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>type</th>
            <th>frequency</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in getListPlans">
            <td class="text-center"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/15255-200.png" :alt="plan.name"></td>

            <td class="text-primary text-capitalize">{{ plan.name }}</td>

            <td><span>{{ plan.type }}</span></td>

            <td>
              <span v-if="plan.frequency > 1">{{ plan.frequency }} days/week</span>

              <span v-if="plan.frequency <= 1">{{ plan.frequency }} day/week</span>
            </td>

            <td class="text-center">
              <a class="btn btn-sm btn-warning">Edit</a>
            </td>

            <td class="text-center">
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
  name: 'AppListPlans',
  data () {
    return {
      listPlans: []
    }
  },
  computed: {
    getListPlans () {
      return this.$store.getters.listPlans
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
@import '../../assets/scss/mixins.scss';
  .list-plans {
    img {
      max-width: 32px;
    }
  }
</style>

<template>
  <div class="row">
    <div class="col-xs-12 col-md-6 col-md-offset-3">
      <div class="list-plans m-b-25 text-left" v-for="plan in getListPlans">
        <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/15255-200.png" :alt="plan.name">

        <h4>{{ plan.name }}</h4>

        <span>{{ plan.type }}</span>

        <span v-if="plan.frequency > 1">{{ plan.frequency }} days/week</span>

        <span v-if="plan.frequency <= 1">{{ plan.frequency }} day/week</span>
      </div>
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
@import '../../assets/scss/mixins.scss';
  .list-plans {
    border: 1px solid #eee;
    float: left;
    padding: 15px;
    width: 100%;
    @include border-radius(4px);

    img {
      float: left;
      margin-right: 15px;
      max-width: 100px;
    }
  }
</style>

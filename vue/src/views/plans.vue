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

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import config from '@/config'
import { Response, ParamsSignUp } from '@/util'

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
    createPlan () {
      this.$store.dispatch('setShowBackgroundModal', true)
      this.$store.dispatch('setShowCreateModal', true)
    }

    created () {
      axios
        .get(config.domainAddress + config.api.plans, {
          params: {
            id: this.$session.get('id')
          }
        })
        .then(function (response) {
          this.$store.dispatch('setListPlans', response.data)
        }.bind(this))
        .catch(function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            this.errContent = error.response.data.message
          } else {
            this.errContent = 'Error happened.'
          }
        }.bind(this))
    },

    computed: {
      listPlans () {
        return this.$store.getters.listPlans
      }
    }
  }
</script>

<style lang="scss"></style>

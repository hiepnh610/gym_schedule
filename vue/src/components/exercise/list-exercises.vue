<template>
  <div class="row">
    <div class="col-12 col-lg-8 offset-lg-2">
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

@Component
export default class ListExercises extends Vue {}
</script>

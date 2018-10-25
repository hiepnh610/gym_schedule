<template>
  <div class="note text-left">
    <div class="note-list border-bottom pl-3 pr-3 pb-3 pt-2">
      <div class="row">
        <div class="col-12">
          <p class="text-secondary mb-2"><small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptates rem amet praesentium obcaecati nisi, labore alias ratione architecto odit dignissimos maxime dolore magnam facere sequi. Quasi consequuntur a ut!</small></p>
        </div>

        <div class="col-6 text-left">
          <small class="smallest">08/10/2018</small>
        </div>

        <div class="col-6 text-right">
          <a href="#" class="text-warning smallest">Edit</a>

          <a href="#" class="text-danger smallest ml-3">Remove</a>
        </div>
      </div>
    </div>

    <div class="note-box p-3">
      <textarea-autosize
      class="form-control"
      ref="note"
      :min-height="60"
      :max-height="300">
      </textarea-autosize>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

@Component({
  components: {
  FontAwesomeIcon
  },
  })
export default class Note extends Vue {
}
</script>

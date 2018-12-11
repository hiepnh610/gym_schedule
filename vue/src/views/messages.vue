<template>
  <div class="fixed-bottom">
    <div class="col-12">
      <div class="form-group">
        <textarea class="form-control"></textarea>
      </div>

      <div class="form-group">
        <button class="btn btn-md btn-primary">Send</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

@Component
export default class Messages extends Vue {}
</script>

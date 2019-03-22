<template>
  <div>
    <div class="container">
      <ul>
        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, eligendi?</li>
      </ul>
    </div>

    <div class="fixed-bottom">
      <div class="container">
        <div class="form-group">
          <textarea class="form-control resize-none"></textarea>
        </div>

        <div class="form-group">
          <button class="btn btn-sm btn-primary m-0">Send</button>
        </div>
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

<template>
  <div id="message">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-9">
          <div class="bg-white p-2">
            <ul class="list-unstyled mb-0">
              <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, eligendi?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed-bottom">
      <div class="container">
        <div class="form-group">
          <textarea class="form-control"></textarea>
        </div>

        <div class="form-group">
          <button class="btn btn-sm btn-primary m-0">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Messages extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/_message.scss";
</style>


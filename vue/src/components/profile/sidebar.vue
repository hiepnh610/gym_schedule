<template>
  <aside class="sidebar p-3">
    <div class="sidebar-intro">
      <header>
        <font-awesome-icon icon="globe-americas" class="mr-2 small text-muted fa-fw" />

        Intro
      </header>

      <p class="text-muted mb-0"><small>If you pray for rain, you’ve got to deal with the mud, too.</small></p>
    </div>

    <hr class="my-2" />

    <div class="sidebar-information">
      <ul class="list-unstyled mb-0">
        <li>
          <font-awesome-icon icon="map-marker-alt" class="mr-2 small text-muted fa-fw" />

          <small>Lives in <span class="text-primary">Vietnam</span></small>
        </li>

        <li>
          <font-awesome-icon icon="calendar-alt" class="mr-2 small text-muted fa-fw" />

          <small>06/10/1992</small>
        </li>

        <li>
          <font-awesome-icon icon="rss" class="mr-2 small text-muted fa-fw" />

          <small>Followed by <span class="text-primary">5,000 people</span></small>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
  components: {
  FontAwesomeIcon,
  }
  })
export default class ProfileSidebar extends Vue {}
</script>

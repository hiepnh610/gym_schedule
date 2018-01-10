<template>
  <nav class="main-menu">
    <div class="container text-center">
      <div class="main-logo">
        <a href="/">
          Gym Schedule
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
</script>

<style lang="scss" scoped>
.main-menu {
  left: 0;
  padding: 20px 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  .main-logo {
    a {
      color: #fff;
      text-transform: uppercase;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
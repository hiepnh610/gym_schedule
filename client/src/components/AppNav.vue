<template>
  <nav class="main-menu">
    <div class="container text-center">
      <div class="row">
        <div class="col-xs-12 col-md-4 col-md-offset-4">
          <div class="main-logo">
            <h1>
              <a href="/">
                Gym Schedule
              </a>
            </h1>
          </div>
        </div>

        <div class="col-xs-12 col-md-2 pull-right m-t-5">
            <a href="sign-up" class="btn btn-sm btn-success">Sign Up</a>
            <a href="login" class="btn btn-sm btn-warning">Login</a>
        </div>
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
    h1 {
      margin: 0;

      a {
        color: #fff;
        text-transform: uppercase;

        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
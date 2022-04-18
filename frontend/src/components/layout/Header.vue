<template>
  <div style="padding: 0 30px; box-sizing: border-box; background-color: #343a40">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" @click="$router.push('/')">hehe</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click="$router.push('/dashboard')">대시보드</b-nav-item>
          <b-nav-item href="#" @click="$router.push('/workStatus')">작업현황</b-nav-item>
          <b-nav-item href="#" @click="$router.push('/history')">완료이력</b-nav-item>
          <b-nav-item href="#" @click="$router.push('/machine')">설비관리</b-nav-item>
          <b-nav-item href="#" @click="$router.push('/item')">품목관리</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form> -->

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right style="margin-left: 15px">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              {{ tokenUserName }}
            </template>
            <b-dropdown-item v-if="tokenUserRole == '관리자'" href="#" @click="$router.push('/admin')">
              Admin Profile</b-dropdown-item
            >
            <b-dropdown-item v-else-if="tokenUserRole == '작업자'" href="#" @click="$router.push('/user')">
              User Profile</b-dropdown-item
            >
            <b-dropdown-item href="#" @click="onClick('/auth/logout')">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedin() {
      let login = false
      if (this.$store.getters.TokenUser && this.$store.getters.TokenUser.id > 0) {
        login = true
      }

      return login
    },
    tokenUserName() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.name
    },
    tokenUserRole() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.role
    }
  },
  methods: {
    onClick(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
// import Router from 'vue-router'
export default {
  mounted() {
    window.addEventListener('unload', this.saveState)
    window.addEventListener('load', this.removeState)
  },
  methods: {
    saveState() {
      console.log('unload')
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },
    removeState() {
      console.log('load')
      sessionStorage.removeItem('state')
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

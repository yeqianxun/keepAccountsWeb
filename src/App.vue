<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :exclude="blackList">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      blackList: [],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100vh);
  overflow: hidden;
}
</style>

<template>
  <div id="app">
    <router-view/>
    <GlobalLoading v-if="showLoading"></GlobalLoading>
    <GlobalAlert :message="alertMsg" v-if="showAlert" @onClose="changeShowAlert(false)"></GlobalAlert>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  computed:{
    ...mapState(['showLoading','showLoading','showAlert','alertMsg'])
  },
  methods:{
    ...mapMutations(['changeShowAlert'])
  }
}
</script>

<style>
html,body{height:100%}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%
}
</style>

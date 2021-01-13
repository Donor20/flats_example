<template>
  <q-layout>
    <q-page-container view="lHh Lpr lFf" :style="styleObject">
      <div class="main-layout">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  computed: {
    styleObject () {
      return {
        height: this.$q.screen.height + 'px'
      }
    }
  }
}
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}
.scrollArea {
  flex: 1;
  width: 100%;
  overflow: auto;
}
body {
  background-color:  #F8F8F8;
  font-family: GothamPro,serif;
  font-size: 12px;
  line-height: 28px;
  font-weight: bold;
}
</style>

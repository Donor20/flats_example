<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style>
body {
  background-color:  #F8F8F8;
  font-family: GothamPro,serif;
  font-size: 12px;
  line-height: 28px;
  font-weight: bold;
}
</style>

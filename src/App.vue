<template>
  <v-app>
    <v-content>
      <v-container fluid class="container">
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('getData');
  },
};
</script>

<style scoped>
.container {
  max-width: 1600px;
}
</style>

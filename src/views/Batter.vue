<template>
  <div>
    <v-breadcrumbs divider="/" :items="breadcrumbItems" />
    <div class="mx-6">
      <h2>{{ player }}</h2>
      <div class="font-weight-bold caption grey--text text-uppercase">Batter</div>
    </div>
    <div class="pa-4">
      <batted-ball-table :loading="loading" :batted-ball-data="filteredData" />
    </div>
  </div>
</template>

<script>
import BattedBallTable from '@/components/BattedBallTable';
import { mapState } from 'vuex';

export default {
  components: {
    BattedBallTable,
  },
  computed: {
    ...mapState(['battedBallData', 'loading']),
    filteredData () {
      return this.battedBallData.filter(bbd => bbd.batterId === this.$route.params.batterId);
    },
    player () {
      const player = this.filteredData.find(bbd => bbd.batterId === this.$route.params.batterId);
      return player ? player.batter : '';
    },
    breadcrumbItems () {
      return [
        { text: 'All Data', to: '/' },
        { text: this.player, disabled: true },
      ];
    },
  },
};
</script>

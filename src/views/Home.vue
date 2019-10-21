<template>
  <div>
    <h2 class="mx-6 mt-4">All Data</h2>
    <div class="pa-4">
      <batted-ball-table :loading="loading" :batted-ball-data="battedBallData" />
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
  },
};
</script>

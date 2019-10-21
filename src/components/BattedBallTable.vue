<template>
  <div>
    <v-card class="px-2">
      <v-card-title class="align-center mb-3">
        Batted Ball Data
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          class="ma-0 pa-0"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :items="battedBallData"
        :headers="headers"
        :search="search"
        :loading="loading"
        loading-text="Loading Data..."
      >
        <template v-slot:item.batter="batter">
          <router-link :to="`/batter/${batter.item.batterId}`">{{ batter.value }}</router-link>
        </template>
        <template v-slot:item.pitcher="pitcher">
          <router-link :to="`/pitcher/${pitcher.item.pitcherId}`">{{ pitcher.value }}</router-link>
        </template>
        <template v-slot:item.launchAngle="{ value }">{{ value | formatDecimal }}</template>
        <template v-slot:item.exitSpeed="{ value }">{{ value | formatDecimal }}</template>
        <template v-slot:item.exitDirection="{ value }">{{ value | formatDecimal }}</template>
        <template v-slot:item.hitDistance="{ value }">{{ value | formatDecimal }}</template>
        <template v-slot:item.hangTime="{ value }">{{ value | formatDecimal }}</template>
        <template v-slot:item.hitSpinRate="{ value }">{{ value | formatDecimal }}</template>
        <template v-slot:item.playOutcome="{ value }">{{ value | formatPlayOutcome }}</template>
        <template v-slot:item.videoLink="matchup">
          <v-btn icon text @click="openVideoDialog(matchup)">
            <v-icon>mdi-video</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <video-player-dialog ref="videoPlayerDialog" />
  </div>
</template>

<script>
import VideoPlayerDialog from '@/components/VideoPlayerDialog';
import numeral from 'numeral';

export default {
  components: {
    VideoPlayerDialog,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    battedBallData: {
      type: Array,
      default: () => [],
    },
  },
  filters: {
    formatDecimal (value) {
      try {
        const num = parseFloat(value);
        return Number.isNaN(num) ? '-' : numeral(num).format('0,0.0');
      } catch (error) {
        return '-';
      }
    },
    formatPlayOutcome (value) {
      if (!value) {
        return '-';
      }

      const cleanValue = value.trim().toLowerCase();

      switch (cleanValue) {
        case 'out':
          return 'OUT';
        case 'single':
          return '1B';
        case 'double':
          return '2B';
        case 'triple':
          return '3B';
        case 'homerun':
          return 'HR';
        case 'error':
          return 'E';
        case 'sacrifice':
          return 'SAC';
        case 'fielderschoice':
          return 'FC';
      }

      return '-';
    },
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'BATTER', value: 'batter' },
        { text: 'PITCHER', value: 'pitcher' },
        { text: 'GAME DATE', value: 'gameDate', filterable: false },
        { text: 'PLAY OUTCOME', value: 'playOutcome', filterable: false, sortable: false },
        { text: 'LAUNCH ANGLE (°)', value: 'launchAngle', filterable: false, align: 'right', class: 'pr-0' },
        { text: 'EXIT SPEED (MPH)', value: 'exitSpeed', filterable: false, align: 'right', class: 'pr-0' },
        { text: 'EXIT DIRECTION (°)', value: 'exitDirection', filterable: false, align: 'right', class: 'pr-0' },
        { text: 'HIT DISTANCE (FT)', value: 'hitDistance', filterable: false, align: 'right', class: 'pr-0' },
        { text: 'HIT SPIN RATE (RPM)', value: 'hitSpinRate', filterable: false, align: 'right', class: 'pr-0' },
        { text: 'HANG TIME (S)', value: 'hangTime', filterable: false, align: 'right', class: 'pr-0' },
        { text: 'VIDEO', value: 'videoLink', filterable: false, sortable: false, align: 'center' },
      ],
    };
  },
  methods: {
    openVideoDialog (matchup) {
      this.$refs.videoPlayerDialog.open(matchup);
    },
  },
};
</script>

<template>
  <v-dialog v-model="isOpen" max-width="1000" eager>
    <v-card>
      <v-card-title class="headline grey lighten-2 justify-space-between" primary-title>
        <div>
          <router-link :to="`/pitcher/${matchup.pitcherId}`">
            <span @click="isOpen = false">{{ matchup.pitcher }}</span>
          </router-link>
          <div class="font-weight-bold caption grey--text text-uppercase">Pitcher</div>
        </div>
        <div class="d-flex align-end flex-column">
          <router-link :to="`/batter/${matchup.batterId}`">
            <span @click="isOpen = false">{{ matchup.batter }}</span>
          </router-link>
          <div class="font-weight-bold caption grey--text text-uppercase">Batter</div>
        </div>
      </v-card-title>
      <vue-plyr ref="videoPlayer">
        <video poster="poster.png" :src="matchup.videoLink" />
      </vue-plyr>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="isOpen = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false,
      matchup: {},
    };
  },
  mounted () {
    this.$refs.videoPlayer.player.on('canplay', () => this.startVideo());
  },

  methods: {
    open (matchup) {
      this.matchup = matchup.item;
      this.isOpen = true;
    },
    startVideo () {
      if (this.isOpen) {
        this.$refs.videoPlayer.player.play();
      }
    },
  },
  watch: {
    isOpen (newValue) {
      if (!newValue) {
        this.$refs.videoPlayer.player.stop();
      }
    },
  },
};
</script>

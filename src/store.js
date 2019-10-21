import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import * as d3 from 'd3';
import data from '@/assets/BattedBallData.csv';

export default new Vuex.Store({
  state: {
    loading: false,
    battedBallData: [],
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setBattedBallData(state, battedBallData) {
      state.battedBallData = battedBallData;
    },
  },
  actions: {
    async getData({ commit }) {
      commit('setLoading', true);
      const parsedData = await d3.csv(data);
      const mappedData = parsedData.map(item => ({
        batterId: item.BATTER_ID,
        batter: item.BATTER,
        pitcherId: item.PITCHER_ID,
        pitcher: item.PITCHER,
        gameDate: item.GAME_DATE,
        launchAngle: item.LAUNCH_ANGLE,
        exitSpeed: item.EXIT_SPEED,
        exitDirection: item.EXIT_DIRECTION,
        hitDistance: item.HIT_DISTANCE,
        hangTime: item.HANG_TIME,
        hitSpinRate: item.HIT_SPIN_RATE,
        playOutcome: item.PLAY_OUTCOME,
        videoLink: item.VIDEO_LINK,
      }));
      commit('setBattedBallData', mappedData);
      commit('setLoading', false);
    },
  },
});

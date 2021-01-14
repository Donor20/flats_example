export default {
  namespaced: true,
  state: {
    ranges: {
      porch: {
        key: 'porch',
        label: 'ЭТАЖ',
        min: 0,
        max: 100,
        value: { min: 0, max: 100 }
      },
      square: {
        key: 'square',
        label: 'ПЛОЩАДЬ, м²',
        min: 0,
        max: 1000,
        value: { min: 0, max: 1000 }
      },
      price: {
        key: 'price',
        label: 'СТОИМОСТЬ, млн. р.',
        min: 0.0,
        max: 100.0,
        value: { min: 0.0, max: 100.0 }
      }
    }
  },
  getters: {
    ranges: state => {
      return Object.values(state.ranges)
    }
  },
  mutations: {
    setMinRangeValue (state, { key, value }) {
      state.ranges[key].value.min = value
    },
    setMaxRangeValue (state, { key, value }) {
      state.ranges[key].value.max = value
    }
  },
  actions: {
    setMinRangeValue ({ state, commit, rootState }, { key, value }) {
      commit('setMinRangeValue', { key, value })
    },
    setMaxRangeValue ({ state, commit, rootState }, { key, value }) {
      commit('setMinRangeValue', { key, value })
    }
    // reset({ state, commit, rootState }, except = []) {
    //   for (let settingKey in state.list) {
    //     if (!except.includes(settingKey)) {
    //       commit("init", {
    //         key: settingKey,
    //         value: state.list[settingKey].defaultValue
    //       });
    //       ChatDb.then(db => db.deleteSetting(settingKey));
    //       LocalStorage.remove(settingKey);
    //     }
    //   }
    // }
  }
}

<template>
  <div class="rangeFilter">
    <div class="rangeFilterName row">
          <span v-for="(t, index) in rangeFilter.label.split('²')" :key="index">
            <template v-if="index === 0">{{t}}</template>
            <template v-else><span class="small-number-2">2</span>{{t}}</template>
          </span>
    </div>
    <div class="row">
      <q-input class="rangeFilterInput"
             :value="rangeFilter.value.min"
             @input="onInputMin($event)"
      />
      <span class="dash">-</span>
      <q-input class="rangeFilterInput"
             :value="rangeFilter.value.max"
             @input="onInputMax($event)"
      />
    </div>
    <q-range class="rangeFilterRange"
             v-model="rangeFilter.value"
             :min="rangeFilter.min"
             :max="rangeFilter.max"
    />
  </div>
</template>

<script>
export default {
  name: 'range-filter',
  props: ['rangeFilter'],
  methods: {
    onInputMin (value) {
      const key = this.rangeFilter.key
      this.$store.dispatch('filters/setMinRangeValue', { key, value })
    },
    onInputMax (value) {
      const key = this.rangeFilter.key
      this.$store.dispatch('filters/setMaxRangeValue', { key, value })
    }
  }
}
</script>

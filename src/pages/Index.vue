<template>
  <q-page class="page flats-page">
    <h4 class="title">Lorem ipsum dolor sit</h4>
    <div class="filters-group row">
      <div>
        <div class="filter-title">КОМНАТЫ</div>
        <div class="rooms-filter-group row">
          <q-btn v-for="ro in roomsOptions" :key="ro.value"
                 @click="roomsFilter === ro.value ? roomsFilter = null : roomsFilter = ro.value"
                 class="no-shadow" :class="{ 'active-btn': roomsFilter === ro.value }"
                 unelevated no-caps
          >{{ro.label}}</q-btn>
        </div>
      </div>
      <div class="range-filters" v-for="rangeFilter in rangeFilters" :key="rangeFilter.key">
        <div class="filter-title row">
          <span v-for="(t, index) in rangeFilter.label.split('²')" :key="index">
            <template v-if="index === 0">{{t}}</template>
            <template v-else><span class="small-number-2">2</span>{{t}}</template>
          </span>
        </div>
        <div class="row">
          <input class="range-filter-input" v-model="rangeFilter.value.min">
          <span class="dash">-</span>
          <input class="range-filter-input" v-model="rangeFilter.value.max">
        </div>
        <q-range class="range-filter-range"
          v-model="rangeFilter.value"
          :min="rangeFilter.min"
          :max="rangeFilter.max"
        />
      </div>
      <div class="success-btn">
        <q-btn @click="getFlats" class="active-btn" unelevated>
          Применить
        </q-btn>
        <div class="refresh-filters" @click="resetFilters">
          <span>сбросить фильтр</span>
        </div>
      </div>
    </div>
    <q-scroll-area class="scrollArea">
      <div class="row rooms-cards-group">
        <flat-card v-for="flat in flats" :key="flat.building_id + '_' + flat.id"
                   class="my-card" :flat="flat"
        />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import api from '../services/api'
import FlatCard from '../components/flat-card'

export default {
  name: 'PageIndex',
  components: { FlatCard },
  data () {
    return {
      flats: [],
      roomsFilter: null,
      roomsOptions: [
        { label: 'S', value: '?' },
        { label: '1к', value: 1 },
        { label: '2к', value: 2 },
        { label: '3к', value: 3 }
      ],
      rangeFilters: [{
        key: 'porch',
        label: 'ЭТАЖ',
        min: 0,
        max: 100,
        value: { min: 0, max: 100 }
      }, {
        key: 'square',
        label: 'ПЛОЩАДЬ, м²',
        min: 0,
        max: 1000,
        value: { min: 0, max: 1000 }
      }, {
        key: 'price',
        label: 'СТОИМОСТЬ, млн. р.',
        min: 0.0,
        max: 100.0,
        value: { min: 0.0, max: 100.0 }
      }]
    }
  },
  methods: {
    resetFilters () {
      this.roomsFilter = null
      for (const rangeFilter of this.rangeFilters) {
        rangeFilter.value.min = rangeFilter.min
        rangeFilter.value.max = rangeFilter.max
      }
      this.getFlats()
    },
    getFlats () {
      const filters = { rooms: this.roomsFilter }
      for (const rangeFilter of this.rangeFilters) {
        filters[rangeFilter.key] = rangeFilter.value
      }
      return api.getFlats(filters).then(flats => {
        this.flats = flats
      })
    }
  },
  mounted () {
    this.getFlats()
  }
}
</script>

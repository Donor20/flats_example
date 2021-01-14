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
      <range-filter v-for="rangeFilter in rangeFilters" :key="rangeFilter.key"
                    :rangeFilter="rangeFilter"
      />
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
import RangeFilter from '../components/range-filter'

export default {
  name: 'PageIndex',
  components: { RangeFilter, FlatCard },
  data () {
    return {
      flats: [],
      roomsFilter: null,
      roomsOptions: [
        { label: 'S', value: '?' },
        { label: '1к', value: 1 },
        { label: '2к', value: 2 },
        { label: '3к', value: 3 }
      ]
    }
  },
  computed: {
    rangeFilters () {
      return this.$store.getters['filters/ranges']
    }
  },
  methods: {
    resetFilters () {
      this.roomsFilter = null
      this.$store.dispatch('filters/resetRanges')
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

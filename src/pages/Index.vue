<template>
  <q-page class="page">
    <h4 style="text-transform: uppercase; text-align: center;">Lorem ipsum dolor sit</h4>
    <div class="row full-width">
      <div style="margin-right: 60px">
        <div>КОМНАТЫ</div>
        <div class="rooms-filter-group row q-gutter-xs">
          <q-btn v-for="ro in roomsOptions" :key="ro.value"
                 @click="roomsFilter === ro.value ? roomsFilter = null : roomsFilter = ro.value"
                 class="no-shadow"
                 :class="{ 'active-btn': roomsFilter === ro.value }"
                 unelevated no-caps style="width: 48px"
          >{{ro.label}}</q-btn>
        </div>
      </div>
      <div v-for="rangeFilter in rangeFilters" :key="rangeFilter.key"
           style="margin-right: 60px"
      >
        {{rangeFilter.label}}
        <div class="row">
          <q-input v-model="rangeFilter.value.min" outlined color="black" />
          <div class="dash" style="width: 15px;">-</div>
          <q-input v-model="rangeFilter.value.max" outlined color="black" />
        </div>
        <q-range
          v-model="rangeFilter.value"
          :min="rangeFilter.min"
          :max="rangeFilter.max"
          style="color: #70D24E"
        />
      </div>
      <div style="padding-top: 28px; width: 201px;">
        <q-btn @click="getFlats"
               class="active-btn" style="width: 201px;" unelevated>
          Применить
        </q-btn>
        <a @click="resetFilters"
          href="#"
          style="text-transform: uppercase;"
        >сбросить фильтр</a>
      </div>
    </div>
    <q-scroll-area class="scrollArea">
      <div class="row q-gutter-md">
        <flat-card v-for="flat in flats" :key="flat.building_id + '_' + flat.id"
                   class="my-card"
                   :flat="flat"
                   style="width: 270px; height: 365px;"
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

<style lang="scss">
.q-field {
  width: 80px;
  .q-field__control {
    height: 40px;
    border-color: #EBEBEB;
    text-align-last: center;
    font-size: 16px;
  }
  background-color: white;
}

</style>

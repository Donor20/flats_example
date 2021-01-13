<template>
  <q-page class="flex flex-center">
    <div class="row">
      <flat-card v-for="flat in flats" :key="flat.building_id + '_' + flat.id"
                 class="my-card col-3"
                 :flat="flat"
      />
    </div>
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
      flats: []
    }
  },
  methods: {
    getFlats () {
      return api.getFlats().then(flats => {
        this.flats = flats
      })
    }
  },
  mounted () {
    this.getFlats()
  }
}
</script>

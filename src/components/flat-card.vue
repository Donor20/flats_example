<template>
  <q-card>
    <q-card-section>
      {{flat}}
      <div class="row">
        <div style="opacity: 50%">{{flat.porch}} этаж</div>
        <div style="flex: 1;"></div>
        {{flat.rooms}} {{getRoomWord(flat.rooms)}} - {{flat.square}} м²
      </div>
      <div class="items-center" style="border: 1px solid #EBEBEB;border-radius: 5px; width: 250px; height: 250px;">
        <q-img :src="`${flat.plan}`"></q-img>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'flat-card',
  props: ['flat'],
  data () {
    return { }
  },
  methods: {
    getRoomWord (cnt) {
      const getWord = (n, w1, w2, w5) => {
        let tmp = n % 100
        if (tmp >= 5 && tmp <= 20) return w5
        tmp = tmp % 10
        if (tmp === 1) return w1
        if (tmp >= 2 && tmp <= 4) return w2
        return w5
      }
      return getWord(cnt, 'комната', 'комнаты', 'комнат')
    }
  }
}
</script>

<style scoped>

</style>

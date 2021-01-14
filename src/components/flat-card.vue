<template>
  <q-card class="flat-card no-shadow">
    <q-card-section>
      <div class="row">
        <div style="opacity: 50%">{{flat.porch}} этаж</div>
        <div class="row q-ml-auto">
          {{flat.rooms}}
          {{roomWord}}
          <div class="dash" style="width: 25px;">-</div>
          {{flat.square}} м²
        </div>
      </div>
      <div class="flat-plan items-center"
           style="border: 1px solid #EBEBEB; border-radius: 5px;"
      >
        <div class="q-ml-auto" style="border-left: 1px solid #EBEBEB; border-bottom: 1px solid #EBEBEB; border-bottom-left-radius: 5px; width: 62px; height: 30px;">
          № {{flat.number}}
        </div>
        <q-img class="flat-plan-img" :src="flat.plan"></q-img>
      </div>
      <div class="text-right" style="font-size: 20px; font-weight: bold;">{{formattedPrice}}р.</div>
      <div class="text-right" style="opacity: 50%; font-weight: bold;">
        {{formattedPriceForSquare}} р. за м<span style="font-size: 8px; vertical-align: top;">2</span>
      </div>
      <q-btn class="active-btn full-width" unelevated>
        Подробнее
      </q-btn>
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
  computed: {
    roomWord () {
      const getWord = (n, w1, w2, w5) => {
        let tmp = n % 100
        if (tmp >= 5 && tmp <= 20) return w5
        tmp = tmp % 10
        if (tmp === 1) return w1
        if (tmp >= 2 && tmp <= 4) return w2
        return w5
      }
      return getWord(this.flat.rooms, 'комната', 'комнаты', 'комнат')
    },
    formattedPrice () {
      return this.getFormattedNumber(this.flat.price)
    },
    formattedPriceForSquare () {
      return this.getFormattedNumber(this.flat.price)
    }
  },
  methods: {
    getFormattedNumber (number) {
      return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
  }
}
</script>

<style scoped lang="scss">
.flat-card {
  .flat-plan {
    width: 250px;
    height: 250px;
  }
  .flat-plan-img {
    width: 230px;
    margin: auto;
  }
  .active-btn {
    display: none;
  }
}
.flat-card:hover {
  .flat-plan-img {
    width: 186px;
  }
  .flat-plan {
    height: 200px;
  }
  .active-btn {
    display: inline-flex;
  }
}
</style>

<template>
  <a href="#" class="basket-size">
    <span v-if="basket.length > 0">{{ basket.length }}</span>
    <img 
      src="@/assets/svg/basket/basket.svg" 
      alt="basket" 
      v-else 
    />
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      basket: 'data/getBasket'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './BasketSize.scss';
</style>
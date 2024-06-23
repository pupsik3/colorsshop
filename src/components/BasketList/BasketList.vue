<template>
	<div class="basket-list">
		<div class="basket-list__header">
			<p>{{ basket.length }} товар{{setEnding}}</p>
			<a 
				href="#" 
				class="basket-list__clear" 
				@click="clearBasket"
			>очистить список</a>
		</div>
		<section class="basket-list__list">
			<BasketItem 
				v-for="item in basket"
				:key="item.id"
				:item="item"
				@changeProducts="$emit('changeProducts', item)"
			/>
		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	methods: {
		...mapActions({
			clearBasket: 'data/clearBasket'
		})
	},

	computed: {
		...mapGetters({
			basket: 'data/getBasket'
		}),

		setEnding() {
      switch(this.basket.length) {
        case 1:
          return ''
        case 2:
        case 3:
        case 4:
          return 'а'
        default:
          return 'ов'
      }
    }
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './BasketList.scss';
</style>
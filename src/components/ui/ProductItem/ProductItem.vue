<template>
	<div class="product">
		<div class="product__img">
			<img :src="product.img" alt="product" />
		</div>
		<div class="product__info">
			<h4 class="product__title">{{ product.name }}</h4>
			<p class="product__price">{{ product.price.split('.')[0] }} ₽</p>
			<button 
				:class="['product__add', {
					'product__add--added': haveInBasket
				}]" 
				@click="addBasket(product)"
			>
				<img 
					src="@/assets/svg/plus.svg" 
					alt="add"
					:class="['products__button', {'product__button--delete': haveInBasket}]"
				/>
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	props: {
		product: {
			type: Object,
			required: true
		}
	},

	methods: {
		...mapActions({
			addBasket: 'data/addBasket'
		})
	},

	computed: {
		...mapGetters({
			basket: 'data/getBasket'
		}),

		haveInBasket() {
			return this.basket.find(item => item.id == this.product.id) && true || false
		}
	},

	name: 'ProductItem'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './ProductItem.scss';
</style>
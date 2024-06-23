<template>
	<div :class="['basket-item', {
		'basket-item--deleting': deleting
	}]">
		<div :class="['basket-item__general', {
			'basket-item__general--empty': !haveValid
		}]">
			<div class="basket-item__img">
				<img :src="item.img" alt="product" />
			</div>
			<div class="basket-item__info">
				<h4 class="basket-item__title">{{ item.name }}</h4>
				<p class="basket-item__price">{{ item.price.split('.')[0] }} ₽</p>
			</div>
		</div>
		<div class="basket-item__dop">
			<div :class="['basket-item__count', {
				'basket-item__count--empty': !haveValid
			}]">
				<button 
					class="basket-item__btn"
					@click="decrement(item)"
					:disabled="!haveValid"
				>
					<img src="@/assets/svg/basket/minus.svg" alt="decrement" />
				</button>
				<p class="basket-item__length">{{ item.length }}</p>
				<button 
					class="basket-item__btn"
					@click="increment(item)"
					:disabled="!haveValid"
				>
					<img src="@/assets/svg/basket/plus.svg" alt="increment" />
				</button>
			</div>
			<div class="basket-item__action">
				<img 
					src="@/assets/svg/cross.svg" 
					alt="delete" 
					class="basket-item__action-delete"
					@click="deleteProductFun" 
					tabindex="0"
					@keyup.enter="deleteProductFun"
					v-if="haveValid"
				/>
				<img 
					src="@/assets/svg/basket/change.svg" 
					alt="change" 
					class="basket-item__action-change" 
					@click="$emit('changeProducts', item)"
					tabindex="0"
					@keyup.enter="$emit('changeProducts', item)"
					v-else
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
		return {
			deleting: false
		}
	},

	props: {
		item: {
			type: Object,
			required: true
		}
	},

	methods: {
		...mapActions({
			increment: 'data/incrementBasketItem',
			decrement: 'data/decrementsBasketItem',
			deleteProduct: 'data/addBasket'
		}),

		deleteProductFun() {
			this.deleting = true

			setTimeout(() => {
				this.deleteProduct(this.item)
			}, 400)
		}
	},

	computed: {
		...mapGetters({
			basket: 'data/getBasket'
		}),

		haveValid() {
			return this.item.types.includes('have')
		}
	},

	name: 'BasketItem'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './BasketItem.scss';
</style>
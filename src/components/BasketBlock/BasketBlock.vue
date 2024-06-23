<template>
	<div :class="['basket', {
			'basket--close':closingBasket
		}]" 
		@click="closeBasketFun"
	>
		<div :class="['basket__wrapper', {
				'basket__wrapper--close': closingBasket
			}]" 
			@click.stop
		>
			<div 
				class="basket__close" 
				@click="closeBasketFun" 
				tabindex="0" 
				@keyup.enter="closeBasketFun"
			>
				<img src="@/assets/svg/cross.svg" alt="close" />
			</div>
			<div class="basket__info">
				<h4 class="basket__title">Корзина</h4>
				<BasketList 
					class="basket__list" 
					v-if="basket.length > 0 && !statusSubmit && !loadingSubmit" 
					@changeProducts="changeProducts"
				/>
			</div>

			<div 
				class="basket__result" 
				v-if="basket.length > 0 && !statusSubmit && !loadingSubmit"
			>
				<div class="basket__result-info">
					<p class="basket__result-title">Итого</p>
					<h4 class="basket__result-price">{{ finalCost.toLocaleString() }}₽</h4>
				</div>
				<button 
					class="basket__result-submit" 
					@click="submit" 
					:disabled="validProducts && basket"
				>
				Оформить заказ</button>
			</div>

			<h3 class="basket__empty" v-else-if="statusSubmit">Заказ отправлен</h3>

			<img 
				src="@/assets/gif/loading.gif" 
				alt="loading" 
				class="basket__loading" 
				v-else-if="loadingSubmit" 
			/>

			<h3 class="basket__empty" v-else>Корзина пуста</h3>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import BasketList from '@/components/BasketList/BasketList'

export default {
	components: {
		BasketList
	},

	data() {
		return {
			closingBasket: false
		}
	},

	methods: {
		...mapActions({
			closeBasket: 'data/toggleShowBasket',
			necessaryFilters: 'data/validFiltersEmptyProduct',
			submit: 'data/submitBasket'
		}),

		closeBasketFun() {
			this.closingBasket = true

			setTimeout(() => {
				this.closeBasket()
			}, 600);
		},

		changeProducts(item) {
			this.closingBasket = true

			setTimeout(() => {
				this.necessaryFilters(item)
				this.closeBasket()
			}, 500);
		}
	},

	computed: {
		...mapGetters({
			basket: 'data/getBasket',
			finalCost: 'data/getFinalCost',
			statusSubmit: 'data/getStatusSubmit',
			loadingSubmit: 'data/getLoadingSubmit'
		}),

		validProducts() {
			return this.basket.find(item => {
				return !item.types.includes('have')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './BasketBlock.scss';
</style>
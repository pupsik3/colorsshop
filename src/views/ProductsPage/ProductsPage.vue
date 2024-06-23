<template>
	<LoadingBlock v-if="loading" />

	<div class="products-page" v-else>
		<HeaderBlock />
		<Slider class="products-page__slider" />

		<div class="products-page__content">
			<FiltresBlock :class="['products-page__filters', 
				{'products-page__filters-mobile': showFiltres}]"
			/>
			<ProductsBlock />
		</div>

		<FooterBlock />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HeaderBlock from '@/components/HeaderBlock/HeaderBlock'
import Slider from '@/components/Slider/Slider'
import FiltresBlock from '@/components/FiltresBlock/FiltresBlock'
import ProductsBlock from '@/components/ProductsBlock/ProductsBlock'
import FooterBlock from '@/components/FooterBlock/FooterBlock'
import LoadingBlock from '@/components/LoadingBlock/LoadingBlock'
import BasketBlock from '@/components/BasketBlock/BasketBlock'

export default {
	components: {
    HeaderBlock,
    Slider,
    FiltresBlock,
    ProductsBlock,
    FooterBlock,
    LoadingBlock,
    BasketBlock
},

	mounted() {
		this.allProductsGet()
	},

	methods: {
		...mapActions({
			allProductsGet: 'data/allProductsGet'
		})
	},

	computed: {
		...mapGetters({
			loading: 'data/getLoading',
			showFiltres: 'data/getShowFilters'
		})
	}
}
</script>

<style lang="scss" scoped>
@import './ProductsPage.scss';
</style>
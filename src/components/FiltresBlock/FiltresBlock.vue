<template>
	<div class="filtres" @click="closeModal">
		<section :class="['filtres__back', {
				'filtres__back--close': closingModal
			}]" 
			@click.stop
		>
			<div class="filtres__back-close" @click="closeModal">
				<span></span>
			</div>
			<div class="filtres__item">
				<input type="checkbox" id="new" name="new" class="filtres__input" />
				<label :class="['filtres__label', {
						'filtres__label--active': filters.includes('new')
					}]" 
					for="new" 
					@click="addFilterItem('new')"
					@keyup.enter="addFilterItem('new')"
					tabindex="0"
				>
					<div class="filtres__condition">
						<span class="filtres__circle"></span>
					</div>
					<p class="filtres__name">Новинки</p>
				</label>
			</div>

			<div class="filtres__item">
				<input type="checkbox" id="have" name="have" class="filtres__input" />
				<label :class="['filtres__label', {
						'filtres__label--active': filters.includes('have')
					}]" 
					for="have"
					@click="addFilterItem('have')"
					@keyup.enter="addFilterItem('have')"
					tabindex="0"
				>
					<div class="filtres__condition">
						<span class="filtres__circle"></span>
					</div>
					<p class="filtres__name">Есть в наличии</p>
				</label>
			</div>

			<div class="filtres__item">
				<input type="checkbox" id="contract" name="contract" class="filtres__input" />
				<label :class="['filtres__label', {
						'filtres__label--active': filters.includes('contract')
					}]" 
					for="contract" 
					@click="addFilterItem('contract')"
					@keyup.enter="addFilterItem('contract')"
					tabindex="0"
				>
					<div class="filtres__condition">
						<span class="filtres__circle"></span>
					</div>
					<p class="filtres__name">Контрактные</p>
				</label>
			</div>

			<div class="filtres__item">
				<input type="checkbox" id="exclusive" name="exclusive" class="filtres__input" />
				<label :class="['filtres__label', {
						'filtres__label--active': filters.includes('exclusive')
					}]" 
					for="exclusive" 
					@click="addFilterItem('exclusive')"
					@keyup.enter="addFilterItem('exclusive')"
					tabindex="0"
				>
					<div class="filtres__condition">
						<span class="filtres__circle"></span>
					</div>
					<p class="filtres__name">Эксклюзивные</p>
				</label>
			</div>

			<div class="filtres__item">
				<input type="checkbox" id="sale" name="sale" class="filtres__input" />
				<label :class="['filtres__label', {
						'filtres__label--active': filters.includes('sale')
					}]" 
					for="sale" 
					@click="addFilterItem('sale')"
					@keyup.enter="addFilterItem('sale')"
					tabindex="0"
				>
					<div class="filtres__condition">
						<span class="filtres__circle"></span>
					</div>
					<p class="filtres__name">Распродажа</p>
				</label>
			</div>
		</section>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			closingModal: false
		}
	},

	methods: {
		...mapActions({
			toggleFilters: 'data/toggleFilters',
			addFilterItem: 'data/addFilterItem'
		}),

		closeModal() {
			if (window.innerWidth <= 1200) {
				this.closingModal = true

				setTimeout(() => {
					this.toggleFilters()
					this.closingModal = false
				}, 300)
			}
		}
	},

	computed: {
		...mapGetters({
			filters: 'data/getFilterList'
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './FiltresBlock.scss';
</style>
<template>
	<header class="header">
		<BasketBlock v-if="showBasket"/>
		<ModalHeader 
			class="header__modal" 
			v-if="showModal"
			@showModal="toggleModal"
		/>
		<img 
			src="@/assets/svg/open-modal.svg" 
			alt="open" 
			class="header__open"
			@click="toggleModal"
		/>
		<div class="header__left">
			<img 
				src="@/assets/svg/logo.svg" 
				alt="logo" 
				class="header__item header__logo" 
			/>
			<NavBar class="header__item header__nav"/>
		</div>

		<div class="header__right">
			<HeaderCall class="header__item header__call"/>
			<div class="header__item header__menu">
				<HeaderMenu class="header__menu-list"/>
				<BasketSize @click="openBasket"/>
			</div>
		</div>
	</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import NavBar from '@/components/NavBar/NavBar'
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu'
import BasketSize from '@/components/BasketSize/BasketSize'
import ModalHeader from '@/components/ModalHeader/ModalHeader'
import HeaderCall from '@/components/HeaderCall/HeaderCall'
import BasketBlock from '@/components/BasketBlock/BasketBlock'

export default {
	components: {
		NavBar,
		HeaderMenu,
		BasketSize,
		ModalHeader,
		HeaderCall,
		BasketBlock
	},

	data() {
		return {
			showModal: false
		}
	},

	methods: {
		...mapActions({
			openBasket: 'data/toggleShowBasket'
		}),
		
		toggleModal() {
			this.showModal = !this.showModal
			
			if (this.showModal)
				document.documentElement.style.overflow = 'hidden'
			else
				document.documentElement.style.overflow = 'auto'
		}
	},

	computed: {
		...mapGetters({
			showBasket: 'data/getShowBasket'
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './HeaderBlock.scss';
</style>
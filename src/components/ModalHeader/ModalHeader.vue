<template>
	<div :class="['modal-header', {
		'modal-header--close': closeModal
	}]">
		<img 
			src="@/assets/svg/cross.svg" 
			alt="close" 
			class="modal-header__close"
			@click="closeModalFun"
		/>
		<HeaderMenu class="modal-header__menu"/>
		<NavBar class="modal-header__nav" />
		<HeaderCall class="modal-header__call"/>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar'
import HeaderCall from '@/components/HeaderCall/HeaderCall'
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu'

export default {
	components: {
		NavBar,
		HeaderCall,
		HeaderMenu
	},

	data() {
		return {
			closeModal: false
		}
	},		

	methods: {
		closeModalFun() {
			this.closeModal = true

			setTimeout(() => {
				this.$emit('showModal')
			}, 300)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './ModalHeader.scss';
</style>
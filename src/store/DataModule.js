import axios from 'axios'

const localBasket = window.localStorage.getItem('basket')

export const DataModule = {
	state: () => ({
		allProducts: null,
		loading: true,
		showFilters: false,
		filterList: [],
		showBasket: false,
		basket: localBasket ? JSON.parse(localBasket) : [],
		finalCost: 0,
		successSubmit: null,
		loadingSubmit: false
	}),

	getters: {
		getAllProducts(state) {
			return state.allProducts
		},

		getLoading(state) {
			return state.loading
		},

		getShowFilters(state) {
			return state.showFilters
		},

		getFilteredProducts(state) {
			if (state.filterList.length > 0) {
				return state.allProducts.filter(product => {
					let bol = true

					state.filterList.some((e) => {
						bol *= product.types.includes(e)
					})

					return bol == 1
				})
			} else
				return state.allProducts
		},

		getFilterList(state) {
			return state.filterList
		},

		getShowBasket(state) {
			return state.showBasket
		},
		
		getBasket(state) {
			return state.basket
		},
		
		getFinalCost(state) {
			return state.finalCost
		},
		
		getStatusSubmit(state) {
			return state.successSubmit
		},
		
		getLoadingSubmit(state) {
			return state.loadingSubmit
		}
	},

	mutations: {
		setAllProducts(state, data) {
			state.allProducts = data
		},

		setLoading(state, data) {
			state.loading = data
		},

		setShowFilters(state, data) {
			state.showFilters = data
		},

		setFilterList(state, data) {
			if (state.filterList.includes(data))
				state.filterList = state.filterList.filter((item) => item !== data);
			else
				state.filterList.push(data);
		},

		setShowBasket(state) {
			state.showBasket = !state.showBasket
			state.successSubmit = null
		},

		setBasket(state, data) {
			if (!state.basket.find(item => item.id == data.id)) {
				data.length = 1
				state.basket.push(data)
			} else {
				let index = state.basket.findIndex(n => n.id == data.id)

				state.basket.splice(index, 1)
			}

			localStorage.setItem('basket', JSON.stringify(state.basket))
		},

		setFinalCost(state) {
			let cost = 0,
					basket = state.basket

			for (const key in basket) {
				if (Object.hasOwnProperty.call(basket, key)) {
					const item = basket[key]

					cost += Number(item.price) * item.length
				}
			}

			state.finalCost = cost
		},

		setClearBasket(state) {
			state.basket = []

			localStorage.clear('basket')
		},

		setIncrementBasketItem(state, data) {
			state.basket.find(item => item.id == data.id).length++

			localStorage.setItem('basket', JSON.stringify(state.basket))
		},

		setDecrementsBasketItem(state, data) {
			let item = state.basket.find(item => item.id == data.id)

			if (item.length > 1)
				item.length--

			localStorage.setItem('basket', JSON.stringify(state.basket))
		},

		setValidFiltersEmptyProduct(state, data) {
			state.filterList = []
			state.filterList.push(...data.types)
			state.filterList.push('have')
		},

		setStatusSubmit(state, status) {
			if (status == 201) {
				state.loadingSubmit = false
				state.successSubmit = true

				state.basket = []

				localStorage.clear('basket')
			}
		},

		setLoadingSubmit(state, data) {
			state.loadingSubmit = data
		},
	},

	actions: {
		async allProductsGet({ commit }) {
			try {
				const api = 'https://6307867746372013f56af52c.mockapi.io/api/products/products'
				const res = await axios.get(api)

				commit('setAllProducts', res.data)

				commit('setLoading', false)
			} catch {
				alert('Ошибка получения данных')
			}
		},

		toggleFilters({ state, commit }) {
			if (!state.showFilters)
				document.documentElement.style.overflow = 'hidden'
			else
				document.documentElement.style.overflow = 'auto'

			commit('setShowFilters', !state.showFilters)
		},

		addFilterItem({ commit }, data) {
			commit('setFilterList', data)
		},

		toggleShowBasket({ state, commit }) {
			if (!state.showBasket)
				document.documentElement.style.overflow = 'hidden'
			else
				document.documentElement.style.overflow = 'auto'

			commit('setShowBasket')
			commit('setFinalCost')
		},

		addBasket({ commit }, data) {
			commit('setBasket', data)
			commit('setFinalCost')
		},

		clearBasket({ commit }) {
			commit('setClearBasket')
		},

		incrementBasketItem({ commit }, data) {
			commit('setIncrementBasketItem', data)

			commit('setFinalCost')
		},

		decrementsBasketItem({ commit }, data) {
			if (data.length > 1)
				commit('setDecrementsBasketItem', data)
			else
				commit('setBasket', data)

			commit('setFinalCost')
		},

		validFiltersEmptyProduct({ commit }, data) {
			commit('setValidFiltersEmptyProduct', data)
			commit('setBasket', data)
		},

		async submitBasket({ commit, state }) {
			try {
				commit('setLoadingSubmit', true)

				const api = 'https://6307867746372013f56af52c.mockapi.io/api/products/post'
				
				await axios.post(api, {
					body: JSON.stringify(state.basket),
					cost: state.finalCost
				})
					.then((res) => {
						commit('setStatusSubmit', res.status)
					})
					.catch((err) => {
						alert('Ошибка отправки данных')
					})
			} catch {
				alert('Ошибка отправки данных')
			}
		}
	},

	namespaced: true
}
<template>
  <div class="products">
    <BreadCrumbs class="products__breadcrumbs"/>
    <h1 class="products__title">Краски</h1>
    <div class="products__info">
      <p class="products__length">{{ filtredProducts.length }} товар{{setEnding}}</p>
      <p class="products__open-filtres" @click="toggleFilters">Фильтры</p>
      <div class="products__sort">
        <div 
          class="products__sort-title" 
          @click="toggleModal" 
          tabindex="0" 
          @keyup.enter="toggleModal"
        >
          <p>{{ selectedSort }}</p>
          <img src="@/assets/svg/sort-arrow.svg" alt="arrow" />
        </div>
        <ul 
          :class="['products__sort-list', {
            'products__sort-list--close': closeSort
          }]" 
          v-if="showModal"
        >
          <li 
            :class="['products__sort-item', {
              'products__sort-item--active': condition == 'expensive'
            }]" 
            data-sort="expensive" 
            @click="sort"
            tabindex="0" 
            @keyup.enter="sort"
          >Сначала дорогие</li>
          <li 
            :class="['products__sort-item', {
              'products__sort-item--active': condition == 'cheap'
            }]" 
            data-sort="cheap" 
            @click="sort"
            tabindex="0" 
            @keyup.enter="sort"
          >Сначала недорогие</li>
          <li class="products__sort-item" tabindex="0" >Сначала популярные</li>
          <li class="products__sort-item" tabindex="0" >Сначала новые</li>
        </ul>
      </div>
      <div 
        :class="['products__back', {
          'products__back--close': closeSort
        }]" 
        v-if="showModal" 
        @click="toggleModal"
      ></div>
    </div>

    <section 
      class="products__grid" 
      v-masonry="'products'"
      item-selector=".products__item"
      transition-duration="0.3s"
      column-width=".products__item"
      stagger="0.03s"
			gutter="18"
      v-if="filtredProducts.length > 0"
    >
      <ProductItem 
        class="products__item" 
        v-masonry-tile
        v-for="product in sortedProducts"
        :key="product.id"
        :product="product"
      />
    </section>
    <div class="products__empty" v-else>
      <h3 class="products__empty-title">Товаров не найдено</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'

export default {
  components: {
    BreadCrumbs
  },

  data() {
    return {
      showModal: false,
      condition: null,
      closeSort: false,
      selectedSort: 'Сортировка'
    }
  },

  methods: {
    ...mapActions({
      toggleFilters: 'data/toggleFilters'
    }),

    toggleModal() {
      this.showModal = !this.showModal
    },

    sort(e) {
      this.closeSort = true

      setTimeout(() => {
        this.condition = e.target.attributes['data-sort'].value

        this.showModal = false

        this.closeSort = false

        setTimeout(() => {
          this.$redrawVueMasonry('products')
        }, 120)

      }, 500)
    }
  },

  computed: {
    ...mapGetters({
      filterList: 'data/getFilterList',
      filtredProducts: 'data/getFilteredProducts'
    }),

    setEnding() {
      switch(this.filtredProducts.length) {
        case 1:
          return ''
        case 2:
        case 3:
        case 4:
          return 'а'
        default:
          return 'ов'
      }
    },

    sortedProducts() {
      switch (this.condition) {
				case 'expensive':
          this.selectedSort = 'Сначала дорогие'
					return this.filtredProducts.slice().sort((a, b) => {
						return Number(b.price) - Number(a.price)
					})

				case 'cheap':
          this.selectedSort = 'Сначала недорогие'
					return this.filtredProducts.slice().sort((a, b) => {
						return Number(a.price) - Number(b.price)
					})

        default:
          return this.filtredProducts
			}
    }
  },

  watch: {
    showModal: function() {
      if(this.showModal){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    },
    
    filtredProducts: {
			handler: function() {
				setTimeout(() => {
					this.$redrawVueMasonry('products')
				}, 120)
			},
			deep: true			
		}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './ProductsBlock.scss';
</style>
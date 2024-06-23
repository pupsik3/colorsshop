<template>
  <div class="slider">
    <swiper 
      class="slider__swiper" 
      :modules="modules" 
      :navigation="{
        prevEl: prev,
        nextEl: next,
      }"
      :pagination="{ clickable: true }" 
      autoplay
    >
      <swiper-slide class="slider__slide">
        <div class="slider__info">
          <h3>Краски</h3>
          <p>Идеально подходят для стен и других поверхностей.<br/>Найди свой идеальный цвет!</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slider__slide">
        <div class="slider__info">
          <h3>Кисточки</h3>
          <p>Идеально подходят для красок любого вида.<br/>Найди свою идеальную кисть!</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slider__slide">
        <div class="slider__info">
          <h3>Холсты</h3>
          <p>Идеально подходят для кистей и красок.<br/>Найди свой идеальный холст!</p>
        </div>
      </swiper-slide>
      <swiper-slide class="slider__slide">
        <div class="slider__info">
          <h3>Холсты</h3>
          <p>Идеально подходят для кистей и красок.<br/>Найди свой идеальный холст!</p>
        </div>
      </swiper-slide>

      <BreadCrumbs class="slider__breadcrumbs"/>

      <div class="slider__nav slider__prev" ref="prev">
        <img 
          src="@/assets/svg/arrow.svg" 
          alt="prev" 
          class="slider__prev-img"
        />
      </div>
      <div class="slider__nav slider__next" ref="next">
        <img 
          src="@/assets/svg/arrow.svg" 
          alt="next" 
          class="slider__next-img"
        />
      </div>
    </swiper>
  </div>
</template>

<script>
import { ref } from 'vue';

import { Swiper, SwiperSlide  } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs'

export default {
  components: {
    Swiper,
    SwiperSlide,
    BreadCrumbs
  },
  
  setup() {
    const prev = ref(null)
    const next = ref(null)
    return {
      modules: [Navigation, Pagination, Autoplay],
      prev,
      next,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';
@import './Slider.scss';
</style>
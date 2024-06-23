<template>
  <div class="not-found">
    <img 
      src="@/assets/gif/loading.gif" 
      alt="duck" 
      class="not-found__gif" 
    />
    <h3 class="not-found__title">Страница не найдена...</h3>
    <router-link to="/" class="not-found__btn">На главную</router-link>
    <div class="not-found__back">
      <p class="not-found__item not-found__item--numbers">404</p>
      <p class="not-found__item not-found__item--numbers">404</p>
      <p class="not-found__item not-found__item--text">Not Found</p>
      <p class="not-found__item not-found__item--numbers">404</p>
      <p class="not-found__item not-found__item--text">Not Found</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import './NotFoundPage.scss';
</style>
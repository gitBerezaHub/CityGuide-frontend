<script lang="ts" setup>
import TryButton from '@/components/GradientButton.vue'
import AppHeader from '@/components/AppHeader.vue'
import router from '@/router'
</script>

<template>
  <div class="homepage-wrapper">
    <div class="homepage-content-wrapper">
      <AppHeader/>
      <div class="content">
        <div class="content-top">
          <div class="content-top__slogan">
            <h2>Путешествуй с <p class="content-top__slogan-AI gradient-text">Искусственным Интеллектом!</p></h2>
          </div>
          <div class="content__start">
            <TryButton @click="router.push('/request')">Попробовать!</TryButton>
          </div>
        </div>
        <div>
          <p class="content__project-description"><b class="gradient-text">City Guide</b> использует продвинутый
            искусственный интеллект для моментального поиска мест,
            соответствующих запросу, и построения оптимального пути, по которому можно их посетить. <br/><br/>
            Для того, чтобы построить маршрут, выберите город и введите текстовый запрос, описывающий ваши
            предпочтения, либо загрузите изображение места и <b class="gradient-text">City Guide</b> покажет места,
            похожие на это.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: 900px) {
  .content-top {
    display: flex;
    flex-direction: row;
    margin-bottom: 120px;

    .content-top__slogan {
      width: 40vw;
      font-size: 40px !important;
    }

    .content-top__slogan-AI {
      font-size: 50px !important;
    }

    .content__start {
      margin-top: 40px !important;
      width: 40vw;
      margin-bottom: 0 !important;
    }
  }
}

.homepage-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .homepage-content-wrapper {
    width: 85vw;

    .content {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;

      .content-top__slogan {
        font-size: 32px;

        .content-top__slogan-AI {
          font-weight: 600;
          font-size: 38px;
        }
      }

      .content__start {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 80px;
        margin-bottom: 80px;
        .button {
          height: 62px;
        }
      }

      .content__project-description {
        font-size: 20px;
        width: 80vw;
        line-height: 27px;
        padding-bottom: 60px;
      }
    }
  }
}
</style>

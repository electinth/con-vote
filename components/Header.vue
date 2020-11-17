<template>
  <div class="header">
    <div class="logo-wrapper">
      <img :src="elect_logo" alt="" />
    </div>
    <div class="share">
      <div
        v-for="(logo, i) in logos"
        class="logo"
        :key="i"
        :style="{ width: logo.width, height: logo.height }"
      >
        <img
          v-sharer
          :src="logo.link"
          :data-url="base_url"
          :data-sharer="logo.sharer"
          data-title=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueSharer from 'vue-sharer'
export default {
  directives: {
    sharer: VueSharer,
  },
  data() {
    return {
      elect_logo: require('~/assets/images/elect_logo.svg'),
      logos: [
        {
          link: require('~/assets/images/facebook.svg'),
          sharer: 'facebook',
          width: '40px',
          height: '40px',
        },
        {
          link: require('~/assets/images/twitter.svg'),
          sharer: 'twitter',
          width: '40px',
          height: '40px',
        },
        {
          link: require('~/assets/images/line.svg'),
          sharer: 'line',
          width: '40px',
          height: '40px',
        },
      ],
      base_url: 'http://localhost:3000/con-vote/',
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 50;
  top: 0;
  background-color: white;
  left: 0;
  align-items: center;
  padding: 0 50px;
}
.logo-wrapper,
.share {
  display: flex;
  flex: 1;
}
.share {
  flex-direction: row;
  justify-content: flex-end;
}
.logo-wrapper {
  justify-content: flex-start;
}
.logo {
  cursor: pointer;
  margin: 0 5px;
}
</style>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="content" v-html="about" />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script>
import aboutFR from '@/assets/markdown/fr/about.md'
import aboutEN from '@/assets/markdown/en/about.md'

export default {
  computed: {
    about () {
      switch (this.$store.state.i18n.locale) {
        case 'fr':
          return aboutFR
        case 'en':
          return aboutEN
        default:
          return aboutEN
      }
    }
  }
}
</script>

<style lang="stylus">
.content{
    max-width:800px;
    box-sizing:border-box;
    padding:0 1rem 2rem 1rem;
    margin:0 auto;
}
</style>

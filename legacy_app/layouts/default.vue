<template>
  <div>
    <el-container>
      <el-header>
        <el-menu mode="horizontal" :router="true">
          <el-menu-item index="1" :route="localePath({ name: 'index' })">
            {{ $t('nav.generate') }}
          </el-menu-item>
          <!-- <el-menu-item index="2" :route="localePath({ name:'decrypt' })">
            {{ $t('nav.decrypt') }}</el
          -menu-item> -->
          <el-menu-item index="3" :route="localePath({ name:'about' })">
            {{ $t('nav.about') }}
          </el-menu-item>
          <el-menu-item index="4" :route="switchLocalePath('fr')">
            fr
          </el-menu-item>
          <el-menu-item index="5" :route="switchLocalePath('en')">
            en
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main><nuxt /></el-main>
    </el-container>
  </div>
</template>

<style></style>

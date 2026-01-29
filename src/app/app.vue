<template>
  <UApp class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Header -->
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur sticky top-0 z-50">
      <UContainer class="flex items-center justify-between h-16">
        <div class="flex items-center gap-6">
          <NuxtLink :to="localePath('/')" class="font-bold text-xl flex items-center gap-2">
            <UIcon name="i-heroicons-qr-code" class="w-6 h-6 text-primary" />
            OTP QRCode
          </NuxtLink>
          
          <nav class="hidden md:flex gap-4">
             <UButton :to="localePath('/')" variant="ghost" :color="$route.path === localePath('/') ? 'primary' : 'gray'">
               {{ $t('nav.generate') }}
             </UButton>
             <UButton :to="localePath('about')" variant="ghost" :color="$route.path.startsWith(localePath('about')) ? 'primary' : 'gray'">
               {{ $t('nav.about') }}
             </UButton>
          </nav>
        </div>

        <div class="flex items-center gap-2">
            <!-- Language Switcher -->
            <UDropdownMenu :items="localeItems" :popper="{ placement: 'bottom-end' }">
               <UButton color="gray" variant="ghost" icon="i-heroicons-language" />
            </UDropdownMenu>

            <!-- Color Mode -->
            <UButton
              :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
        </div>
      </UContainer>
    </header>

    <!-- Main Content -->
    <UMain>
      <NuxtPage />
    </UMain>

    <!-- Footer -->
    <footer class="py-6 text-center text-sm text-gray-500">
      <UContainer>
         <p>Made to be handy, for fun.</p>
      </UContainer>
    </footer>
  </UApp>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - OTP QRCode` : 'OTP QRCode';
  }
})

const switchLocalePath = useSwitchLocalePath()

const localeItems = computed(() => [
    [{
        label: 'English',
        to: switchLocalePath('en')
    },
    {
        label: 'Français',
        to: switchLocalePath('fr')
    }]
])
</script>

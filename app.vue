<template>
  <VitePwaManifest />

  <div class="bg-black fixed w-[calc(100%+1px)] h-full">
    <NuxtPage />

    <CreateRecipe
      :class="[
          {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
          {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
      ]"
    />
    <LogOut
      :class="[
          {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isLogoutOverlay },
          {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isLogoutOverlay },
      ]"
    />
    <Search
      :class="[
          {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isSearchOverlay },
          {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isSearchOverlay  },
      ]"
    />
    <CookBook
      :class="[
          {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isCookbookOverlay },
          {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isCookbookOverlay  },
      ]"
    />
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
</script>
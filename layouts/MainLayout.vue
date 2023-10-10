<template>
    <div id="MainLayout" class="h-screen">
        <div class="w-full max-w-[500px] mx-auto">
            <div id="TopMenu" class="w-full flex items-center justify-center px-2 h-10 my-2">
                <img class="w-[35px]" src="/kookie-logo.png">
            </div>
        </div>

        <div class="flex w-full max-w-[500px] mx-auto h-screen">
            <slot />
        </div>

        <div
            id="BottomNavi" 
            class="fixed z-50 bottom-0 flex w-full h-[70px] border-t border-t-gray-700 bg-black"
        >
            <div class="flex w-full max-w-[500px] mx-auto flex items-center justify-around">
                <!-- home -->
                <button 
                    @click="navigateTo('/')"
                    class="w-full h-full"
                >
                    <Icon class="mb-2" name="material-symbols:home-outline-rounded" size="35" color="#ffffff"/>
                </button>

                <!-- search -->
                <button
                    @click="userStore.isSearchOverlay = true" 
                    class="w-full h-full"
                >
                    <Icon class="mb-1" name="material-symbols:search-rounded" size="32" color="#ffffff"/>
                </button>

                <!-- add recipe -->
                <button 
                    @click="userStore.isMenuOverlay = true"
                    class="w-full h-full"
                >
                    <Icon class="mb-1" name="material-symbols:add-box-rounded" size="32" color="#ffffff"/>
                </button>

                <!-- cookbook -->
                <button 
                    class="w-full h-full"
                >
                    <Icon class="mb-1" name="material-symbols:library-books-outline-rounded" size="32" color="#ffffff"/>
                </button>

                <!-- logout -->
                <button 
                    @click="userStore.isLogoutOverlay = true"
                    class="w-full h-full"
                >
                    <Icon class="mb-1" name="material-symbols:logout-rounded" size="32" color="#ffffff"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()
</script>
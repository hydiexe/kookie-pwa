<template>
    <MainLayout>
        <div id="IndexPage" class="w-full overflow-auto">
            <div class="mx-auto max-w-[500px] overflow-hidden">
                <div id="Recipes" class="px-4 max-w-[600px] mx-auto" >

                    <div v-if="isRecipes" v-for="recipe in recipes" :key="recipe">
                        <Recipe :recipe="recipe" @isDeleted="recipes = userStore.getAllRecipes()" />
                    </div>
                    <div v-else>
                        <client-only>
                            <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <Icon name="eos-icons:bubble-loading" size="50" color="#ffffff" />
                                    <div class="w-full mt-1">Loading...</div>
                                </div>
                            </div>
                            <div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                                <div class="text-white mx-auto flex flex-col items-center justify-center">
                                    <Icon name="tabler:mood-empty" size="50" color="#ffffff" />
                                    <div class="w-full">Make the first recipe!</div>
                                </div>
                            </div>
                        </client-only>
                    </div>
                    <div class="mt-60" />
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';

import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()

let recipes = ref([])
let isRecipes = ref(false)
let isLoading = ref(false)

watchEffect(() => {
    // if (!user.value && $route.path !== '/auth') {
    //     return navigateTo('/auth')
    // }
    if (!user.value) {
        return navigateTo('/auth')
    }
})

onBeforeMount(async () => {
    try {
        isLoading.value = true
        await userStore.getAllRecipes()
        isLoading.value = false
    } catch (error) {
        console.log(error)
    }
})

onMounted(() => {
    watchEffect(() => {
        if (userStore.recipes && userStore.recipes.length >= 1) {
            recipes.value = userStore.recipes
            isRecipes.value = true
        }
    })
})

watch(() => recipes.value, () => {
    if (userStore.recipes && userStore.recipes.length >= 1) {
        recipes.value = userStore.recipes
        isRecipes.value = true
    }
}, { deep: true })
</script>
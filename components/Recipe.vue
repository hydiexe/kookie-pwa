<template>
    <div class="z-50 bottom-0 h-full w-full">
        <div class=" py-2 w-full">
            <div class="flex items-center justify-between">
                <div  class="flex items-center text-white">
                    <img class="rounded-full h-[35px]" :src="recipe.image">
                    <div class="ml-2 font-semibold text-[18px]">{{ recipe.name }}</div>
                </div>

                <div 
                    v-if="user && user.identities && user.identities[0].user_id == recipe.userId" 
                    @click="isMenu = !isMenu" class="relative"
                >
                    <button 
                        :disabled="isDeleting"
                        class="flex items-center text-white p-1 h-[24px] w-[24px] hover:bg-gray-800 rounded-full cursor-pointer" 
                        :class="isMenu ? 'bg-gray-800' : ''"
                    >
                        <Icon v-if="!isDeleting" name="bi:three-dots" color="#ffffff" size="18"/>
                        <Icon v-else name="eos-icons:bubble-loading" color="#ffffff" size="18"/>
                    </button>

                    <div v-if="isMenu" class="absolute border border-gray-600 right-0 z-20 mt-1 rounded">
                        <button 
                            @click="deleteRecipe(recipe.id, recipe.picture)"
                            class="flex items-center rounded gap-2 text-red-500 justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900"
                        >
                            <div>Delete</div>
                            <Icon name="solar:trash-bin-trash-broken" size="20"/>
                        </button>
                        <button 
                            @click="editRecipe(recipe.id, recipe.picture)"
                            class="flex items-center rounded gap-2 text-white justify-between bg-black w-full pl-4 pr-3 py-1 hover:bg-gray-900"
                            style="color: white;"
                        >
                            <div>Edit</div>
                            <Icon name="material-symbols:edit-rounded" size="20" style="color: white;"/>
                        </button>
                    </div>
                </div>
            </div>

            <div class="relative flex items-center w-full">
                <div class="w-[42px] mx-auto">
                    <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full" />
                </div>
                <div class="bg-black rounded-lg w-[calc(100%-50px)] text-sm w-full font-light">
                    <div class="py-2 font-semibold text-semibold text-gray-300">{{ recipe.title }}</div>
                    <div class="py-2 text-gray-300">{{ recipe.ingredients }}</div>
                    <div class="py-2 text-gray-300">{{ recipe.steps }}</div>

                    <img 
                        v-if="recipe && recipe.picture"
                        class="mx-auto w-full mt-2 pr-2 rounded" 
                        :src="runtimeConfig.public.bucketUrl + recipe.picture" 
                    />

                    <div class="absolute mt-2 w-full ml-2">
                        <button 
                            :disabled="isCheer"
                            @click="cheersFunc()"
                            class="flex items-center gap-1"
                        >
                            <Icon 
                                v-if="!hasCheeredComputed"
                                class="p-1 text-white hover:bg-gray-800 rounded-full cursor-pointer" 
                                name="material-symbols:cookie-outline-rounded" 
                                size="28"
                            />
                            <Icon 
                                v-else
                                class="p-1 text-brown-500 hover:bg-gray-800 rounded-full cursor-pointer" 
                                name="mdi:cookie" 
                                size="28"
                            />
                        </button>

                        <div class="relative text-sm text-gray-500">
                            <div>
                                <span v-if="!isCheer">{{ recipe.cheers.length }}</span>
                                <span v-else>
                                    <Icon name="eos-icons:bubble-loading" color="#ffffff" size="13"/>
                                </span>
                                Cheers
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative inline-block text-gray-500 pt-1 pb-1.5">
            <div class="flex items-center">
                <div  class="flex items-center flex-wrap text-white gap-1 w-[42px]">
                    <div class="flex gap-0.5">
                        <img class="rounded-full h-[14px] mt-2" src="https://picsum.photos/id/202/50">
                        <img class="rounded-full h-[17px]" src="https://picsum.photos/id/223/50">
                    </div>
                    <div class="flex items-center">
                        <img class="rounded-full h-[11px] ml-4" src="https://picsum.photos/id/99/50">
                    </div>
                </div>
            </div>
        </div>

        <div class="h-[1px] bg-gray-800 w-full mt-3" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const router = useRouter();

const runtimeConfig = useRuntimeConfig()
let isMenu = ref(false)
let isCheer = ref(false)
let isDeleting = ref(false)

const emit = defineEmits(['isDeleted'])
const props = defineProps({ recipe: Object })

const client = useSupabaseClient()
const user = useSupabaseUser()

const hasCheeredComputed = computed(() => {
    if (!user.value) return 
    let res = false
    props.recipe.cheers.forEach(cheer => {
        if (cheer.userId == user.value.identities[0].user_id && cheer.recipeId == props.recipe.id) {
            res = true
        }
    });

    return res
})

const deleteRecipe = async (id, picture) => {
    let res = confirm('Apakah anda yakin akan menghapus resep ini?')

    if (!res) return 

    try {
        isMenu.value = false
        isDeleting.value = true
        const { data, error } = await client
            .storage
            .from('kookie-files')
            .remove([picture])

        await useFetch(`/api/delete-recipe/${id}`, { method: 'DELETE' })
        emit('isDeleted', true)

        isDeleting.value = false
    } catch (error) {
        console.log(error)
        isDeleting.value = false
    }
}

const cheerRecipe = async (id) => {
    isCheer.value = true
    try {
        await useFetch(`/api/cheer-recipe/`, {
            method: 'POST',
            body: {
                userId: user.value.identities[0].user_id,
                recipeId: id,
            }
        })
        await userStore.getAllRecipes()
        isCheer.value = false
    } catch (error) {
        console.log(error)
        isCheer.value = false
    }
}

const uncheerRecipe = async (id) => {
    isCheer.value = true
    try {
        await useFetch(`/api/uncheer-recipe/${id}`, { method: 'DELETE' })
        await userStore.getAllRecipes()
        isCheer.value = false
    } catch (error) {
        console.log(error)
        isCheer.value = false
    }
}

const cheersFunc = () => {
    let cheerRecipeObj = null

    if (props.recipe.cheers.length < 1) {
        cheerRecipe(props.recipe.id)
        return null
    } else {
        props.recipe.cheers.forEach(cheer => {
            if (cheer.userId == user.value.identities[0].user_id && cheer.recipeId == props.recipe.id) {
                cheerRecipeObj = cheer
            }
        });
    }

    if (cheerRecipeObj) {
        uncheerRecipe(cheerRecipeObj.id)
        return null
    }

    cheerRecipe(props.recipe.id)
}

const editRecipe = (recipeId, recipePicture) => {
    router.push({
        name: '~/components/EditRecipe',
        params: { recipeId: recipeId, recipePicture: recipePicture },
    });
}
</script>
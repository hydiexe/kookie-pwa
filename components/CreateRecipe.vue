<template>
    <div id="CreateRecipe" class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
        <div class="bg-black h-full w-full text-white overflow-auto">
            <div class="flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <button 
                    @click="
                        userStore.isMenuOverlay = false;
                        clearData();
                    "
                    class="rounded-full px-2"
                >
                    <Icon name="mdi:close" size="25"/>
                </button>
                <div class="text-[16px] font-semibold">Bagi Resep</div>
            </div>

            <div id="Recipe" class="z-40 bottom-0 max-h-[100vh-200px] w-full px-3 max-w-[500px] mx-auto">
                <div class=" py-2 w-full">
                    <div class="flex items-center">
                        <div v-if="user" class="flex items-center text-white">
                            <img class="rounded-full h-[35px]" :src="user.identities[0].identity_data.avatar_url">
                            <div class="ml-2 font-semibold text-[18px]">{{ user.identities[0].identity_data.full_name }}</div>
                        </div>
                    </div>
                    <div class="relative flex items-center w-full">
                        <div class="w-[42px] mx-auto">
                            <div class="absolute ml-4 mt-1 top-0 w-[1px] bg-gray-700 h-full" />
                        </div>
                        <div class="bg-black rounded-lg w-[calc(100%-50px)] text w-full font-light">
                            <div class="pt-2 text-gray-300 bg-black w-full">
                                <!-- Form untuk title -->
                                <div class="max-w-[500px] mx-auto border-b border-b-gray-700">
                                    <div class="py-4 text-[16px] font-semibold">Nama Resep</div>
                                    <textarea
                                        v-model="title"
                                        style="resize: none;"
                                        placeholder="Bagaimana kami bisa menyebut resep mu?"
                                        id="titleTextarea"
                                        @input="adjustTextareaHeight('titleTextarea')"
                                        class="w-full bg-black outline-none"
                                    ></textarea>
                                </div>
                                <!-- Form untuk ingredients -->
                                <div class="max-w-[500px] mx-auto border-b border-b-gray-700">
                                    <div class="py-4 text-[16px] font-semibold">Bahan & Alat</div>
                                    <textarea
                                        v-model="ingredients"
                                        style="resize: none;"
                                        placeholder="Apa saja alat dan bahannya?"
                                        id="ingredientsTextarea"
                                        @input="adjustTextareaHeight('ingredientsTextarea')"
                                        class="w-full bg-black outline-none"
                                    ></textarea>
                                </div>
                                <!-- Form untuk steps -->
                                <div class="max-w-[500px] mx-auto border-b border-b-gray-700">
                                    <div class="py-4 text-[16px] font-semibold">Langkah-langkah</div>
                                    <textarea
                                        v-model="steps"
                                        style="resize: none;"
                                        placeholder="Masukkan langkah-langkahnya"
                                        id="stepsTextarea"
                                        @input="adjustTextareaHeight('stepsTextarea')"
                                        class="w-full bg-black outline-none"
                                    ></textarea>
                                </div>
                            </div>

                            <!-- gambar -->
                            <div class=" w-full">
                                <div class="flex flex-col gap-2 py-1">

                                    <div v-if="fileDisplay">
                                        <img class="mx-auto w-full mt-2 mr-2 rounded-lg" :src="fileDisplay" />
                                    </div>

                                    <label for="fileInput">
                                        <Icon name="clarity:paperclip-line" color="#ffffff" size="25"/>
                                        <input 
                                            ref="file" 
                                            type="file" 
                                            id="fileInput"
                                            @input="onChange" 
                                            hidden 
                                            accept=".jpg,.jpeg,.png" 
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                v-if="title && ingredients && steps"
                :disabled="isLoading"
                @click="createRecipe"
                class="fixed bottom-0 font-bold text-lg w-full p-2 bg-black inline-block float-right p-4 border-t border-t-gray-700"
                :class="isLoading ? 'text-gray-600' : 'text-blue-600'"
            >
                <div v-if="!isLoading">Share</div>
                <div v-else class="flex items-center gap-2 justify-center">
                    <Icon name="eos-icons:bubble-loading" size="25" /> 
                    Please wait...
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const client = useSupabaseClient()
const user = useSupabaseUser()

let title = ref(null)
let ingredients = ref(null)
let steps = ref(null)
let isLoading = ref(false)

const adjustTextareaHeight = (textareaId) => {
    var textarea = document.getElementById(textareaId);
    textarea.style.height = "auto"
    textarea.style.height = textarea.scrollHeight + "px"
}

let file = ref(null)
let fileDisplay = ref(null)
let fileData = ref(null)

const clearData = () => {
    title.value = null
    ingredients.value = null
    steps.value = null
    file.value = null
    fileDisplay.value = null
    fileData.value = null
}

const onChange = () => {
    fileDisplay.value = URL.createObjectURL(file.value.files[0])
    fileData.value = file.value.files[0]
}

const createRecipe = async () => {
    let dataOut = null;
    let errorOut = null;

    isLoading.value = true

    if (fileData.value) {
        const { data, error } = await client
            .storage
            .from('kookie-files')
            .upload(`${uuidv4()}.jpg`, fileData.value)

        dataOut = data;
        errorOut = error;
    }

    if (errorOut) {
        console.log(errorOut)
        return errorOut
    }

    let pic = ''
    if (dataOut) {
        pic = dataOut.path ? dataOut.path : ''
    }

    try {
        await useFetch(`/api/create-recipe/`, {
            method: 'POST',
            body: {
                userId: user.value.identities[0].user_id,
                name: user.value.identities[0].identity_data.full_name,
                image: user.value.identities[0].identity_data.avatar_url,
                title: title.value,
                ingredients: ingredients.value,
                steps: steps.value,
                picture: pic,
            }
        })

        await userStore.getAllRecipes()
        userStore.isMenuOverlay = false

        clearData()
        isLoading.value = false
    } catch (error) {
        console.log(error)
        isLoading.value = false
    }
}

</script>
<template>
    <div id="SeacrhRecipe" class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
        <div class="bg-black h-full w-full text-white overflow-auto">
            <div class="flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <button 
                    @click="closeSearch"
                    class="rounded-full px-2"
                >
                    <Icon name="mdi:close" size="25"/>
                </button>
                <div class="text-[16px] font-semibold">Cari Resep</div>
            </div>

            <div class="p-4 flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <input
                    v-model="searchQuery"
                    @input="handleSearch"
                    placeholder="Masak apa hari ini?"
                    class="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none text-black"
                />
            </div>
            <div class="p-4 py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <h2 class="text-lg font-semibold">Hasil:</h2>
                <ul v-if="searchResults.length > 0" class="list-disc ml-6 mt-2 text-white">
                    <li 
                        v-for="(result, index) in searchResults" 
                        :key="index"
                        @click="navigateToSearchResult(result)"
                        class="cursor-pointer hover:underline"
                    >
                        {{ result.title }}
                    </li>
                </ul>
                <div v-else class="mt-2 text-gray-500">Resep tidak ditemukan :(</div>
            </div>

            <!-- <div v-if="selectedResult" class="p-4 py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <h2 class="text-lg font-semibold">Result Details:</h2>
                <div class="text-white">{{ selectedResult.title }}</div>
                <div class="text-white">{{ selectedResult.ingredients }}</div>
                <div class="text-white">{{ selectedResult.steps }}</div>
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter();

const client = useSupabaseClient()
const user = useSupabaseUser()

let searchQuery = ref('');
let searchResults = ref([]);

const handleSearch = async () => {
    try {
    const { data, error } = await client
        .from('Recipes')
        .select('title', 'ingredients', 'steps') 
        .ilike('title', `%${searchQuery.value}%`);

    if (error) {
        console.error(error);
        return;
    }
        searchResults.value = data;
    } catch (error) {
        console.error(error);
    }
};

const closeSearch = () => {
    searchQuery.value = '';
    searchResults.value = [];

    userStore.isSearchOverlay = false;
};

const navigateToSearchResult = (result) => {
    router.push({
        name: 'SearchRes',
        params: { resultId: result.id }, 
  });
};
</script>
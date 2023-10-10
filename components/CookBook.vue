<template>
    <div id="SeacrhRecipe" class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
        <div class="bg-black h-full w-full text-white overflow-auto">
            <div class="flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
                <button 
                    @click="
                        userStore.isCookbookOverlay = false;
                        clearData();
                    "
                    class="rounded-full px-2"
                >
                    <Icon name="mdi:close" size="25"/>
                </button>
                <div class="text-[16px] font-semibold">Cook Book</div>
            </div>

            <div class="flex items-center justify-start py-4 max-w-[500px] mx-auto border-b border-b-gray-700">
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
</script>
  
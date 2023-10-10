<template>
    <div id="SeacrhResult" class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
        <div class="bg-black h-full w-full text-white overflow-auto">
            <h1 class="text-lg font-semibold">{{ result.title }}</h1>
            <p>{{ result.ingredients }}</p>
            <p>{{ result.steps }}</p>
        </div>
    </div>
  </template>
  
<script>
export default {
    props: {
        result: Object, 
    },
};
</script>
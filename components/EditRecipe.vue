<template>
    <div class="fixed z-50 bottom-0 h-full w-full overflow-hidden">
        <h1>Edit Resep</h1>
        <form @submit.prevent="updateRecipe">
        </form>
    </div>
</template>

<script>
export default {
    props: {
        id: String, 
    },
    data() {
        return {
            recipe: {} 
        };
    },
    methods: {
        fetchRecipe() {
        },
        updateRecipe() {
            this.$router.push({ name: 'RecipeDetail', params: { id: this.id } });
        }
    },
    created() {
        this.fetchRecipe();
    }
};
</script>

<template>
    <div>
        <h1>Edit Recipe</h1>
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

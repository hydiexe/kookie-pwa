import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    recipes: [],
    isMenuOverlay: false,
    isLogoutOverlay: false,
  }),

  actions: {
    async getAllRecipes() {
      let res = await useFetch('/api/get-all-recipes')
      this.recipes = res.data
      return res.data
    }
  },
})
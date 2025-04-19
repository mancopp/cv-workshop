export const useConfiguratorStore = defineStore("configurator-store", {
  state: () => ({ 
    selectedTags: [] as string[],
    documentTags: new Set<string>(),
   }),
   actions: {
    setSelectedTags(newTags: string[]) {
      this.selectedTags = newTags;
    },
   }
});

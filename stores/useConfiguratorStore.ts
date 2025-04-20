export const useConfiguratorStore = defineStore("configurator-store", {
  state: () => ({ 
    selectedTags: [] as string[],
    documentTags: new Set<string>(),
    hoveredTag: null as string | null,
    previewMode: 'show' as 'show' | 'hide',
   }),
   actions: {
    setSelectedTags(newTags: string[]) {
      this.selectedTags = newTags;
    },
   }
});

import type { StateTree } from "pinia";
import { useComplexTypeJsonHandlers } from "~/composables/useComplexTypeJsonHandlers";

const complexTypeJsonHandlers = useComplexTypeJsonHandlers();

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
   },
  persist: {
    storage: localStorage,
    serializer: {
      serialize: (value: StateTree) => JSON.stringify(value, complexTypeJsonHandlers.stringifyReplacer),
      deserialize: (value: string) => JSON.parse(value, complexTypeJsonHandlers.parseReviver),
    },
  },
});
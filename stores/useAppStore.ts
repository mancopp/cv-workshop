export const useAppStore = defineStore("app-store", {
  state: () => ({ htmlToExport: null as HTMLElement | null }),
  actions: {
    setHtmlToExport(htmlElement: HTMLElement) {
      this.htmlToExport = htmlElement;
    },
  },
  persist: {
    storage: localStorage,
  },
});

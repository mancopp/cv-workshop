export interface IElectronAPI {
  exportPDF: () => Promise<void>,
  importHtml: () => Promise<boolean>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
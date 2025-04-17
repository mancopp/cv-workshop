export default class ZoomShortcutHandler {
  private zoomFactor: number = 1;
  private minZoom: number = 0.5;
  private maxZoom: number = 2;
  private zoomStep: number = 0.1;
  private element: HTMLElement | null = null;

  /**
   * Initialize the keyboard shortcut handler
   * @param targetElement Optional element to apply zoom to (defaults to document.body)
   * @param options Optional configuration settings
   */
  constructor(
    targetElement?: HTMLElement,
    options?: {
      initialZoom?: number;
      minZoom?: number;
      maxZoom?: number;
      zoomStep?: number;
    }
  ) {
    this.element = targetElement || document.body;
    
    if (options) {
      this.zoomFactor = options.initialZoom || this.zoomFactor;
      this.minZoom = options.minZoom || this.minZoom;
      this.maxZoom = options.maxZoom || this.maxZoom;
      this.zoomStep = options.zoomStep || this.zoomStep;
    }
    
    console.log('init');
    this.applyZoom();
  }

  public register(): void {
    document.addEventListener('keydown', this.handleKeyDown);
    console.log('register');
  }

  public unregister(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    console.log('keydown', event.key);
    // Check if Ctrl or Cmd key is pressed (metaKey for Mac, ctrlKey for Windows/Linux)
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '+':
        case '=': // = is on the same key as + without shift
          event.preventDefault();
          this.zoomIn();
          break;
        
        case '-':
        case '_': // _ is on the same key as - with shift
          event.preventDefault();
          this.zoomOut();
          break;
          
        case '0': // Common shortcut for resetting zoom
          event.preventDefault();
          this.resetZoom();
          break;
      }
    }
  };

  public zoomIn(): void {
    if (this.zoomFactor < this.maxZoom) {
      this.zoomFactor = Math.min(this.maxZoom, this.zoomFactor + this.zoomStep);
      this.applyZoom();
    }
  }

  public zoomOut(): void {
    if (this.zoomFactor > this.minZoom) {
      this.zoomFactor = Math.max(this.minZoom, this.zoomFactor - this.zoomStep);
      this.applyZoom();
    }
  }

  public resetZoom(): void {
    this.zoomFactor = 1;
    this.applyZoom();
  }

  private applyZoom(): void {
    if (this.element) {
      this.element.style.transform = `scale(${this.zoomFactor})`;
      this.element.style.transformOrigin = 'center top';
      
      // Optional: Dispatch a custom event that other parts of your application can listen for
      const zoomEvent = new CustomEvent('zoom-changed', { 
        detail: { zoomFactor: this.zoomFactor } 
      });
      document.dispatchEvent(zoomEvent);
    }
  }

  public getZoomFactor(): number {
    return this.zoomFactor;
  }
}

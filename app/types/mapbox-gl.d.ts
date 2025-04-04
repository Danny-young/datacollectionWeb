declare module 'mapbox-gl' {
  export class Map {
    constructor(options: any);
    on(event: string, callback: (e: any) => void): void;
    remove(): void;
  }
  
  export class Marker {
    constructor(options: any);
    setLngLat(coordinates: [number, number]): this;
    addTo(map: Map): this;
    getElement(): HTMLElement;
  }
  
  export class Popup {
    constructor(options: any);
    setHTML(html: string): this;
    addTo(map: Map): this;
    remove(): void;
  }
  
  export const accessToken: string;
} 
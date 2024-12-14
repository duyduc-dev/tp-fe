export enum EventKeys {}

class EventHelper {
  dispatch<T = any>(key: string, detail: T) {
    window.dispatchEvent(new CustomEvent(key, { detail }));
  }

  subscriber<T = any>(key: string, handler: (params: { detail: T }) => void) {
    window.addEventListener(key, handler as never);
  }

  remove(key: string, handler: any) {
    window.removeEventListener(key, handler);
  }
}

export default new EventHelper();

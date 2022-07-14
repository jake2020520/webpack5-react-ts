interface StateListener<T = any> {
  (state: T): void;
}

interface EventListener {
  (...args: any[]): void;
}

interface ChildApp {
  name: string;
  path: string;
  version: string;
  jsFiles: string[];
  cssFiles: string[];
  ignoreRouter?: boolean;
}

export class SpaStore<T extends object> {
  constructor(initialState?: T) {
    // @ts-ignore
    this.state = initialState ? initialState : {};
  }

  private state: T;

  private eventListeners: Map<string, Map<string, EventListener>> = new Map();

  private stateListeners: Map<string, StateListener<T>> = new Map();

  private nameKeyMap: Map<string, string> = new Map();

  private fireStateChange() {
    for (const listener of this.stateListeners.values()) {
      listener(Object.assign({}, this.state));
    }
  }

  private startKey = Date.now();

  private getUUID() {
    return (this.startKey++).toString();
  }

  public setState(newstate: Partial<T>) {
    this.state = {
      ...this.state,
      ...newstate,
    };
    this.fireStateChange();
  }

  public getState(name?: string) {
    const state = Object.assign({}, this.state);
    if (name) {
      return state[name] || {};
    }
    return state;
  }

  /**
   * 订阅state改变
   * @param callback
   * @returns key
   */
  public subscribeState(callback: StateListener<T>) {
    const key = this.getUUID();
    this.stateListeners.set(key, callback);
    return key;
  }

  /**
   * 取消订阅state
   * @param key
   */
  public unsubscribeState(key: string) {
    this.stateListeners.delete(key);
  }

  /**
   * 手动触发自定义事件，类似eventbus
   * @param name
   * @param args
   */
  public emit(name: string, ...args: any[]) {
    if (this.eventListeners.has(name)) {
      const listeners = this.eventListeners.get(name);
      for (const listener of listeners.values()) {
        listener.apply(null, args);
      }
    }
  }

  /**
   * 订阅自定义事件，类似eventbus
   * @param name
   * @param callback
   */
  public on(name: string, callback: EventListener) {
    let listeners: Map<string, EventListener> | undefined = undefined;
    const key = this.getUUID();
    if (this.eventListeners.has(name)) {
      listeners = this.eventListeners.get(name);
    } else {
      listeners = new Map<string, EventListener>();
      this.eventListeners.set(name, listeners);
    }
    listeners && listeners.set(key, callback);
    this.nameKeyMap.set(key, name);
    return key;
  }

  /**
   * 清理事件监听
   * @param key
   */
  public off(key: string) {
    if (this.eventListeners.has(key)) {
      this.eventListeners.delete(key);
      for (const arr of this.nameKeyMap.entries()) {
        const [_key, _value] = arr;
        if (_value === key) {
          this.nameKeyMap.delete(_key);
        }
      }
      return;
    }
    if (this.nameKeyMap.has(key)) {
      const name = this.nameKeyMap.get(key);
      if (this.eventListeners.has(name)) {
        const listeners = this.eventListeners.get(name);
        listeners.delete(key);
        this.nameKeyMap.delete(key);
      }
    }
  }

  /**
   * 清理所有订阅和state
   */
  public clearAll() {
    // @ts-ignore
    this.state = {};
    this.nameKeyMap.clear();
    this.stateListeners.clear();
    this.eventListeners.clear();
  }
}

export const getSpaStore: <T extends object = any>() => SpaStore<T> =
  function () {
    if (!(window as any).spa_store) {
      (window as any).spa_store = new SpaStore();
    }
    return (window as any).spa_store;
  };

export function loadChildApp(app: ChildApp) {
  let { jsFiles, cssFiles } = app;
  const { version } = app;
  jsFiles = jsFiles || [];
  cssFiles = cssFiles || [];
  const { length } = jsFiles;
  const completes = [];
  const store = getSpaStore();
  const state = store.getState("childAppLoaded");

  if (state[app.name]) {
    return Promise.resolve(window[app.name]);
  }

  return new Promise((resolve, reject) => {
    if (length === 0) {
      resolve();
      return;
    }
    function onload(src) {
      completes.push(src);
      if (completes.length === length) {
        state[app.name] = true;
        store.setState({ childAppLoaded: state });
        resolve(window[app.name]);
      }
    }
    if (jsFiles.length) {
      try {
        jsFiles.forEach((item) => {
          if (document.getElementById(`${item}`)) {
            onload(item);
          } else {
            const script = document.createElement("script");
            script.id = item;
            script.src = `${item}?v=${version}`;
            script.async = false;
            script.defer = true;
            script.onload = () => onload(item);
            script.onerror = reject;
            document.head.append(script);
          }
        });
      } catch (error) {
        reject(error);
      }
    }
    if (cssFiles.length) {
      try {
        cssFiles.forEach((item) => {
          if (document.getElementById(`${item}`)) {
            return;
          }
          const link = document.createElement("link");
          link.id = item;
          link.rel = "stylesheet";
          link.type = "text/css";
          link.href = `${item}?v=${version}`;
          document.head.append(link);
        });
      } catch (error) {
        reject(error);
      }
    }
  });
}

export function getSpaRoutes(apps: ChildApp[]) {
  return apps
    .filter((app) => app.ignoreRouter !== true)
    .map((app) => ({ name: app.name, path: app.path }));
}

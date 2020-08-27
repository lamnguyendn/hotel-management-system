export {};

declare global {
  interface Window {
    // __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__?: unknown;
  }
}

declare namespace NodeJS {
  interface Global {
    MutationObserver: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
  }
}

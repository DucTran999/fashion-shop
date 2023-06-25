const isFunction = (obj) => {
  return typeof obj === "function";
};

const isObject = (obj) => {
  const type = typeof obj;

  return type === "function" || (type === "object" && !!obj);
};

const hasWindowObject = () => {
  return typeof window !== "undefined" && window.document;
};

export const disableReactDevTools = () => {
  if (hasWindowObject()) {
    // Ensure the React Developer Tools global hook exists
    if (!isObject(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
      return;
    }

    // Replace all global hook properties with a no-op function or a null value
    for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      if (prop === "renderers") {
        // prevents console error when dev tools try to iterate of renderers
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
        continue;
      }
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = isFunction(
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop]
      )
        ? Function.prototype
        : null;
    }
  }
};

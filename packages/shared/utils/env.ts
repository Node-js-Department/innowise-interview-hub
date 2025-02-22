function isBrowser() {
  // @ts-ignore type of window
  return Boolean(typeof window !== 'undefined' && window.__ENV);
}

export function env(key: string): string | undefined {
  if (isBrowser()) {
    // @ts-ignore type of window
    return window.__ENV[key];
  }

  return process.env[key];
}

export const buildAsyncFlow = () => {

  return <F extends (...args: any[]) => Promise<void>>(fn: F) => {
    
    return async (...args: Parameters<F>) => {
      const res = fn(...args).catch();
      return res;
    }
  }
}
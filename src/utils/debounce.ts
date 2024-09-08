/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (func: (...args: any[]) => void, delay: number) => {
   let timeoutId: ReturnType<typeof setTimeout>;
   return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
   };
};

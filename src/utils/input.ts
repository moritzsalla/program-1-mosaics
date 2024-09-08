const OPACITY = '0.4';
const FULL_OPACITY = '1';

export const disableInput = (elem: HTMLInputElement, disable: boolean) => {
   if (!(elem instanceof HTMLDocument || typeof disable !== 'boolean')) return;
   elem.disabled = disable;
   elem.style.opacity = disable ? OPACITY : FULL_OPACITY;
};

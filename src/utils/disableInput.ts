/**
 * disable input
 * @param {HTMLInputElement} elem - element to be disabled
 * @param {Boolean} disable
 */
export const disableInput = (elem: HTMLInputElement, disable: boolean) => {
   if (!(elem instanceof HTMLDocument || typeof disable !== 'boolean')) return;
   elem.disabled = disable;
   elem.style.opacity = disable ? '0.4' : '1';
};

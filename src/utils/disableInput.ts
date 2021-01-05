/**
 * Disables HTML inputs
 * @param elem Element to be disabled
 * @param disable Boolean
 */

export function disableInput(elem: HTMLInputElement, disable: boolean) {
    if (elem instanceof HTMLDocument || typeof disable !== 'boolean') {
        throw new Error('Function expects a DOM element and boolean condition: disableInput(elem, disable)');
    }

    elem.disabled = disable;
    elem.style.opacity = disable ? '0.4' : '1';
}

import { createElement } from "../createElement.js";


/**
 * @param {string} classes
 * @param {string} buttonText
 * @param {...Object<string, any>} options
 * @returns {HTMLElement}
 */
export function createButton(classes, buttonText = '', options = {})
{
    return createElement('button', {className: "button " + classes, ...options}, [buttonText]);
}
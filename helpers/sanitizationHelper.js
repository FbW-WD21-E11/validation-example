/**
 * Capitalize the first letter of the word supplied as parameter
 * @param {*} word 
 * @returns 
 */
export const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Converts input to title case e.g testing_this to Testing This
 * @param input string to convert to title case
 */
export const toTitleCase = (input: string): string => {
    return input.split('_').reduce((prev, curr) => prev + curr.slice(0, 1).toLocaleUpperCase() + curr.slice(1).toLocaleLowerCase() + ' ', '');
};
export function getSingularity(word: string): string {
    return word ? word.slice(0, -1) : '';
}

import snarkdown from 'snarkdown';

export function parseMarkdown(input: string) {
    if (!input) return ""
    return snarkdown(input)
}
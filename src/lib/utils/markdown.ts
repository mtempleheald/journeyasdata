import snarkdown from 'snarkdown';

export default function parseMarkdown(input: string | null | undefined) {
	if (!input) return '';
	return snarkdown(input);
}

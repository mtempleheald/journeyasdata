import snarkdown from 'snarkdown';

export default function parseMarkdown(input: string) {
	if (!input) return '';
	return snarkdown(input);
}

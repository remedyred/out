declare module 'ansi-styles-template' {
	export const replacementMap: Map<string, {opener: string; closer: string}>

	export function template(
			str: string,
			options?: {
				leftBrace?: string
				rightBrace?: string
				strict?: boolean
			}
	): string

	export function validate(): void
}

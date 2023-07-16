import {stripAnsi} from '@snickbit/ansi'
import {isBrowser} from 'browser-or-node'
import {inspect} from 'node-inspect-extracted'
import {default_inspection_options, StringCase} from './config'
import {lineWidth, terminalWidth} from './helpers'

/**
 * @param {string} text - The text to format
 * @param {StringCase} [case_type] - The case type to format to
 * @returns {string}
 */
export function formatCase(text, case_type: StringCase) {
	switch (case_type) {
		case StringCase.upper: {
			return text.toUpperCase()
		}
		case StringCase.lower: {
			return text.toLowerCase()
		}
		case StringCase.camel:
		case StringCase.pascal: {
			return text.replaceAll(/\s(.)/g, $1 => $1.toUpperCase()).replaceAll(/\s/g, '')
		}
		case StringCase.snake: {
			return text.replaceAll(/\s/g, '_').toLowerCase()
		}
		case StringCase.kebab:
		case StringCase.slug: {
			return text.replaceAll(/\s/g, '-').toLowerCase()
		}
		case StringCase.title: {
			return text.replaceAll(/\s(.)/g, $1 => $1.toUpperCase())
		}
		case StringCase.sentence: {
			return text.charAt(0).toUpperCase() + text.slice(1)
		}
		case StringCase.constant: {
			return text
				.replaceAll(/\s(.)/g, $1 => $1.toUpperCase())
				.replaceAll(/\s/g, '_')
				.toUpperCase()
		}
		case StringCase.symbol: {
			return text.replaceAll(/\s/g, '_').toUpperCase()
		}
		default: {
			return text
		}
	}
}

/**
 * Inspect a variable
 * @param {any} value
 * @param {object} [options]
 */
export function _inspect(value, options = {}) {
	return isBrowser ? value : inspect(value, {...default_inspection_options, ...options})
}

/**
 * Generate a horizontal line
 */
export const horizontalLine = (symbol: string, min?: number, max?: number): string => symbol.repeat(lineWidth(min, max))

/**
 * Center the given text in the terminal between the given symbol
 * @param {string} text
 * @param {string} [symbol=' ']
 * @param {number} [padding=2]
 * @returns {string}
 */
export function centerText(text: string, symbol = ' ', padding = 2) {
	const parts = text.split('\n')
	const text_length = Math.max(longestString(parts),	1)
	const pad_len = Math.max(Math.floor((terminalWidth() - text_length) / 2) - 2, 0)
	const str_pad = (symbol || ' ').repeat(pad_len) + ' '.repeat(padding)
	return parts.map(part => str_pad + part + [...str_pad].reverse().join('')).join('\n')
}

function longestString(texts) {
	let longest = 0
	for (const text of texts) {
		longest = Math.max(longest, stripAnsi(text).length)
	}
	return longest
}

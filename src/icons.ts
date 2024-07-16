import {isBrowser, isNode} from 'browser-or-node'

const icons: Record<string, any> = {
	log: {
		unicode: '>\uFE0F',
		text: 'log'
	},
	info: {
		unicode: 'i\uFE0F',
		text: 'info'
	},
	success: {
		unicode: '✓\uFE0F',
		text: 'success'
	},
	done: {
		unicode: '🏁',
		text: 'done'
	},
	warn: {
		unicode: '\u26A0\uFE0F',
		text: 'warn'
	},
	fatal: {
		unicode: '💀',
		text: 'fatal'
	},
	error: {
		unicode: '❌',
		text: 'error'
	},
	exception: {
		unicode: '🚫',
		text: 'exception'
	},
	debug: {
		unicode: '🐝',
		text: 'debug'
	},
	trace: {
		unicode: '🔍',
		text: 'trace'
	},
	verbose: {
		unicode: '📣',
		text: 'verbose'
	},
	silly: {
		unicode: '📢',
		text: 'silly'
	},
	notice: {
		unicode: '‼\uFE0F',
		text: 'notice'
	}
}

export type IconDefinition = {
	symbol: string
	type: string
}

/**
 * Get the icon for a log level
 */
export function getIcon(symbol: string, type = 'unicode'): IconDefinition {
	if (type === 'unicode' && !isUnicodeSupported()) {
		type = 'text'
	}

	const result = icons[symbol] ? icons[symbol][type] : symbol

	return {
		symbol: result,
		type
	}
}

export type LabelDefinition = IconDefinition & {
	text: string
}

/**
 * Get icon set for a log level
 */
export function getLabel(symbol: string): LabelDefinition {
	return {
		...getIcon(symbol),
		text: symbol
	}
}

let _isUnicodeSupported: boolean | undefined

/**
 * Check if unicode is supported
 */
export function isUnicodeSupported(): boolean {
	if (_isUnicodeSupported === undefined) {
		if (isBrowser) {
			_isUnicodeSupported = true
		} else if (isNode) {
			const tests = {
				is_not_windows_and_not_term_linux: process.platform !== 'win32' && process.env.TERM !== 'linux',
				is_ci: Boolean(process.env.CI),
				is_wt: Boolean(process.env.WT_SESSION),
				is_conemu: process.env.ConEmuTask === '{cmd::Cmder}',
				is_vscode: process.env.TERM_PROGRAM === 'vscode',
				is_terminal_emulator: Boolean(process.env.TERMINAL_EMULATOR),
				is_xterm: process.env.TERM === 'xterm-256color',
				is_alacritty: process.env.TERM === 'alacritty'
			}

			_isUnicodeSupported = Object.values(tests).some(Boolean)
		}
	}

	return !!_isUnicodeSupported
}

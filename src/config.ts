import {Cycle} from '@snickbit/cycle'
import {isBrowser} from 'browser-or-node'
import {Out} from './Out'

export type CaseType =
	'camel'
	| 'constant'
	| 'kebab'
	| 'lower'
	| 'none'
	| 'pascal'
	| 'sentence'
	| 'slug'
	| 'snake'
	| 'symbol'
	| 'title'
	| 'upper'

export enum StringCase {
	camel = 'camel',
	constant = 'constant',
	kebab = 'kebab',
	lower = 'lower',
	none = 'none',
	pascal = 'pascal',
	sentence = 'sentence',
	slug = 'slug',
	snake = 'snake',
	symbol = 'symbol',
	title = 'title',
	upper = 'upper'
}

export interface OutPersistent {
	name: string
	prefix: OutPersistentPrefix
	verbosity: number
}

export interface OutPersistentPrefix {
	color: string
	text: string
}

export enum Verbosity {
	off = -1,
	fatal = 0,
	error = 1,
	display = 2,
	warn = 3,
	debug = 4,
	trace = 5,
	all = 6
}

export interface OutState {
	[key: string]: any
}

export class OutState {
	block = false
	broken = false
	case: StringCase = StringCase.none
	center = false
	color = ''
	dominant = false
	exit?: boolean | number
	extras: any[] = []
	extras_verbosity: Verbosity | number = Verbosity.error
	force = false
	heading = ''
	label = ''
	throw = false
	title = false
	verbosity: Verbosity | number = Verbosity.display
	after?: (state: OutState) => OutState | undefined | void
	before?: (state: OutState) => OutState | undefined | void
	formatter?: (message: any) => any
}

export const defaultWidth = isBrowser ? 100 : 20

export const _console = console

export const default_inspection_options = {
	maxStringLength: 300,
	colors: true,
	showHidden: true,
	depth: 3
}

export const colorCycle = new Cycle('hex')

export interface OutStyle {
	color: string
	label: string
	verbosity: number
	force?: boolean
	dominant?: boolean
	exit?: boolean | number
	broken?: boolean
	title?: boolean
	block?: boolean
	throw?: boolean
	center?: boolean
	breadcrumbs?: string

	[key: string]: boolean | number | string | undefined
}

export interface OutStyles {
	log(...messages: any): void

	info(...messages: any): void

	silly(...messages: any): void

	trace(...messages: any): void

	warn(...messages: any): void

	debug(...messages: any): void

	verbose(...messages: any): void

	notice(...messages: any): void

	exception(...messages: any): void

	error(...messages: any): void

	throw(...messages: any): void

	fatal(...messages: any): void

	success(...messages: any): void

	done(...messages: any): void
}

export const styles: Record<string, OutStyle> = {
	log: {
		color: '#FFF',
		label: 'log',
		verbosity: Verbosity.display
	},
	info: {
		color: '#1FCCC6',
		dominant: true,
		label: 'info',
		verbosity: Verbosity.display
	},
	silly: {
		color: '#6F7783',
		verbosity: Verbosity.all,
		label: 'silly'
	},
	trace: {
		color: '#6F7783',
		verbosity: Verbosity.trace,
		label: 'trace'
	},
	warn: {
		color: '#CCC91F',
		dominant: true,
		verbosity: Verbosity.warn,
		label: 'warn'
	},
	debug: {
		color: '#CC991F',
		verbosity: Verbosity.debug,
		label: 'debug'
	},
	verbose: {
		color: '#C78822',
		verbosity: Verbosity.trace,
		label: 'verbose'
	},
	notice: {
		color: '#C37725',
		dominant: true,
		verbosity: Verbosity.error,
		label: 'notice'
	},
	exception: {
		color: '#BF6629',
		dominant: true,
		verbosity: Verbosity.error,
		label: 'exception'
	},
	error: {
		color: '#BA552C',
		dominant: true,
		verbosity: Verbosity.error,
		label: 'error'
	},
	throw: {
		color: '#B6442F',
		dominant: true,
		throw: true,
		verbosity: Verbosity.display,
		label: 'error'
	},
	fatal: {
		color: '#B23333',
		dominant: true,
		exit: 1,
		verbosity: Verbosity.fatal,
		label: 'fatal'
	},
	success: {
		color: '#5FCC1F',
		dominant: true,
		label: 'success',
		verbosity: Verbosity.display
	},
	done: {
		color: '#5FCC1F',
		dominant: true,
		label: 'done',
		verbosity: Verbosity.display,
		exit: 0
	}
}

export type OutModifierMethod = (out: Out) => Out

export type OutModifier = OutModifierMethod | any

export const modifiers: Record<string, OutModifier> = {
	exit: true,
	noExit(out: Out) {
		out.state.exit = undefined
		out.lock('exit')
		return out
	},
	broken: true,
	center: true,
	title: true,
	block(out: Out) {
		out.state.block = true
		out.state.center = true
		return out
	},
	force: true,
	ln(out: Out) {
		_console.log()
		return out
	}
}

export interface OutSettings {
	textColor: boolean
	verbosity: number

	[key: string]: boolean | number | string
}

export const settings: OutSettings = {
	textColor: false,
	verbosity: Verbosity.display
}

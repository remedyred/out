import {stripAnsi} from '@snickbit/ansi'
import {isBoolean, isCallable, isFunction, isNumber, isObject, isPrimitive, isString} from '@snickbit/utilities'
import {template} from 'ansi-styles-template'
import {isBrowser, isNode} from 'browser-or-node'
import {inspect} from 'node-inspect-extracted'
import {
	_console,
	CaseType,
	colorCycle,
	modifiers,
	OutModifierMethod,
	OutPersistent,
	OutSettings,
	OutState,
	OutStyle,
	settings,
	StringCase,
	styles,
	Verbosity
} from './config'
import {example, lineWidth, noop, terminalWidth, wrapColor} from './helpers'
import {getLabel} from './icons'
import {_inspect, centerText, formatCase, horizontalLine} from './render'
import {getVerbosity, setVerbosity} from './verbosity'

/**
 * Cross-platform pretty output for your terminal or browser console.
 */
export interface Out extends Function {

	/**
	 * Log level output
	 */
	log: Out

	/**
	 * Info level output
	 */
	info: Out

	/**
	 * Silly level output
	 */
	silly: Out

	/**
	 * Trace level output
	 */
	trace: Out

	/**
	 * Warn level output
	 */
	warn: Out

	/**
	 * Debug level output
	 */
	debug: Out

	/**
	 * Verbose level output
	 */
	verbose: Out

	/**
	 * Notice level output
	 */
	notice: Out

	/**
	 * Exception level output
	 */
	exception: Out

	/**
	 * Error level output
	 */
	error: Out

	/**
	 * Same as error level output but also throws an error
	 */
	throw: Out

	/**
	 * Fatal level output. In Node.js this will also exit the process with a 1 exit code.
	 */
	fatal: Out

	/**
	 * Success level output
	 */
	success: Out

	/**
	 * Done level output. In Node.js this will also exit the process with a 0 exit code.
	 */
	done: Out

	/**
	 * (Node.js only) Exit the process with the given code, defaults to 0
	 */
	exit: Out

	/**
	 * Disable exiting
	 */
	noExit: Out

	/**
	 * Break the output into multiple lines
	 */
	broken: Out

	/**
	 * Center the text in the terminal, only works in Node.js. In the browser the text will be relatively centered with itself,
	 * but not in the entire console window.
	 */
	center: Out

	/**
	 * Print the output with a double horizontal line below it
	 */
	title: Out

	/**
	 * Print the output with a horizontal line above and below it
	 */
	block: Out

	/**
	 * Force the output to be rendered regardless of verbosity
	 */
	force: Out

	/**
	 * Print an empty line
	 */
	ln: Out

	(...messages: any[]): Out

	apply(this: Out, ...messages: any[]): Out

	call(...messages: any[]): Out
}

type RenderData = {
	messages: any[]
	length: number
	label: string
	spacer: string
	heading: string
	broken: boolean
}

const defaultState = new OutState()

/**
 * Cross-platform pretty output for your terminal or browser console.
 */
export class Out extends Function {
	/** @internal */
	state: OutState = new OutState()

	/** @internal */
	persistent: Partial<OutPersistent> = {
		name: '',
		prefix: undefined,
		verbosity: Verbosity.display // override environment verbosity
	}

	#locked: string[] = []
	readonly #proxy: Out
	#lastLink = ''

	constructor()
	constructor(options: Partial<OutSettings>)
	constructor(name: string)
	constructor(name: string, options: Partial<OutSettings>)
	constructor(name?: Partial<OutSettings> | string, options?: Partial<OutSettings>)
	constructor(name?: Partial<OutSettings> | string, options?: Partial<OutSettings>) {
		super()

		if (isString(name)) {
			this.persistent.name = name
			if (name) {
				this.prefix(name)
			}
		} else if (name) {
			options = name as Partial<OutSettings>
		}

		if (options) {
			this.config(options)
		}

		this.#proxy = new Proxy(this, {
			get: (target, prop: string, receiver) => {
				this.#lastLink = prop
				if (prop in styles) {
					target.#storeStyle(styles[prop])
					return target.#proxy
				}

				if (prop in modifiers) {
					if (isFunction(modifiers[prop])) {
						(modifiers[prop] as OutModifierMethod)(target)
					} else {
						target.state[prop] = modifiers[prop]
					}
					return target.#proxy
				}

				const targetProp = prop as keyof Out
				if (targetProp in target && isFunction(target[targetProp])) {
					return target[targetProp].bind(target)
				}

				return Reflect.get(target, prop, receiver)
			},
			apply: (target, _thisArg, argArray) => {
				if (this.#lastLink in modifiers && !isFunction(modifiers[this.#lastLink])) {
					target.state[this.#lastLink] = argArray.shift()
					return target.#proxy
				}

				return target.#render(...argArray)
			},
			set(target, prop: string, value) {
				if (prop in modifiers) {
					target.state[prop] = value
					return true
				}

				return Reflect.set(target, prop, value)
			}
		}) as unknown as Out
		return this.#proxy
	}

	example() {
		return example()
	}

	config(options: Partial<OutSettings>): Out

	config(option: keyof OutSettings, value: boolean): Out

	config(option: Partial<OutSettings> | keyof OutSettings, value?: boolean | number): Out {
		if (typeof option === 'string') {
			if (value) {
				settings[option] = value
			} else {
				delete settings[option]
			}
		} else {
			Object.assign(settings, option)
		}
		this.persistent.verbosity = settings?.verbosity || Verbosity.display
		return this.#proxy
	}

	/**
	 * Set the persistent name of the Out app.
	 * @param {string} name
	 */
	setName(name: string): Out {
		this.persistent.name = name
		return this.#proxy
	}

	clone()

	clone(options: Partial<OutSettings>)

	clone(name: string)

	clone(name: string, options: Partial<OutSettings>)

	clone(name?: Partial<OutSettings> | string, options?: Partial<OutSettings>)

	clone(name?: Partial<OutSettings> | string, options?: Partial<OutSettings>) {
		if (isString(name)) {
			options = options as Partial<OutSettings>
		} else if (name) {
			options = name as Partial<OutSettings>
			name = this.persistent.name
		}

		const out = new Out(name, options)
		if (name) {
			out.prefix(name as string)
		}
		return out
	}

	/**
	 * Print the output without any extra formatting, useful for the end of chains
	 */
	write(...messages: any[]): Out {
		this.#render(...messages)
		return this.#proxy
	}

	rule(symbol?: string, min?: number, max?: number): Out {
		return this.write(horizontalLine(symbol || '-', min ?? 20, max))
	}

	/**
	 * Output the store
	 */
	_(message: string): void

	_(exit: boolean): void

	_(arg?: boolean | string) {
		let exit = false,
			message = ''
		if (isBoolean(arg)) {
			exit = arg
		} else if (isString(arg)) {
			message = arg
		}

		_console.log(inspect({
			state: this.state,
			persistent: this.persistent,
			isVerbose: this.isVerbose(),
			getVerbosity: this.getVerbosity(),
			modifiers
		},
		{
			depth: null,
			colors: true
		}),
		message)
		if (exit) {
			if (isNode) {
				// eslint-disable-next-line unicorn/no-process-exit
				process.exit(0)
			}
			if (isBrowser) {
				throw new Error('Cannot exit in browser')
			}
		}
	}

	/**
	 * Set the minimum verbosity level
	 */
	verbosity(verbosity?: number): Out {
		this.state.verbosity = isNumber(verbosity) ? verbosity : (this.state.verbosity || 0) + 1
		this.lock('verbosity')
		return this.#proxy
	}

	/**
	 * Set the minimum verbosity level
	 * @param {number} [verbosity=1]
	 * @returns {Out}
	 */
	v(verbosity?: number): Out {
		return this.verbosity(verbosity)
	}

	/**
	 * Check if the environment verbosity is >= the given level
	 */
	isVerbose(level = Verbosity.warn): boolean {
		return this.getVerbosity(this.persistent.name) >= level
	}

	/**
	 * Get the environment verbosity
	 */
	getVerbosity(name?: string): number {
		name ||= this.persistent.name
		return getVerbosity(name)
	}

	/**
	 * Override the environment verbosity level
	 */
	setVerbosity(level?: number | null): Out {
		setVerbosity(level, this.persistent.name)
		return this.#proxy
	}

	/**
	 * Add a prefix to all future output for this instance
	 */
	prefix(text?: string, verbosity?: number | null): Out {
		if (text) {
			this.persistent.prefix = {
				text,
				color: colorCycle.next()
			}
			this.persistent.verbosity = verbosity ?? this.persistent.verbosity
		} else {
			delete this.persistent.prefix
		}

		return this.#proxy
	}

	/**
	 * Add a callback to be applied to each line of output
	 */
	formatter(callback: (messages: string) => string): Out {
		if (!isCallable(callback)) {
			throw new Error('The callback must be a synchronous function')
		}

		this.state.formatter = callback
		return this.#proxy
	}

	/**
	 * Add a callback to be called before rendering the output
	 */
	before(callback: (state: OutState) => OutState | undefined | void): Out {
		if (!isCallable(callback)) {
			throw new Error('The callback must be a synchronous function')
		}

		this.state.before = callback
		return this.#proxy
	}

	/**
	 * Add a callback to be called after rendering the output
	 */
	after(callback: (state: OutState) => OutState | undefined | void): Out {
		if (!isCallable(callback)) {
			throw new Error('The callback must be a synchronous function')
		}

		this.state.after = callback
		return this.#proxy
	}

	/**
	 * Add extra outputs with separate verbosity
	 */
	extra(...args: any[]): Out {
		this.state.extras ||= []
		this.state.extras.push(...args)
		return this.#proxy
	}

	/**
	 * Set verbosity of extra outputs
	 */
	extraVerbosity(extras_verbosity?: number): Out {
		this.state.extras_verbosity = isNumber(extras_verbosity) ? extras_verbosity : (this.state.extras_verbosity || 0) + 1
		if (!this.isLocked('extras_verbosity')) {
			this.lock('extras_verbosity')
		}
		return this.#proxy
	}

	/**
	 * Set verbosity of extra outputs. Default is 1
	 */
	ev(extras_verbosity: number): Out {
		return this.extraVerbosity(extras_verbosity)
	}

	/**
	 * Set the case of the messages, applies to all string values given to the final method
	 */
	case(type: CaseType | StringCase): Out {
		this.state.case = type as StringCase
		return this.#proxy
	}

	/**
	 * Set the heading of the messages
	 */
	heading(heading: string): Out {
		this.state.heading = heading
		return this.#proxy
	}

	/**
	 * Set the label of the messages
	 */
	label(label: string): Out {
		this.state.label = label
		return this.#proxy
	}

	/**
	 * Clear the console. Only works in Node.js
	 */
	clear(): Out {
		_console.clear()
		return this.#proxy
	}

	/**
	 * Disable the console. Optional 'exclusions' parameter to allow specific commands
	 */
	disable(exclusions: string[] = []): Out {
		if (this.isVerbose()) {
			return this.#proxy
		}
		if (!exclusions.includes('log')) {
			console.log = noop
		}
		if (!exclusions.includes('info')) {
			console.info = noop
		}
		if (!exclusions.includes('warn')) {
			console.warn = noop
		}
		if (!exclusions.includes('error')) {
			console.error = noop
		}
		return this.#proxy
	}

	/**
	 * Enable the console after it has been disabled
	 */
	enable(): Out {
		console.log = _console.log
		console.info = _console.info
		console.warn = _console.warn
		console.error = _console.error
		return this.#proxy
	}

	/**
	 * lock a state key
	 * @internal
	 */
	lock(key: string): Out {
		if (!this.#locked.includes(key)) {
			this.#locked.push(key)
		}
		return this.#proxy
	}

	/**
	 * clear all #locked state keys
	 * @internal
	 */
	clearLock(): Out {
		this.#locked = []
		return this.#proxy
	}

	/**
	 * check if a state key is #locked
	 * @internal
	 */
	isLocked(key: string): boolean {
		return this.#locked.includes(key)
	}

	/**
	 * clear the state
	 * @internal
	 */
	#clearStore(...exclusions: string[]) {
		const state_keys = Object.keys(this.state)
		for (const key of state_keys) {
			if (key in defaultState) {
				this.state[key] = defaultState[key]
			} else if (!exclusions || !exclusions.includes(key)) {
				delete this.state[key]
			}
		}
		return this.#proxy
	}

	/**
	 * apply the style properties to the state
	 * @internal
	 */
	#storeStyle(style: Partial<OutStyle>): void {
		this.state ||= {...defaultState, ...styles.log}

		for (const prop of Object.keys({...this.state, ...style})) {
			if (!this.isLocked(prop)) {
				switch (prop) {
					case 'breadcrumbs':
					case 'dominant':
					case 'verbosity': {
						break
					}
					case 'color': {
						if (style.color) {
							this.state.color = style.color
						} else if (style.dominant || this.state?.dominant || !this.state.color) {
							this.state.color = styles.log.color
						}
						break
					}
					case 'throw':
					case 'exit': {
						this.state[prop] = style[prop] as any
						break
					}
					default: {
						this.state[prop] = style[prop] === undefined ? this.state[prop] : style[prop]
						break
					}
				}
			}
		}

		if (this.state.force) {
			this.lock('force')
		}

		if (!this.isLocked('verbosity')) {
			style.verbosity = isNumber(style.verbosity) ? style.verbosity : Verbosity.display
			this.state.verbosity = isNumber(this.state.verbosity) ? this.state.verbosity : Verbosity.display
			this.state.verbosity = style.verbosity > this.state.verbosity ? style.verbosity : this.state.verbosity
		} else if (style.force) {
			this.state.verbosity = Verbosity.fatal
		}

		if (style.breadcrumbs) {
			this.state.breadcrumbs += `:${style.label}`
		} else {
			this.state.breadcrumbs = this.state.label || ''
		}
	}

	/**
	 * reset the state
	 * @private1
	 * @internal
	 */
	#reset(...exclusions: string[]) {
		this.#clearStore(...exclusions)
		this.clearLock()

		if (this.persistent.verbosity) {
			this.state.verbosity = this.persistent.verbosity
			this.state.modifiersverbosity = this.persistent.verbosity
		}
	}

	/**
	 * get colorize object
	 */
	private getColorize() {
		return {
			text: text => settings.textColor && this.state.color ? wrapColor(this.state.color, text) : text,
			color: text => this.state.color ? wrapColor(this.state.color, text) : text,
			prefix: text => this.persistent.prefix?.color ? wrapColor(this.persistent.prefix.color, text) : text
		}
	}

	/**
	 * Format the message
	 */
	private formatMessage(string: string) {
		const string_type = typeof string
		const is_string = string_type === 'string'
		const is_inspectable = isObject(string) || isCallable(string)
		const colorize = this.getColorize()

		if (is_string) {
			if (this.state.case) {
				string = formatCase(string, this.state.case)
			}

			const clean_string = stripAnsi(template(string))
			let padded_string = clean_string
			if (this.state.title) {
				padded_string = padded_string.padStart(lineWidth(20, clean_string.length + 10), '  ')
			} else if (this.state.center) {
				padded_string = centerText(padded_string, this.state.center ? ' ' : this.state.center)
			}
			string = padded_string.replace(clean_string, string)
		}

		// stringify and colorize
		if (is_string || string_type === 'number') {
			string = colorize.text(string)

			if (is_string) {
				string = template(string)
			}
		} else if (!this.state.color || is_inspectable) {
			string = _inspect(string)
		} else {
			string = colorize.text(_inspect(string, {colors: false}))
		}

		return string
	}

	private formatError(err: Record<string, any>, verbosity = Verbosity.display) {
		if (verbosity < Verbosity.debug) {
			return err
		}

		const errObj: Record<string, any> = {}

		if (err?.name) {
			errObj.name = err.name
		}

		if (err?.message) {
			errObj.message = err.message
		}

		if (err?.stack) {
			errObj.stack = err.stack
		}

		if (err?.code) {
			errObj.code = err.code
		}

		if (err?.status) {
			errObj.status = err.status
		}

		if (err?.number) {
			errObj.number = err.number
		}

		if (err?.fileName) {
			errObj.fileName = err.fileName
		}

		return errObj
	}

	/**
	 * Print the header if it exists
	 */
	private header(messages: RenderData) {
		const colorize = this.getColorize()

		if (this.state.title) {
			_console.log('\n')
		} else if (this.state.block || messages.heading) {
			if (messages.heading) {
				_console.log(colorize.color(centerText(`${template(`{bold}${messages.heading}{/bold}`)}`, '-')))
			} else {
				_console.log(colorize.color(horizontalLine('-', messages.length)))
			}
		}
	}

	/**
	 * Print the footer if it exists
	 * @param messages
	 */
	private footer(messages: RenderData) {
		const colorize = this.getColorize()
		const clean_length = messages.length
		if (this.state.title) {
			_console.log(colorize.color(horizontalLine('=', 20, clean_length + 8)), '\n')
		} else if (this.state.block) {
			_console.log(colorize.color(horizontalLine('-', clean_length)))
		}
	}

	/**
	 * Render the output
	 * @private
	 * @internal
	 */
	#render(...args: any[]): Out {
		if (!this.state) {
			throw new Error('No state found')
		}

		if (this.state.before) {
			const beforeResults = this.state.before({...this.state})
			if (beforeResults) {
				this.state = beforeResults
			}
		}

		if (this.state.force || this.isVerbose(this.state.verbosity)) {
			const colorize = this.getColorize()

			const data: RenderData = {
				messages: [],
				length: 0,
				label: '',
				spacer: '',
				heading: '',
				broken: this.state.broken
			}

			const non_primitive_message_indexes: number[] = []

			for (let string of args) {
				if (string instanceof Error) {
					string = this.formatError(string, this.state.verbosity)
				}

				const formatted = this.formatMessage(string)
				data.length = Math.max(data.length, stripAnsi(formatted).length)
				data.messages.push(formatted)
				if (!isPrimitive(string)) {
					non_primitive_message_indexes.push(data.messages.length - 1)
				}
			}

			if (this.state.extras && this.isVerbose(this.state.extras_verbosity)) {
				for (const extra of this.state.extras) {
					const formatted = this.formatMessage(extra)
					data.length = Math.max(data.length, stripAnsi(formatted).length)
					data.messages.push(formatted)
					if (!isPrimitive(extra)) {
						non_primitive_message_indexes.push(data.messages.length - 1)
					}
				}
			}

			const label_symbols = getLabel(this.state.label)

			if (!this.state.title && !this.state.center && !this.state.block) {
				data.spacer = colorize.color('|')
				data.label = ''
				if (this.persistent.prefix) {
					data.label += this.persistent.prefix ? `${colorize.prefix(this.persistent.prefix.text)} ` : ''
				}

				data.label += colorize.color('#')

				if (this.state.label) {
					data.label += colorize.color(label_symbols.symbol)
				}
			}

			if (this.state.heading || this.state.block) {
				if (this.state.heading) {
					data.heading = this.state.heading
				} else if (this.state.title && label_symbols.text && !label_symbols.symbol) {
					data.heading = this.state.label || label_symbols.text
				}
			}

			this.header(data)

			let has_printed_label = false

			const message_group: any[] = []
			let has_printed_group = false

			const joinedMessages = (pull?: boolean) => (pull ? message_group.splice(0) : message_group).join(` ${data.spacer} `)

			const printGroup = () => {
				if (message_group.length) {
					printOutput(joinedMessages(true))
				}
			}

			const printOutput = (output: any, inspectable?: any) => {
				let output_items = [output]
				let output_label = ''
				if (!has_printed_label) {
					if (data.label) {
						output_label = data.label
					}
					has_printed_label = true
				} else if (has_printed_group) {
					output_label = data.spacer + ' '.repeat(Math.max(stripAnsi(data.label).length - 1, 0))
				}

				if (output_label) {
					if (inspectable) {
						output_items.unshift(output_label)
					} else {
						output_items = [`${output_label} ${output}`]
					}
				}

				_console.log(...output_items)
				has_printed_group = true
			}

			// eslint-disable-next-line prefer-const
			for (let [index, message] of data.messages.entries()) {
				const inspectable = non_primitive_message_indexes.includes(index)

				if (inspectable) {
					printGroup()
					printOutput(message, true)
				} else {
					if (data.broken || joinedMessages().length + message.length > terminalWidth()) {
						printGroup()
					}

					if (this.state.formatter) {
						message = this.state.formatter(message) || message
					}

					message_group.push(message)
				}
			}
			printGroup()

			this.footer(data)
		}

		if (this.state.exit !== undefined) {
			if (this.state.throw) {
				throw new Error(Number.isNaN(this.state.exit) ? `Process exited with error.` : `Process exited with code: ${this.state.exit}`)
			}

			const exitCode = +this.state.exit

			if (isNode) {
				// eslint-disable-next-line unicorn/no-process-exit
				process.exit(exitCode)
			} else {
				throw new Error(`Process exited with code: ${exitCode}`)
			}
		}

		this.#reset()

		if (this.state.after) {
			const afterResults = this.state.after({...this.state})
			if (afterResults) {
				this.state = afterResults
			}
		}

		return this.#proxy
	}
}

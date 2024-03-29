import {isBrowser, isNode} from 'browser-or-node'
import {Verbosity} from './config'
import picomatch from 'picomatch-browser'

interface VerbosityConfig {
	global: Verbosity
	apps: Record<string, Verbosity>
	checked: boolean
}

const verbosity: VerbosityConfig = {
	global: Verbosity.display,
	apps: {},
	checked: false
}

/**
 * Check if the verbosity is at least the given level
 * @param {number} [level=1] - The level to check against
 * @returns {boolean}
 */
export const isVerbose = (level = 1): boolean => getVerbosity() >= level

const FLAG_REGEX = /(?<flag>-v+|--verbose|--verbosity|--out)/
const ENV_REGEX = /(?<flag>verbose|verbosity|out)/
const APP_REGEX = /(:(?<app>[^:=]+))/
const LEVEL_REGEX = /(=(?<level>\d+))/

export function getEnvVerbosity(env: Record<string, string> | string[] | typeof process.env) {
	if (env) {
		const is_object = !Array.isArray(env)

		for (const key in env) {
			const arg = is_object ? `${key}=${env[key]}` : env[key]
			const reg = is_object
				? new RegExp(`^(${ENV_REGEX.source})`)
				: new RegExp(`^(${FLAG_REGEX.source})`)

			if (reg.test(arg)) {
				const groupReg = new RegExp(`^${is_object ? ENV_REGEX.source : FLAG_REGEX.source}${APP_REGEX.source}?${LEVEL_REGEX.source}?$`, 'gmi')
				const parsedArgs = [...arg.matchAll(groupReg)]

				if (parsedArgs && parsedArgs.length) {
					for (const parsedArg of parsedArgs) {
						const {
							flag,
							app,
							level
						} = parsedArg.groups

						let parsedLevel: number
						let increment = false
						if (flag.startsWith('-v')) {
							parsedLevel = flag.length - 1
							increment = parsedLevel === 1
						} else {
							parsedLevel = level ? Number.parseInt(level) : 1
						}

						if (app) {
							verbosity.apps[app] ??= Verbosity.display
							verbosity.apps[app] = increment ? verbosity.apps[app] + parsedLevel : parsedLevel
						}

						if (!app && flag !== '--out' || app === '*') {
							verbosity.global ??= Verbosity.display
							verbosity.global = increment ? verbosity.global + parsedLevel : parsedLevel
						}
					}
				}
			}
		}
	}
}

export function processVerbosity() {
	verbosity.global = Verbosity.display

	if (isNode) {
		getEnvVerbosity(process.env)
		getEnvVerbosity(process.argv)
	} else if (isBrowser) {
		const store: any = {}
		const reg = new RegExp(`^(${ENV_REGEX.source})`)
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			if (key && reg.test(key)) {
				store[key] = localStorage.getItem(key)
			}
		}
		if (Object.keys(store).length) {
			getEnvVerbosity(store)
		}
	}

	verbosity.checked = true
}

function stringifyAppValues() {
	return Object.keys(verbosity.apps)
		.map(app => `${app}:${verbosity.apps[app]}`)
		.join(',')
}

export function setProcessVerbosity(value, app = null) {
	if (isNode) {
		if (app) {
			verbosity.apps[app] = value
			process.env.OUT = stringifyAppValues()
		} else {
			verbosity.global = value
			process.env.VERBOSE = value
		}
	} else if (isBrowser) {
		if (app) {
			verbosity.apps[app] = value
			window.localStorage.setItem('out', stringifyAppValues())
		} else {
			verbosity.global = value
			window.localStorage.setItem('verbosity', value)
		}
	}
}

/**
 * Get and parse the verbosity from the CLI
 * @param {string} [app] - The name of the app to get the verbosity for
 * @returns {null|number}
 */
export function getVerbosity(app?: string) {
	if (!verbosity.checked) {
		processVerbosity()
	}

	if (!app || verbosity.apps['*']) {
		return verbosity.global
	}

	verbosity.apps[app] ??= verbosity.global

	const matches: Verbosity[] = []
	for (const v_app in verbosity.apps) {
		if (picomatch(v_app)(app)) {
			matches.push(verbosity.apps[v_app])
		}
	}

	return matches.length ? Math.max(...matches) : verbosity.global
}

/**
 * Temporarily set the verbosity
 * @param {Verbosity} [level=Verbosity.display]
 * @param {string} [app]
 */
export function setVerbosity(level: Verbosity | number | null | undefined = Verbosity.display, app?: string) {
	if (app) {
		if (level === undefined || level === null) {
			delete verbosity.apps[app]
		} else {
			verbosity.apps[app] = level
		}
	} else if (level === undefined || level === null) {
		verbosity.global = Verbosity.display
	} else {
		verbosity.global = level
	}
}

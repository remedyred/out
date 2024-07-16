declare module 'picomatch-browser' {
	export interface PicomatchOptions {
		// Options as defined by picomatch documentation, simplified here for brevity
		nocase?: boolean
		dot?: boolean
		// Add other relevant options based on actual library usage
	}

	export type MatcherFunction = (testString: string) => boolean

	function picomatch(patterns: string[] | string, options?: PicomatchOptions): MatcherFunction

	export default picomatch
}

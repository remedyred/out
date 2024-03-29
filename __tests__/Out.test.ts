import {Out} from '../src'

describe('Out', () => {
	let instance
	beforeEach(() => {
		instance = new Out()
	})
	it('instance should be an instanceof Out', () => expect(instance).toBeInstanceOf(Out))
	it('should have a method example()', () => expect(typeof instance.example).toBe('function'))
	it('should have a method config()', () => expect(typeof instance.config).toBe('function'))
	it('should have a method clone()', () => expect(typeof instance.clone).toBe('function'))
	it('should have a method write()', () => expect(typeof instance.write).toBe('function'))
	it('should have a method rule()', () => expect(typeof instance.rule).toBe('function'))
	it('should have a method _()', () => expect(typeof instance._).toBe('function'))
	it('should have a method verbosity()', () => expect(typeof instance.verbosity).toBe('function'))
	it('should have a method v()', () => expect(typeof instance.v).toBe('function'))
	it('should have a method isVerbose()', () => expect(typeof instance.isVerbose).toBe('function'))
	it('should have a method getVerbosity()', () => expect(typeof instance.getVerbosity).toBe('function'))
	it('should have a method setVerbosity()', () => expect(typeof instance.setVerbosity).toBe('function'))
	it('should have a method prefix()', () => expect(typeof instance.prefix).toBe('function'))
	it('should have a method formatter()', () => expect(typeof instance.formatter).toBe('function'))
	it('should have a method before()', () => expect(typeof instance.before).toBe('function'))
	it('should have a method after()', () => expect(typeof instance.after).toBe('function'))
	it('should have a method extra()', () => expect(typeof instance.extra).toBe('function'))
	it('should have a method extraVerbosity()', () => expect(typeof instance.extraVerbosity).toBe('function'))
	it('should have a method ev()', () => expect(typeof instance.ev).toBe('function'))
	it('should have a method case()', () => expect(typeof instance.case).toBe('function'))
	it('should have a method heading()', () => expect(typeof instance.heading).toBe('function'))
	it('should have a method label()', () => expect(typeof instance.label).toBe('function'))
	it('should have a method clear()', () => expect(typeof instance.clear).toBe('function'))
	it('should have a method disable()', () => expect(typeof instance.disable).toBe('function'))
	it('should have a method enable()', () => expect(typeof instance.enable).toBe('function'))
	it('should have a method lock()', () => expect(typeof instance.lock).toBe('function'))
	it('should have a method clearLock()', () => expect(typeof instance.clearLock).toBe('function'))
	it('should have a method isLocked()', () => expect(typeof instance.isLocked).toBe('function'))
})

describe('Example', () => {
	it('out.example() should not throw', () => {
		return expect(() => new Out().example()).not.toThrow()
	})
})

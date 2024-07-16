[**@snickbit/out**](../README.md) • **Docs**

***

# Class: Out()

Cross-platform pretty output for your terminal or browser console.

## Extends

- `Function`

> **Out**(...`messages`): [`Out`](Out.md)

Cross-platform pretty output for your terminal or browser console.

## Parameters

• ...**messages**: `any`[]

## Returns

[`Out`](Out.md)

## Constructors

### new Out()

> **new Out**(): [`Out`](Out.md)

#### Returns

[`Out`](Out.md)

#### Inherited from

`Function.constructor`

### new Out()

> **new Out**(`options`): [`Out`](Out.md)

#### Parameters

• **options**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

#### Returns

[`Out`](Out.md)

#### Inherited from

`Function.constructor`

### new Out()

> **new Out**(`name`): [`Out`](Out.md)

#### Parameters

• **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Returns

[`Out`](Out.md)

#### Inherited from

`Function.constructor`

### new Out()

> **new Out**(`name`, `options`): [`Out`](Out.md)

#### Parameters

• **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

• **options**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

#### Returns

[`Out`](Out.md)

#### Inherited from

`Function.constructor`

### new Out()

> **new Out**(`name`?, `options`?): [`Out`](Out.md)

#### Parameters

• **name?**: `string` \| `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

Returns the name of the function. Function names are read-only and can not be changed.

• **options?**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

#### Returns

[`Out`](Out.md)

#### Inherited from

`Function.constructor`

## Properties

### \[metadata\]

> **\[metadata\]**: `null` \| `DecoratorMetadataObject`

#### Inherited from

`Function.[metadata]`

***

### arguments

> **arguments**: `any`

#### Inherited from

`Function.arguments`

***

### block

> **block**: [`Out`](Out.md)

Print the output with a horizontal line above and below it

***

### broken

> **broken**: [`Out`](Out.md)

Break the output into multiple lines

***

### caller

> **caller**: `Function`

#### Inherited from

`Function.caller`

***

### center

> **center**: [`Out`](Out.md)

Center the text in the terminal, only works in Node.js. In the browser the text will be relatively centered with itself,
but not in the entire console window.

***

### debug

> **debug**: [`Out`](Out.md)

Debug level output

***

### done

> **done**: [`Out`](Out.md)

Done level output. In Node.js this will also exit the process with a 0 exit code.

***

### error

> **error**: [`Out`](Out.md)

Error level output

***

### exception

> **exception**: [`Out`](Out.md)

Exception level output

***

### exit

> **exit**: [`Out`](Out.md)

(Node.js only) Exit the process with the given code, defaults to 0

***

### fatal

> **fatal**: [`Out`](Out.md)

Fatal level output. In Node.js this will also exit the process with a 1 exit code.

***

### force

> **force**: [`Out`](Out.md)

Force the output to be rendered regardless of verbosity

***

### info

> **info**: [`Out`](Out.md)

Info level output

***

### length

> `readonly` **length**: `number`

#### Inherited from

`Function.length`

***

### ln

> **ln**: [`Out`](Out.md)

Print an empty line

***

### log

> **log**: [`Out`](Out.md)

Log level output

***

### name

> `readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

`Function.name`

***

### noExit

> **noExit**: [`Out`](Out.md)

Disable exiting

***

### notice

> **notice**: [`Out`](Out.md)

Notice level output

***

### prototype

> **prototype**: `any`

#### Inherited from

`Function.prototype`

***

### silly

> **silly**: [`Out`](Out.md)

Silly level output

***

### success

> **success**: [`Out`](Out.md)

Success level output

***

### throw

> **throw**: [`Out`](Out.md)

Same as error level output but also throws an error

***

### title

> **title**: [`Out`](Out.md)

Print the output with a double horizontal line below it

***

### trace

> **trace**: [`Out`](Out.md)

Trace level output

***

### verbose

> **verbose**: [`Out`](Out.md)

Verbose level output

***

### warn

> **warn**: [`Out`](Out.md)

Warn level output

## Methods

### \[hasInstance\]()

> **\[hasInstance\]**(`value`): `boolean`

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

• **value**: `any`

#### Returns

`boolean`

#### Inherited from

`Function.[hasInstance]`

***

### \_()

#### \_(message)

> **\_**(`message`): `void`

Output the store

##### Parameters

• **message**: `string`

##### Returns

`void`

#### \_(exit)

> **\_**(`exit`): `void`

##### Parameters

• **exit**: `boolean`

##### Returns

`void`

***

### after()

> **after**(`callback`): [`Out`](Out.md)

Add a callback to be called after rendering the output

#### Parameters

• **callback**

#### Returns

[`Out`](Out.md)

***

### apply()

> **apply**(`this`, ...`messages`): [`Out`](Out.md)

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

• **this**: [`Out`](Out.md)

• ...**messages**: `any`[]

#### Returns

[`Out`](Out.md)

#### Overrides

`Function.apply`

***

### before()

> **before**(`callback`): [`Out`](Out.md)

Add a callback to be called before rendering the output

#### Parameters

• **callback**

#### Returns

[`Out`](Out.md)

***

### bind()

> **bind**(`this`, `thisArg`, ...`argArray`): `any`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

• **this**: `Function`

• **thisArg**: `any`

An object to which the this keyword can refer inside the new function.

• ...**argArray**: `any`[]

A list of arguments to be passed to the new function.

#### Returns

`any`

#### Inherited from

`Function.bind`

***

### call()

> **call**(...`messages`): [`Out`](Out.md)

Calls a method of an object, substituting another object for the current object.

#### Parameters

• ...**messages**: `any`[]

#### Returns

[`Out`](Out.md)

#### Overrides

`Function.call`

***

### case()

> **case**(`type`): [`Out`](Out.md)

Set the case of the messages, applies to all string values given to the final method

#### Parameters

• **type**: [`CaseType`](../type-aliases/CaseType.md) \| [`StringCase`](../enumerations/StringCase.md)

#### Returns

[`Out`](Out.md)

***

### clear()

> **clear**(): [`Out`](Out.md)

Clear the console. Only works in Node.js

#### Returns

[`Out`](Out.md)

***

### clone()

#### clone()

> **clone**(): [`Out`](Out.md)

##### Returns

[`Out`](Out.md)

#### clone(options)

> **clone**(`options`): [`Out`](Out.md)

##### Parameters

• **options**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

##### Returns

[`Out`](Out.md)

#### clone(name)

> **clone**(`name`): [`Out`](Out.md)

##### Parameters

• **name**: `string`

##### Returns

[`Out`](Out.md)

#### clone(name, options)

> **clone**(`name`, `options`): [`Out`](Out.md)

##### Parameters

• **name**: `string`

• **options**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

##### Returns

[`Out`](Out.md)

#### clone(name, options)

> **clone**(`name`?, `options`?): [`Out`](Out.md)

##### Parameters

• **name?**: `string` \| `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

• **options?**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

##### Returns

[`Out`](Out.md)

***

### config()

#### config(options)

> **config**(`options`): [`Out`](Out.md)

##### Parameters

• **options**: `Partial`\<[`OutSettings`](../interfaces/OutSettings.md)\>

##### Returns

[`Out`](Out.md)

#### config(option, value)

> **config**(`option`, `value`): [`Out`](Out.md)

##### Parameters

• **option**: keyof [`OutSettings`](../interfaces/OutSettings.md)

• **value**: `boolean`

##### Returns

[`Out`](Out.md)

***

### disable()

> **disable**(`exclusions`): [`Out`](Out.md)

Disable the console. Optional 'exclusions' parameter to allow specific commands

#### Parameters

• **exclusions**: `string`[] = `[]`

#### Returns

[`Out`](Out.md)

***

### enable()

> **enable**(): [`Out`](Out.md)

Enable the console after it has been disabled

#### Returns

[`Out`](Out.md)

***

### ev()

> **ev**(`extras_verbosity`): [`Out`](Out.md)

Set verbosity of extra outputs. Default is 1

#### Parameters

• **extras\_verbosity**: `number`

#### Returns

[`Out`](Out.md)

***

### example()

> **example**(): `void`

#### Returns

`void`

***

### extra()

> **extra**(...`args`): [`Out`](Out.md)

Add extra outputs with separate verbosity

#### Parameters

• ...**args**: `any`[]

#### Returns

[`Out`](Out.md)

***

### extraVerbosity()

> **extraVerbosity**(`extras_verbosity`?): [`Out`](Out.md)

Set verbosity of extra outputs

#### Parameters

• **extras\_verbosity?**: `number`

#### Returns

[`Out`](Out.md)

***

### formatter()

> **formatter**(`callback`): [`Out`](Out.md)

Add a callback to be applied to each line of output

#### Parameters

• **callback**

#### Returns

[`Out`](Out.md)

***

### getVerbosity()

> **getVerbosity**(`name`?): `number`

Get the environment verbosity

#### Parameters

• **name?**: `string`

#### Returns

`number`

***

### heading()

> **heading**(`heading`): [`Out`](Out.md)

Set the heading of the messages

#### Parameters

• **heading**: `string`

#### Returns

[`Out`](Out.md)

***

### isVerbose()

> **isVerbose**(`level`): `boolean`

Check if the environment verbosity is >= the given level

#### Parameters

• **level**: [`Verbosity`](../enumerations/Verbosity.md) = `Verbosity.warn`

#### Returns

`boolean`

***

### label()

> **label**(`label`): [`Out`](Out.md)

Set the label of the messages

#### Parameters

• **label**: `string`

#### Returns

[`Out`](Out.md)

***

### prefix()

> **prefix**(`text`?, `verbosity`?): [`Out`](Out.md)

Add a prefix to all future output for this instance

#### Parameters

• **text?**: `string`

• **verbosity?**: `null` \| `number`

#### Returns

[`Out`](Out.md)

***

### rule()

> **rule**(`symbol`?, `min`?, `max`?): [`Out`](Out.md)

#### Parameters

• **symbol?**: `string`

• **min?**: `number`

• **max?**: `number`

#### Returns

[`Out`](Out.md)

***

### setName()

> **setName**(`name`): [`Out`](Out.md)

Set the persistent name of the `Out` app.

#### Parameters

• **name**: `string`

#### Returns

[`Out`](Out.md)

***

### setVerbosity()

> **setVerbosity**(`level`?): [`Out`](Out.md)

Override the environment verbosity level

#### Parameters

• **level?**: `null` \| `number`

#### Returns

[`Out`](Out.md)

***

### toString()

> **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

`Function.toString`

***

### v()

> **v**(`verbosity`?): [`Out`](Out.md)

Set the minimum verbosity level

#### Parameters

• **verbosity?**: `number`

#### Returns

[`Out`](Out.md)

***

### verbosity()

> **verbosity**(`verbosity`?): [`Out`](Out.md)

Set the minimum verbosity level

#### Parameters

• **verbosity?**: `number`

#### Returns

[`Out`](Out.md)

***

### write()

> **write**(...`messages`): [`Out`](Out.md)

Print the output without any extra formatting, useful for the end of chains

#### Parameters

• ...**messages**: `any`[]

#### Returns

[`Out`](Out.md)

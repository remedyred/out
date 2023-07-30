# Class: Out

Cross-platform pretty output for your terminal or browser console.

## Hierarchy

- `Function`

  ↳ **`Out`**

## Callable

### Out

▸ **Out**(`...messages`): [`Out`](Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `any`[] |

#### Returns

[`Out`](Out.md)

## Table of contents

### Constructors

- [constructor](Out.md#constructor)

### Properties

- [arguments](Out.md#arguments)
- [block](Out.md#block)
- [broken](Out.md#broken)
- [caller](Out.md#caller)
- [center](Out.md#center)
- [debug](Out.md#debug)
- [done](Out.md#done)
- [error](Out.md#error)
- [exception](Out.md#exception)
- [exit](Out.md#exit)
- [fatal](Out.md#fatal)
- [force](Out.md#force)
- [info](Out.md#info)
- [length](Out.md#length)
- [ln](Out.md#ln)
- [log](Out.md#log)
- [name](Out.md#name)
- [noExit](Out.md#noexit)
- [notice](Out.md#notice)
- [prototype](Out.md#prototype)
- [silly](Out.md#silly)
- [success](Out.md#success)
- [throw](Out.md#throw)
- [title](Out.md#title)
- [trace](Out.md#trace)
- [verbose](Out.md#verbose)
- [warn](Out.md#warn)

### Methods

- [[hasInstance]](Out.md#[hasinstance])
- [\_](Out.md#_)
- [after](Out.md#after)
- [apply](Out.md#apply)
- [before](Out.md#before)
- [bind](Out.md#bind)
- [call](Out.md#call)
- [case](Out.md#case)
- [clear](Out.md#clear)
- [clone](Out.md#clone)
- [config](Out.md#config)
- [disable](Out.md#disable)
- [enable](Out.md#enable)
- [ev](Out.md#ev)
- [example](Out.md#example)
- [extra](Out.md#extra)
- [extraVerbosity](Out.md#extraverbosity)
- [formatter](Out.md#formatter)
- [getVerbosity](Out.md#getverbosity)
- [heading](Out.md#heading)
- [isVerbose](Out.md#isverbose)
- [label](Out.md#label)
- [prefix](Out.md#prefix)
- [rule](Out.md#rule)
- [setName](Out.md#setname)
- [setVerbosity](Out.md#setverbosity)
- [toString](Out.md#tostring)
- [v](Out.md#v)
- [verbosity](Out.md#verbosity)
- [write](Out.md#write)

## Constructors

### constructor

• **new Out**()

#### Inherited from

Function.constructor

• **new Out**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Inherited from

Function.constructor

• **new Out**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Inherited from

Function.constructor

• **new Out**(`name`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Inherited from

Function.constructor

• **new Out**(`name?`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` \| `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |
| `options?` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Inherited from

Function.constructor

## Properties

### arguments

• **arguments**: `any`

#### Inherited from

Function.arguments

___

### block

• **block**: [`Out`](Out.md)

Print the output with a horizontal line above and below it

___

### broken

• **broken**: [`Out`](Out.md)

Break the output into multiple lines

___

### caller

• **caller**: `Function`

#### Inherited from

Function.caller

___

### center

• **center**: [`Out`](Out.md)

Center the text in the terminal, only works in Node.js. In the browser the text will be relatively centered with itself,
but not in the entire console window.

___

### debug

• **debug**: [`Out`](Out.md)

Debug level output

___

### done

• **done**: [`Out`](Out.md)

Done level output. In Node.js this will also exit the process with a 0 exit code.

___

### error

• **error**: [`Out`](Out.md)

Error level output

___

### exception

• **exception**: [`Out`](Out.md)

Exception level output

___

### exit

• **exit**: [`Out`](Out.md)

(Node.js only) Exit the process with the given code, defaults to 0

___

### fatal

• **fatal**: [`Out`](Out.md)

Fatal level output. In Node.js this will also exit the process with a 1 exit code.

___

### force

• **force**: [`Out`](Out.md)

Force the output to be rendered regardless of verbosity

___

### info

• **info**: [`Out`](Out.md)

Info level output

___

### length

• `Readonly` **length**: `number`

#### Inherited from

Function.length

___

### ln

• **ln**: [`Out`](Out.md)

Print an empty line

___

### log

• **log**: [`Out`](Out.md)

Log level output

___

### name

• `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

Function.name

___

### noExit

• **noExit**: [`Out`](Out.md)

Disable exiting

___

### notice

• **notice**: [`Out`](Out.md)

Notice level output

___

### prototype

• **prototype**: `any`

#### Inherited from

Function.prototype

___

### silly

• **silly**: [`Out`](Out.md)

Silly level output

___

### success

• **success**: [`Out`](Out.md)

Success level output

___

### throw

• **throw**: [`Out`](Out.md)

Same as error level output but also throws an error

___

### title

• **title**: [`Out`](Out.md)

Print the output with a double horizontal line below it

___

### trace

• **trace**: [`Out`](Out.md)

Trace level output

___

### verbose

• **verbose**: [`Out`](Out.md)

Verbose level output

___

### warn

• **warn**: [`Out`](Out.md)

Warn level output

## Methods

### [hasInstance]

▸ **[hasInstance]**(`value`): `boolean`

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Inherited from

Function.[hasInstance]

___

### \_

▸ **_**(`message`): `void`

Output the store

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

▸ **_**(`exit`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exit` | `boolean` |

#### Returns

`void`

___

### after

▸ **after**(`callback`): [`Out`](Out.md)

Add a callback to be called after rendering the output

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`state`: `OutState`) => `undefined` \| `void` \| `OutState` |

#### Returns

[`Out`](Out.md)

___

### apply

▸ **apply**(`this`, `...messages`): [`Out`](Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`Out`](Out.md) |
| `...messages` | `any`[] |

#### Returns

[`Out`](Out.md)

#### Overrides

Function.apply

___

### before

▸ **before**(`callback`): [`Out`](Out.md)

Add a callback to be called before rendering the output

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`state`: `OutState`) => `undefined` \| `void` \| `OutState` |

#### Returns

[`Out`](Out.md)

___

### bind

▸ **bind**(`this`, `thisArg`, `...argArray`): `any`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `this` | `Function` | - |
| `thisArg` | `any` | An object to which the this keyword can refer inside the new function. |
| `...argArray` | `any`[] | A list of arguments to be passed to the new function. |

#### Returns

`any`

#### Inherited from

Function.bind

___

### call

▸ **call**(`...messages`): [`Out`](Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `any`[] |

#### Returns

[`Out`](Out.md)

#### Overrides

Function.call

___

### case

▸ **case**(`type`): [`Out`](Out.md)

Set the case of the messages, applies to all string values given to the final method

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`CaseType`](../README.md#casetype) \| [`StringCase`](../enums/StringCase.md) |

#### Returns

[`Out`](Out.md)

___

### clear

▸ **clear**(): [`Out`](Out.md)

Clear the console. Only works in Node.js

#### Returns

[`Out`](Out.md)

___

### clone

▸ **clone**(): `any`

#### Returns

`any`

▸ **clone**(`options`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Returns

`any`

▸ **clone**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

▸ **clone**(`name`, `options`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Returns

`any`

▸ **clone**(`name?`, `options?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` \| `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |
| `options?` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Returns

`any`

___

### config

▸ **config**(`options`): [`Out`](Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Partial`<[`OutSettings`](../interfaces/OutSettings.md)\> |

#### Returns

[`Out`](Out.md)

▸ **config**(`option`, `value`): [`Out`](Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | keyof [`OutSettings`](../interfaces/OutSettings.md) |
| `value` | `boolean` |

#### Returns

[`Out`](Out.md)

___

### disable

▸ **disable**(`exclusions?`): [`Out`](Out.md)

Disable the console. Optional 'exclusions' parameter to allow specific commands

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `exclusions` | `string`[] | `[]` |

#### Returns

[`Out`](Out.md)

___

### enable

▸ **enable**(): [`Out`](Out.md)

Enable the console after it has been disabled

#### Returns

[`Out`](Out.md)

___

### ev

▸ **ev**(`extras_verbosity`): [`Out`](Out.md)

Set verbosity of extra outputs. Default is 1

#### Parameters

| Name | Type |
| :------ | :------ |
| `extras_verbosity` | `number` |

#### Returns

[`Out`](Out.md)

___

### example

▸ **example**(): `void`

#### Returns

`void`

___

### extra

▸ **extra**(`...args`): [`Out`](Out.md)

Add extra outputs with separate verbosity

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

[`Out`](Out.md)

___

### extraVerbosity

▸ **extraVerbosity**(`extras_verbosity?`): [`Out`](Out.md)

Set verbosity of extra outputs

#### Parameters

| Name | Type |
| :------ | :------ |
| `extras_verbosity?` | `number` |

#### Returns

[`Out`](Out.md)

___

### formatter

▸ **formatter**(`callback`): [`Out`](Out.md)

Add a callback to be applied to each line of output

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`messages`: `string`) => `string` |

#### Returns

[`Out`](Out.md)

___

### getVerbosity

▸ **getVerbosity**(`name?`): `number`

Get the environment verbosity

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

`number`

___

### heading

▸ **heading**(`heading`): [`Out`](Out.md)

Set the heading of the messages

#### Parameters

| Name | Type |
| :------ | :------ |
| `heading` | `string` |

#### Returns

[`Out`](Out.md)

___

### isVerbose

▸ **isVerbose**(`level?`): `boolean`

Check if the environment verbosity is >= the given level

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `level` | [`Verbosity`](../enums/Verbosity.md) | `Verbosity.warn` |

#### Returns

`boolean`

___

### label

▸ **label**(`label`): [`Out`](Out.md)

Set the label of the messages

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

[`Out`](Out.md)

___

### prefix

▸ **prefix**(`text?`, `verbosity?`): [`Out`](Out.md)

Add a prefix to all future output for this instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `text?` | `string` |
| `verbosity?` | ``null`` \| `number` |

#### Returns

[`Out`](Out.md)

___

### rule

▸ **rule**(`symbol?`, `min?`, `max?`): [`Out`](Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `symbol?` | `string` |
| `min?` | `number` |
| `max?` | `number` |

#### Returns

[`Out`](Out.md)

___

### setName

▸ **setName**(`name`): [`Out`](Out.md)

Set the persistent name of the Out app.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Out`](Out.md)

___

### setVerbosity

▸ **setVerbosity**(`level?`): [`Out`](Out.md)

Override the environment verbosity level

#### Parameters

| Name | Type |
| :------ | :------ |
| `level?` | ``null`` \| `number` |

#### Returns

[`Out`](Out.md)

___

### toString

▸ **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

Function.toString

___

### v

▸ **v**(`verbosity?`): [`Out`](Out.md)

Set the minimum verbosity level

#### Parameters

| Name | Type |
| :------ | :------ |
| `verbosity?` | `number` |

#### Returns

[`Out`](Out.md)

___

### verbosity

▸ **verbosity**(`verbosity?`): [`Out`](Out.md)

Set the minimum verbosity level

#### Parameters

| Name | Type |
| :------ | :------ |
| `verbosity?` | `number` |

#### Returns

[`Out`](Out.md)

___

### write

▸ **write**(`...messages`): [`Out`](Out.md)

Print the output without any extra formatting, useful for the end of chains

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `any`[] |

#### Returns

[`Out`](Out.md)

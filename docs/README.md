# @snickbit/out

## Table of contents

### Enumerations

- [StringCase](enums/StringCase.md)
- [Verbosity](enums/Verbosity.md)

### Classes

- [Out](classes/Out.md)

### Interfaces

- [OutSettings](interfaces/OutSettings.md)

### Type Aliases

- [CaseType](README.md#casetype)

### Functions

- [default](README.md#default)
- [getVerbosity](README.md#getverbosity)
- [out](README.md#out)
- [outFactory](README.md#outfactory)
- [setVerbosity](README.md#setverbosity)

## Type Aliases

### CaseType

Ƭ **CaseType**: ``"camel"`` \| ``"constant"`` \| ``"kebab"`` \| ``"lower"`` \| ``"none"`` \| ``"pascal"`` \| ``"sentence"`` \| ``"slug"`` \| ``"snake"`` \| ``"symbol"`` \| ``"title"`` \| ``"upper"``

## Functions

### default

▸ **default**(`...messages`): [`Out`](classes/Out.md)

Cross-platform pretty output for your terminal or browser console.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `any`[] |

#### Returns

[`Out`](classes/Out.md)

___

### getVerbosity

▸ **getVerbosity**(`app?`): `number`

Get and parse the verbosity from the CLI

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `app?` | `string` | The name of the app to get the verbosity for |

#### Returns

`number`

___

### out

▸ **out**(`...messages`): [`Out`](classes/Out.md)

Cross-platform pretty output for your terminal or browser console.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `any`[] |

#### Returns

[`Out`](classes/Out.md)

___

### outFactory

▸ **outFactory**(`options?`): [`Out`](classes/Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<[`OutSettings`](interfaces/OutSettings.md)\> |

#### Returns

[`Out`](classes/Out.md)

▸ **outFactory**(`name?`, `options?`): [`Out`](classes/Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |
| `options?` | `Partial`<[`OutSettings`](interfaces/OutSettings.md)\> |

#### Returns

[`Out`](classes/Out.md)

___

### setVerbosity

▸ **setVerbosity**(`level?`, `app?`): `void`

Temporarily set the verbosity

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `level?` | ``null`` \| `number` | `Verbosity.display` |
| `app?` | `string` | `undefined` |

#### Returns

`void`

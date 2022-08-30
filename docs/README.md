# @snickbit/out

## Table of contents

### Classes

- [Out](classes/Out.md)

### Type Aliases

- [CaseType](README.md#casetype)
- [OutSettings](README.md#outsettings)

### Functions

- [default](README.md#default)
- [out](README.md#out)
- [outFactory](README.md#outfactory)

## Type Aliases

### CaseType

Ƭ **CaseType**: ``"camel"`` \| ``"constant"`` \| ``"kebab"`` \| ``"lower"`` \| ``"none"`` \| ``"pascal"`` \| ``"sentence"`` \| ``"slug"`` \| ``"snake"`` \| ``"symbol"`` \| ``"title"`` \| ``"upper"``

___

### OutSettings

Ƭ **OutSettings**: `Object`

#### Index signature

▪ [key: `string`]: `boolean` \| `number` \| `string`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `textColor` | `boolean` |
| `verbosity` | `number` |

## Functions

### default

▸ **default**(...`messages`): [`Out`](classes/Out.md)

Cross-platform pretty output for your terminal or browser console.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `any`[] |

#### Returns

[`Out`](classes/Out.md)

___

### out

▸ **out**(...`messages`): [`Out`](classes/Out.md)

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
| `options?` | `Partial`<[`OutSettings`](README.md#outsettings)\> |

#### Returns

[`Out`](classes/Out.md)

▸ **outFactory**(`name?`, `options?`): [`Out`](classes/Out.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |
| `options?` | `Partial`<[`OutSettings`](README.md#outsettings)\> |

#### Returns

[`Out`](classes/Out.md)

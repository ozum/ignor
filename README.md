# ignor

Ignore errors conditionally in sync / async / promise functions and return a default value.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Synopsis](#synopsis)
- [Async](#async)
- [Sync](#sync)
- [API](#api)
- [ignor](#ignor)
  - [Table of contents](#table-of-contents)
    - [Functions](#functions)
  - [Functions](#functions-1)
    - [ignoreCode](#ignorecode)
    - [ignoreMessage](#ignoremessage)
    - [ignoreStatus](#ignorestatus)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Synopsis

```ts
import { ignoreCode } from "ignor";

// Async: Returns "default value" if thrown error code is "ECONNREFUSED", otherwise throws.
await got(url).catch(ignoreCode("ECONNREFUSED", "default value"));

// AggregateError: Returns "default value" if all errors of an aggregate error are ignored.
await Promise.any([got(url), got(url)]).catch(ignoreCode("ECONNREFUSED", "default value"));

// Sync: Returns "default value" if thrown error code is "ENOENT", otherwise throws.
ignoreCode("ENOENT", "default value", () => readFileSync("x.txt"));
```

# Async

```ts
// Ignore an error with a code and return undefined. Otherwise throw error.
await got(url).catch(ignoreCode("ECONNREFUSED"));

// Ignore an error with a code and return default value.
await got(url).catch(ignoreCode("ECONNREFUSED", "no content"));

// Ignore an error with multiple codes.
await got(url).catch(ignoreCode(["ENOTDIR", "ENOENT"]));

// Ignore an error with a message.
await got(url).catch(ignoreMessage(/cannot connect/));

// Ignore an error with a status.
await got(url).catch(ignoreStatus(404));
```

# Sync

```ts
// An example sync function.
const func = () => readFileSync("x.txt");

// Ignore an error with a code and return undefined. Otherwise throw error.
ignore.code("ENOENT", func);

// Ignore an error with a code and return default value.
ignore.code("ENOENT", "no content", func);

// Ignore an error with multiple codes.
ignore.code(["ENOTDIR", "ENOENT"], func);

// Ignore an error with a message.
ignore.message(/cannot connect/, func);

// Ignore an error with a status.
ignore.status(404, func);
```

<!-- usage -->

<!-- commands -->

# API

<a name="readmemd"></a>

ignor

# ignor

## Table of contents

### Functions

- [ignoreCode](#ignorecode)
- [ignoreMessage](#ignoremessage)
- [ignoreStatus](#ignorestatus)

## Functions

### ignoreCode

▸ **ignoreCode**<R\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `fn`: (...`args`: _any_[]) => R): _undefined_ \| R

Ignores errors with the given code in sync functions.

#### Example

```typescript
import * as ignore from "ignor";
ignore.code("ENOENT", () => readFileSync("file.txt"));
ignore.code(["ENOENT", "OTHER"], () => readFileSync("file.txt"));
```

**`thorws`** if error is not one of the ignored codes.

#### Type parameters:

| Name | Description                                  |
| :--- | :------------------------------------------- |
| `R`  | is the return type of the executed function. |

#### Parameters:

| Name     | Type                            | Description                                               |
| :------- | :------------------------------ | :-------------------------------------------------------- |
| `ignore` | _Multi_<Ignore\> \| _undefined_ | is the code or codes to ignore.                           |
| `fn`     | (...`args`: _any_[]) => R       | is the function to execute and ignore some of the errors. |

**Returns:** _undefined_ \| R

`undefined`.

Defined in: [ignore.ts:20](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L20)

▸ **ignoreCode**<D, R\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `defaultValue`: D, `fn`: (...`args`: _any_[]) => R): D \| R

Ignores errors with the given code in sync functions.

#### Example

```typescript
import * as ignore from "ignor";
ignore.code("ENOENT", "default", () => readFileSync("file.txt"));
ignore.code(["ENOENT", "OTHER"], "default", () => readFileSync("file.txt"));
```

**`thorws`** if error is not one of the ignored codes.

#### Type parameters:

| Name | Description                                                   |
| :--- | :------------------------------------------------------------ |
| `D`  | is the type of returned default value if an error is ignored. |
| `R`  | is the return type of the executed function.                  |

#### Parameters:

| Name           | Type                            | Description                                               |
| :------------- | :------------------------------ | :-------------------------------------------------------- |
| `ignore`       | _Multi_<Ignore\> \| _undefined_ | is the code or codes to ignore.                           |
| `defaultValue` | D                               | is the default value to return if an error is ignored.    |
| `fn`           | (...`args`: _any_[]) => R       | is the function to execute and ignore some of the errors. |

**Returns:** D \| R

`undefined`.

Defined in: [ignore.ts:39](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L39)

▸ **ignoreCode**(`ignore?`: _Multi_<Ignore\>): (`e`: Error) => _undefined_

Ignores errors with the given code in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.code("ECONNREFUSED"));
await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"]));
```

**`thorws`** if error is not one of the ignored codes.

#### Parameters:

| Name      | Type             | Description                     |
| :-------- | :--------------- | :------------------------------ |
| `ignore?` | _Multi_<Ignore\> | is the code or codes to ignore. |

**Returns:** _function_

`undefined`.

Defined in: [ignore.ts:53](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L53)

▸ **ignoreCode**<D\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `defaultValue`: D): (`e`: Error) => D

Ignores errors with the given code in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.code("ECONNREFUSED", []));
await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"], []));
```

**`thorws`** if error is not one of the ignored codes.

#### Type parameters:

| Name | Description                                                   |
| :--- | :------------------------------------------------------------ |
| `D`  | is the type of returned default value if an error is ignored. |

#### Parameters:

| Name           | Type                            | Description                                            |
| :------------- | :------------------------------ | :----------------------------------------------------- |
| `ignore`       | _Multi_<Ignore\> \| _undefined_ | is the code or codes to ignore.                        |
| `defaultValue` | D                               | is the default value to return if an error is ignored. |

**Returns:** _function_

default value.

Defined in: [ignore.ts:70](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L70)

---

### ignoreMessage

▸ **ignoreMessage**<R\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `fn`: (...`args`: _any_[]) => R): _undefined_ \| R

#### Type parameters:

| Name |
| :--- |
| `R`  |

#### Parameters:

| Name     | Type                            |
| :------- | :------------------------------ |
| `ignore` | _Multi_<Ignore\> \| _undefined_ |
| `fn`     | (...`args`: _any_[]) => R       |

**Returns:** _undefined_ \| R

Defined in: [ignore.ts:75](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L75)

▸ **ignoreMessage**<D, R\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `defaultValue`: D, `fn`: (...`args`: _any_[]) => R): D \| R

#### Type parameters:

| Name |
| :--- |
| `D`  |
| `R`  |

#### Parameters:

| Name           | Type                            |
| :------------- | :------------------------------ |
| `ignore`       | _Multi_<Ignore\> \| _undefined_ |
| `defaultValue` | D                               |
| `fn`           | (...`args`: _any_[]) => R       |

**Returns:** D \| R

Defined in: [ignore.ts:76](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L76)

▸ **ignoreMessage**(`ignore?`: _Multi_<Ignore\>): (`e`: Error) => _undefined_

#### Parameters:

| Name      | Type             |
| :-------- | :--------------- |
| `ignore?` | _Multi_<Ignore\> |

**Returns:** _function_

Defined in: [ignore.ts:77](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L77)

▸ **ignoreMessage**<D\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `defaultValue`: D): (`e`: Error) => D

#### Type parameters:

| Name |
| :--- |
| `D`  |

#### Parameters:

| Name           | Type                            |
| :------------- | :------------------------------ |
| `ignore`       | _Multi_<Ignore\> \| _undefined_ |
| `defaultValue` | D                               |

**Returns:** _function_

Defined in: [ignore.ts:78](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L78)

---

### ignoreStatus

▸ **ignoreStatus**<R\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `fn`: (...`args`: _any_[]) => R): _undefined_ \| R

#### Type parameters:

| Name |
| :--- |
| `R`  |

#### Parameters:

| Name     | Type                            |
| :------- | :------------------------------ |
| `ignore` | _Multi_<Ignore\> \| _undefined_ |
| `fn`     | (...`args`: _any_[]) => R       |

**Returns:** _undefined_ \| R

Defined in: [ignore.ts:83](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L83)

▸ **ignoreStatus**<D, R\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `defaultValue`: D, `fn`: (...`args`: _any_[]) => R): D \| R

#### Type parameters:

| Name |
| :--- |
| `D`  |
| `R`  |

#### Parameters:

| Name           | Type                            |
| :------------- | :------------------------------ |
| `ignore`       | _Multi_<Ignore\> \| _undefined_ |
| `defaultValue` | D                               |
| `fn`           | (...`args`: _any_[]) => R       |

**Returns:** D \| R

Defined in: [ignore.ts:84](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L84)

▸ **ignoreStatus**(`ignore?`: _Multi_<Ignore\>): (`e`: Error) => _undefined_

#### Parameters:

| Name      | Type             |
| :-------- | :--------------- |
| `ignore?` | _Multi_<Ignore\> |

**Returns:** _function_

Defined in: [ignore.ts:85](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L85)

▸ **ignoreStatus**<D\>(`ignore`: _Multi_<Ignore\> \| _undefined_, `defaultValue`: D): (`e`: Error) => D

#### Type parameters:

| Name |
| :--- |
| `D`  |

#### Parameters:

| Name           | Type                            |
| :------------- | :------------------------------ |
| `ignore`       | _Multi_<Ignore\> \| _undefined_ |
| `defaultValue` | D                               |

**Returns:** _function_

Defined in: [ignore.ts:86](https://github.com/ozum/ignor/blob/ce0254b/src/ignore.ts#L86)

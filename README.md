# ignor

Ignore errors conditionally in async / promise functions and return a default value.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Synopsis](#synopsis)
  - [Other Usage](#other-usage)
- [API](#api)
- [ignor](#ignor)
  - [Table of contents](#table-of-contents)
    - [Functions](#functions)
  - [Functions](#functions-1)
    - [code](#code)
    - [message](#message)
    - [status](#status)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Synopsis

```ts
import * as ignore from "ignor";

await got(url).catch(ignore.code("ECONNREFUSED", "default value"));
```

## Other Usage

```ts
// Ignore an error with a code and return undefined. Otherwise throw error.
ignore.code("ECONNREFUSED");

// Ignore an error with a code and return default value.
ignore.code("ECONNREFUSED", "no content");

// Ignore an error with multiple codes.
ignore.code(["ENOTDIR", "ENOENT"]);

// Ignore an error with a message.
ignore.message(/cannot connect/);

// Ignore an error with a status.
ignore.status(404);
```

<!-- usage -->

<!-- commands -->

# API

<a name="readmemd"></a>

ignor

# ignor

## Table of contents

### Functions

- [code](#code)
- [message](#message)
- [status](#status)

## Functions

### code

▸ **code**(`ignore?`: _Multi_<string \| number \| RegExp\>): (`e`: Error) => _undefined_

Ignores errors with the given code in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.code("ECONNREFUSED"));
await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"]));
```

**`thorws`** if error is not one of the ignored codes.

#### Parameters:

| Name      | Type                                 | Description                     |
| :-------- | :----------------------------------- | :------------------------------ |
| `ignore?` | _Multi_<string \| number \| RegExp\> | is the code or codes to ignore. |

**Returns:** _function_

`undefined`.

Defined in: ignore.ts:31

▸ **code**<T\>(`ignore`: _Multi_<string \| number \| RegExp\> \| _undefined_, `defaultValue`: T): (`e`: Error) => T

Ignores errors with the given code in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.code("ECONNREFUSED", []));
await got(url).catch(ignore.code(["ECONNREFUSED", "OTHER"], []));
```

**`thorws`** if error is not one of the ignored codes.

#### Type parameters:

| Name | Type      |
| :--- | :-------- |
| `T`  | _unknown_ |

#### Parameters:

| Name           | Type                                                | Description                                            |
| :------------- | :-------------------------------------------------- | :----------------------------------------------------- |
| `ignore`       | _Multi_<string \| number \| RegExp\> \| _undefined_ | is the code or codes to ignore.                        |
| `defaultValue` | T                                                   | is the default value to return if an error is ignored. |

**Returns:** _function_

default value.

Defined in: ignore.ts:46

---

### message

▸ **message**(`ignore?`: _Multi_<string \| number \| RegExp\>): (`e`: Error) => _undefined_

Ignores errors with the given message in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.message(/cannot connect/));
await got(url).catch(ignore.message([/cannot connect/, "OTHER"]));
```

**`thorws`** if error is not one of the ignored messages.

#### Parameters:

| Name      | Type                                 | Description                           |
| :-------- | :----------------------------------- | :------------------------------------ |
| `ignore?` | _Multi_<string \| number \| RegExp\> | is the message or messages to ignore. |

**Returns:** _function_

`undefined`.

Defined in: ignore.ts:64

▸ **message**<T\>(`ignore`: _Multi_<string \| number \| RegExp\> \| _undefined_, `defaultValue`: T): (`e`: Error) => T

Ignores errors with given message in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.message(/cannot connect/, "default value"));
await got(url).catch(ignore.message([/cannot connect/, "OTHER"], "default value"));
```

**`thorws`** if error is not one of the ignored messages.

#### Type parameters:

| Name | Type      |
| :--- | :-------- |
| `T`  | _unknown_ |

#### Parameters:

| Name           | Type                                                | Description                                            |
| :------------- | :-------------------------------------------------- | :----------------------------------------------------- |
| `ignore`       | _Multi_<string \| number \| RegExp\> \| _undefined_ | is the message or messages to ignore.                  |
| `defaultValue` | T                                                   | is the default value to return if an error is ignored. |

**Returns:** _function_

default value.

Defined in: ignore.ts:79

---

### status

▸ **status**(`ignore?`: _Multi_<string \| number \| RegExp\>): (`e`: Error) => _undefined_

Ignores errors with the given status in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.status(404));
await got(url).catch(ignore.status([404, 403]));
```

**`thorws`** if error is not one of the ignored statusses.

#### Parameters:

| Name      | Type                                 | Description                           |
| :-------- | :----------------------------------- | :------------------------------------ |
| `ignore?` | _Multi_<string \| number \| RegExp\> | is the status or statusses to ignore. |

**Returns:** _function_

`undefined`.

Defined in: ignore.ts:97

▸ **status**<T\>(`ignore`: _Multi_<string \| number \| RegExp\> \| _undefined_, `defaultValue`: T): (`e`: Error) => T

Ignores errors with given status in async functions.

#### Example

```typescript
import * as ignore from "ignor";
await got(url).catch(ignore.status(404, "default value"));
await got(url).catch(ignore.status([404, 403], "default value"));
```

**`thorws`** if error is not one of the ignored statusses.

#### Type parameters:

| Name | Type      |
| :--- | :-------- |
| `T`  | _unknown_ |

#### Parameters:

| Name           | Type                                                | Description                                            |
| :------------- | :-------------------------------------------------- | :----------------------------------------------------- |
| `ignore`       | _Multi_<string \| number \| RegExp\> \| _undefined_ | is the status or statusses to ignore.                  |
| `defaultValue` | T                                                   | is the default value to return if an error is ignored. |

**Returns:** _function_

default value.

Defined in: ignore.ts:112

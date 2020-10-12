# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                             |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ------------------------------------------------------ |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [operation-block-body.json](operation-block-body.json) |

# Definitions

| Property                                    | Type       | Group                                            |
| ------------------------------------------- | ---------- | ------------------------------------------------ |
| [data](#data)                               | complex    | `#/definitions/InlineValue&lt;FullDataShape&gt;` |
| [dataShape](#datashape)                     | reference  | `#/definitions/OperationBlockStandardOutput`     |
| [dataShapeConstraint](#datashapeconstraint) | reference  | `#/definitions/OperationBlockStandardInput`      |
| [defaultInlineValue](#defaultinlinevalue)   | reference  | `#/definitions/OperationBlockStandardInput`      |
| [followInput](#followinput)                 | `string`   | `#/definitions/OperationBlockFollowerOutput`     |
| [limitToTextOptions](#limittotextoptions)   | `string[]` | `#/definitions/OperationBlockStandardInput`      |
| [list](#list)                               | `boolean`  | `#/definitions/PartialDataShape`                 |
| [name](#name)                               | `string`   | `#/definitions/OperationBlockStandardOutput`     |
| [nullable](#nullable)                       | `boolean`  | `#/definitions/PartialDataShape`                 |
| [title](#title)                             | `string`   | `#/definitions/OperationBlockStandardOutput`     |
| [type](#type)                               | `string`   | `#/definitions/PartialDataShape`                 |

## data

`data`

- is **required**
- type: complex
- defined in this schema

### data Type

Unknown type ``.

```json
{
  "definitiongroup": "InlineValue<FullDataShape>",
  "isrequired": true,
  "simpletype": "complex"
}
```

## dataShape

`dataShape`

- is **required**
- type: reference
- defined in this schema

### dataShape Type

- []() – `#/definitions/FullDataShape`

## dataShapeConstraint

`dataShapeConstraint`

- is **required**
- type: reference
- defined in this schema

### dataShapeConstraint Type

- []() – `#/definitions/PartialDataShape`

## defaultInlineValue

`defaultInlineValue`

- is optional
- type: reference
- defined in this schema

### defaultInlineValue Type

- []() – `#/definitions/InlineValue&lt;FullDataShape&gt;`

## followInput

`followInput`

- is **required**
- type: `string`
- defined in this schema

### followInput Type

`string`

## limitToTextOptions

`limitToTextOptions`

- is optional
- type: `string[]`
- defined in this schema

### limitToTextOptions Type

Array type: `string[]`

All items must be of the type: `string`

## list

`list`

- is **required**
- type: `boolean`
- defined in this schema

### list Type

`boolean`

## name

`name`

- is **required**
- type: `string`
- defined in this schema

### name Type

`string`

## nullable

`nullable`

- is **required**
- type: `boolean`
- defined in this schema

### nullable Type

`boolean`

## title

`title`

- is **required**
- type: `string`
- defined in this schema

### title Type

`string`

## type

`type`

- is **required**
- type: `string`
- defined in this schema

### type Type

`string`

# Properties

| Property            | Type    | Required     | Nullable | Defined by                                 |
| ------------------- | ------- | ------------ | -------- | ------------------------------------------ |
| [inputs](#inputs)   | `array` | **Required** | No       | (this schema)                              |
| [outputs](#outputs) | `array` | **Required** | No       | (this schema)                              |
| `*`                 | any     | Additional   | Yes      | this schema _allows_ additional properties |

## inputs

`inputs`

- is **required**
- type: `array`
- defined in this schema

### inputs Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

- []() – `#/definitions/OperationBlockStandardInput`

#### Option 2

- []() – `#/definitions/OperationBlockFollowerInput`

## outputs

`outputs`

- is **required**
- type: `array`
- defined in this schema

### outputs Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

- []() – `#/definitions/OperationBlockStandardOutput`

#### Option 2

- []() – `#/definitions/OperationBlockFollowerOutput`

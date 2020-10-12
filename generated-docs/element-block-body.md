# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                         |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | -------------------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [element-block-body.json](element-block-body.json) |

# Definitions

| Property                                    | Type       | Group                                            |
| ------------------------------------------- | ---------- | ------------------------------------------------ |
| [data](#data)                               | complex    | `#/definitions/InlineValue&lt;FullDataShape&gt;` |
| [dataShape](#datashape)                     | reference  | `#/definitions/InlineValue&lt;FullDataShape&gt;` |
| [dataShapeConstraint](#datashapeconstraint) | reference  | `#/definitions/ElementBlockStandardInput`        |
| [defaultInlineValue](#defaultinlinevalue)   | reference  | `#/definitions/ElementBlockStandardInput`        |
| [followInput](#followinput)                 | `string`   | `#/definitions/ElementBlockFollowerOutput`       |
| [limitToTextOptions](#limittotextoptions)   | `string[]` | `#/definitions/ElementBlockStandardInput`        |
| [list](#list)                               | `boolean`  | `#/definitions/PartialDataShape`                 |
| [name](#name)                               | `string`   | `#/definitions/ElementBlockStandardOutput`       |
| [nullable](#nullable)                       | `boolean`  | `#/definitions/PartialDataShape`                 |
| [title](#title)                             | `string`   | `#/definitions/ElementBlockStandardOutput`       |
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

- []() – `#/definitions/ElementBlockStandardInput`

#### Option 2

- []() – `#/definitions/ElementBlockFollowerInput`

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

- []() – `#/definitions/ElementBlockStandardOutput`

#### Option 2

- []() – `#/definitions/ElementBlockFollowerOutput`

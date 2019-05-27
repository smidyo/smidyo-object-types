# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                         |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | -------------------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [form-pipeline-body.json](form-pipeline-body.json) |

# Definitions

| Property                                              | Type       | Group                                                        |
| ----------------------------------------------------- | ---------- | ------------------------------------------------------------ |
| [constantSlug](#constantslug)                         | `string`   | `#/definitions/InternalSourceBlockConstant_PipelineStep`     |
| [data](#data)                                         | complex    | `#/definitions/InlineValue&lt;FullDataShape&gt;`             |
| [dataShape](#datashape)                               | reference  | `#/definitions/PipelineOutput`                               |
| [elementBlockSlug](#elementblockslug)                 | `string`   | `#/definitions/ElementBlock_PipelineStep`                    |
| [in](#in)                                             | `array`    | `#/definitions/SubProcessPipeline_PipelineStep`              |
| [inFrom](#infrom)                                     | `string`   | `#/definitions/PipelineStepInFromPipelineValue`              |
| [inTo](#into)                                         | `string`   | `#/definitions/PipelineStepInTo&lt;string&gt;`               |
| [label](#label)                                       | `string`   | `#/definitions/ElementBlock_PipelineStep`                    |
| [list](#list)                                         | `boolean`  | `#/definitions/FullDataShape`                                |
| [name](#name)                                         | `string`   | `#/definitions/PipelineOutput`                               |
| [nullable](#nullable)                                 | `boolean`  | `#/definitions/FullDataShape`                                |
| [out](#out)                                           | `array`    | `#/definitions/SubProcessPipeline_PipelineStep`              |
| [outFrom](#outfrom)                                   | `string`   | `#/definitions/PipelineStepOutFrom&lt;string&gt;`            |
| [outTo](#outto)                                       | `string`   | `#/definitions/PipelineStepOutToPipelineValue`               |
| [skipUnlessPipelineValues](#skipunlesspipelinevalues) | `string[]` | `#/definitions/SkipUnlessPipelineValues`                     |
| [sourceBlock](#sourceblock)                           | `enum`     | `#/definitions/InternalSourceBlockTableColumns_PipelineStep` |
| [subFormPipelineSlug](#subformpipelineslug)           | `string`   | `#/definitions/SubFormPipeline_PipelineStep`                 |
| [subProcessPipelineSlug](#subprocesspipelineslug)     | `string`   | `#/definitions/SubProcessPipeline_PipelineStep`              |
| [tableSlug](#tableslug)                               | `string`   | `#/definitions/InternalSourceBlockTableColumns_PipelineStep` |

## constantSlug

`constantSlug`

- is **required**
- type: `string`
- defined in this schema

### constantSlug Type

`string`

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

## elementBlockSlug

`elementBlockSlug`

- is **required**
- type: `string`
- defined in this schema

### elementBlockSlug Type

`string`

## in

`in`

- is **required**
- type: `array`
- defined in this schema

### in Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/PipelineStepInFromPipelineValue`

#### Requirement 2

- []() – `#/definitions/PipelineStepInTo&lt;string&gt;`

#### Option 2

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/PipelineStepInFromInlineValue&lt;FullDataShape&gt;`

#### Requirement 2

- []() – `#/definitions/PipelineStepInTo&lt;string&gt;`

## inFrom

`inFrom`

- is **required**
- type: `string`
- defined in this schema

### inFrom Type

`string`

## inTo

`inTo`

- is **required**
- type: `string`
- defined in this schema

### inTo Type

`string`

## label

`label`

- is optional
- type: `string`
- defined in this schema

### label Type

`string`

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

All instances must conform to this regular expression (test examples
[here](https://regexr.com/?expression=%5E%5Ba-z0-9-%5D*%24)):

```regex
^[a-z0-9-]*$
```

## nullable

`nullable`

- is **required**
- type: `boolean`
- defined in this schema

### nullable Type

`boolean`

## out

`out`

- is **required**
- type: `array`
- defined in this schema

### out Type

Array type: `array`

All items must be of the type:

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/PipelineStepOutFrom&lt;string&gt;`

#### Requirement 2

- []() – `#/definitions/PipelineStepOutToPipelineValue`

## outFrom

`outFrom`

- is **required**
- type: `string`
- defined in this schema

### outFrom Type

`string`

## outTo

`outTo`

- is **required**
- type: `string`
- defined in this schema

### outTo Type

`string`

All instances must conform to this regular expression (test examples
[here](https://regexr.com/?expression=%5E%5Ba-z0-9-%5D*%24)):

```regex
^[a-z0-9-]*$
```

## skipUnlessPipelineValues

`skipUnlessPipelineValues`

- is optional
- type: `string[]`
- defined in this schema

### skipUnlessPipelineValues Type

Array type: `string[]`

All items must be of the type: `string`

## sourceBlock

`sourceBlock`

- is **required**
- type: `enum`
- defined in this schema

The value of this property **must** be equal to one of the [known values below](#sourceblock-known-values).

### sourceBlock Known Values

| Value           | Description |
| --------------- | ----------- |
| `TABLE_COLUMNS` |             |

## subFormPipelineSlug

`subFormPipelineSlug`

- is **required**
- type: `string`
- defined in this schema

### subFormPipelineSlug Type

`string`

## subProcessPipelineSlug

`subProcessPipelineSlug`

- is **required**
- type: `string`
- defined in this schema

### subProcessPipelineSlug Type

`string`

All instances must conform to this regular expression (test examples
[here](https://regexr.com/?expression=%5E%5Ba-z0-9-.%5D*%24)):

```regex
^[a-z0-9-.]*$
```

## tableSlug

`tableSlug`

- is **required**
- type: `string`
- defined in this schema

### tableSlug Type

`string`

# Properties

| Property            | Type      | Required     | Nullable | Defined by                                 |
| ------------------- | --------- | ------------ | -------- | ------------------------------------------ |
| [inputs](#inputs)   | reference | **Required** | No       | (this schema)                              |
| [outputs](#outputs) | reference | **Required** | No       | (this schema)                              |
| [steps](#steps)     | `array`   | **Required** | No       | (this schema)                              |
| [type](#type)       | `enum`    | **Required** | No       | (this schema)                              |
| `*`                 | any       | Additional   | Yes      | this schema _allows_ additional properties |

## inputs

`inputs`

- is **required**
- type: reference
- defined in this schema

### inputs Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/PipelineInput`

## outputs

`outputs`

- is **required**
- type: reference
- defined in this schema

### outputs Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/PipelineOutput`

## steps

`steps`

- is **required**
- type: `array`
- defined in this schema

### steps Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/ElementBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 2

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockConstant_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 3

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableColumns_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 4

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableCells_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 5

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/ExternalSystemSourceBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 6

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/SubFormPipeline_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 7

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/SubProcessPipeline_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

## type

`type`

- is **required**
- type: `enum`
- defined in this schema

The value of this property **must** be equal to one of the [known values below](#type-known-values).

### type Known Values

| Value  | Description |
| ------ | ----------- |
| `FORM` |             |

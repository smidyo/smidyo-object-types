# Schema

```

```

The price is calculated in the order defined in quotePriceSequence

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                                           |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------------------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [yield-pipeline-body.json](yield-pipeline-body.json) |

# Definitions

| Property                                              | Type       | Group                                                                         |
| ----------------------------------------------------- | ---------- | ----------------------------------------------------------------------------- |
| [column](#column)                                     | `string`   | `#/definitions/InternalEffectBlockTableUpdateCell_PipelineStep`               |
| [constantSlug](#constantslug)                         | `string`   | `#/definitions/InternalSourceBlockConstant_PipelineStep`                      |
| [data](#data)                                         | complex    | `#/definitions/InlineValue&lt;{type:string;nullable:false;list:false;}&gt;_1` |
| [dataShape](#datashape)                               | reference  | `#/definitions/PipelineOutput`                                                |
| [effectBlock](#effectblock)                           | `enum`     | `#/definitions/InternalEffectBlockTableUpdateCell_PipelineStep`               |
| [fallback](#fallback)                                 | complex    | `#/definitions/AssertPipelineStep`                                            |
| [in](#in)                                             | `array`    | `#/definitions/SubProcessPipeline_PipelineStep`                               |
| [inFrom](#infrom)                                     | `string`   | `#/definitions/PipelineStepInFromPipelineValue`                               |
| [inPriority](#inpriority)                             | reference  | `#/definitions/AssertPipelineStep`                                            |
| [inTo](#into)                                         | `string`   | `#/definitions/PipelineStepInTo&lt;string&gt;`                                |
| [list](#list)                                         | `boolean`  | `#/definitions/FullDataShape`                                                 |
| [message](#message)                                   | complex    | `#/definitions/AssertPipelineStepRejectFallback`                              |
| [name](#name)                                         | `string`   | `#/definitions/PipelineOutput`                                                |
| [nullable](#nullable)                                 | `boolean`  | `#/definitions/FullDataShape`                                                 |
| [operationBlockSlug](#operationblockslug)             | `string`   | `#/definitions/OperationBlock_PipelineStep`                                   |
| [out](#out)                                           | `array`    | `#/definitions/SubProcessPipeline_PipelineStep`                               |
| [outFrom](#outfrom)                                   | `string`   | `#/definitions/PipelineStepOutFrom&lt;string&gt;`                             |
| [outTo](#outto)                                       | `string`   | `#/definitions/PipelineStepOutToPipelineValue`                                |
| [skipUnlessPipelineValues](#skipunlesspipelinevalues) | `string[]` | `#/definitions/SkipUnlessPipelineValues`                                      |
| [sourceBlock](#sourceblock)                           | `enum`     | `#/definitions/InternalSourceBlockTableColumns_PipelineStep`                  |
| [subProcessPipelineSlug](#subprocesspipelineslug)     | `string`   | `#/definitions/SubProcessPipeline_PipelineStep`                               |
| [tableSlug](#tableslug)                               | `string`   | `#/definitions/InternalSourceBlockTableColumns_PipelineStep`                  |

## column

`column`

- is **required**
- type: `string`
- defined in this schema

### column Type

`string`

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
  "definitiongroup": "InlineValue<{type:string;nullable:false;list:false;}>_1",
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

## effectBlock

`effectBlock`

- is **required**
- type: `enum`
- defined in this schema

The value of this property **must** be equal to one of the [known values below](#effectblock-known-values).

### effectBlock Known Values

| Value               | Description |
| ------------------- | ----------- |
| `TABLE_UPDATE_CELL` |             |

## fallback

`fallback`

- is **required**
- type: complex
- defined in this schema

### fallback Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

- []() – `#/definitions/AssertPipelineStepRejectFallback`

#### Option 2

- []() – `#/definitions/AssertPipelineStepFallbackDataFallback`

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

## inPriority

`inPriority`

- is **required**
- type: reference
- defined in this schema

### inPriority Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/PipelineStepInFromPipelineValue`

## inTo

`inTo`

- is **required**
- type: `string`
- defined in this schema

### inTo Type

`string`

## list

`list`

- is **required**
- type: `boolean`
- defined in this schema

### list Type

`boolean`

## message

`message`

- is **required**
- type: complex
- defined in this schema

### message Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

- []() – `#/definitions/PipelineStepInFromPipelineValue`

#### Option 2

- []() – `#/definitions/PipelineStepInFromInlineValue&lt;{type:&#34;text&#34;;nullable:false;list:false;}&gt;`

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

## operationBlockSlug

`operationBlockSlug`

- is **required**
- type: `string`
- defined in this schema

### operationBlockSlug Type

`string`

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

| Property                      | Type      | Required     | Nullable | Defined by                                 |
| ----------------------------- | --------- | ------------ | -------- | ------------------------------------------ |
| [inputs](#inputs)             | reference | **Required** | No       | (this schema)                              |
| [orderOutputs](#orderoutputs) | reference | **Required** | No       | (this schema)                              |
| [orderSteps](#ordersteps)     | `array`   | **Required** | No       | (this schema)                              |
| [quoteOutputs](#quoteoutputs) | reference | **Required** | No       | (this schema)                              |
| [quoteSteps](#quotesteps)     | `array`   | **Required** | No       | (this schema)                              |
| [type](#type)                 | `enum`    | **Required** | No       | (this schema)                              |
| `*`                           | any       | Additional   | Yes      | this schema _allows_ additional properties |

## inputs

`inputs`

- is **required**
- type: reference
- defined in this schema

### inputs Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/PipelineInput`

## orderOutputs

`orderOutputs`

- is **required**
- type: reference
- defined in this schema

### orderOutputs Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/PipelineOutput`

## orderSteps

`orderSteps`

- is **required**
- type: `array`
- defined in this schema

### orderSteps Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

- []() – `#/definitions/AssertPipelineStep`

#### Option 2

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/OperationBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 3

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockConstant_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 4

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableColumns_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 5

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableCells_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 6

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableCell_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 7

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/ExternalSystemSourceBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 8

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalEffectBlockTableDeleteRow_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 9

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalEffectBlockTableUpdateCell_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 10

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/ExternalSystemEffectBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 11

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/SubProcessPipeline_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

## quoteOutputs

`quoteOutputs`

- is **required**
- type: reference
- defined in this schema

### quoteOutputs Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/PipelineOutput`

## quoteSteps

`quoteSteps`

- is **required**
- type: `array`
- defined in this schema

### quoteSteps Type

Array type: `array`

All items must be of the type:

**Any** following _options_ needs to be fulfilled.

#### Option 1

- []() – `#/definitions/AssertPipelineStep`

#### Option 2

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/OperationBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 3

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockConstant_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 4

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableColumns_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 5

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableCells_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 6

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/InternalSourceBlockTableCell_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 7

**All** of the following _requirements_ need to be fulfilled.

#### Requirement 1

- []() – `#/definitions/ExternalSystemSourceBlock_PipelineStep`

#### Requirement 2

- []() – `#/definitions/SkipUnlessPipelineValues`

#### Option 8

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

| Value   | Description |
| ------- | ----------- |
| `YIELD` |             |

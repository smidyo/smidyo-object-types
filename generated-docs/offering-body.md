# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                               |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [offering-body.json](offering-body.json) |

# Definitions

| Property                                            | Type     | Group                          |
| --------------------------------------------------- | -------- | ------------------------------ |
| [price](#price)                                     | `object` | `#/definitions/OfferingSubRow` |
| [skipUnlessPipelineValue](#skipunlesspipelinevalue) | `string` | `#/definitions/OfferingSubRow` |
| [titleFrom](#titlefrom)                             | complex  | `#/definitions/OfferingSubRow` |

## price

`price`

- is optional
- type: `object`
- defined in this schema

### price Type

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `from`   |        | **Required** |
| `type`   | string | **Required** |

#### from

`from`

- is **required**
- type: complex

##### from Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `price`  | number | **Required** |
| `type`   | string | **Required** |

#### price

`price`

- is **required**
- type: `number`

##### price Type

`number`

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `STATIC` |             |

#### Option 2

`object` with following properties:

| Property        | Type   | Required     |
| --------------- | ------ | ------------ |
| `pipelineValue` | string | **Required** |
| `type`          | string | **Required** |

#### pipelineValue

`pipelineValue`

- is **required**
- type: `string`

##### pipelineValue Type

`string`

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value            | Description |
| ---------------- | ----------- |
| `PIPELINE_VALUE` |             |

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#price-known-values).

##### type Known Values

| Value            | Description |
| ---------------- | ----------- |
| `ADD`            |             |
| `MINIMUM`        |             |
| `MULTIPLY`       |             |
| `PERCENTAGE_OFF` |             |
| `PERCENTAGE_ON`  |             |
| `SUBTRACT`       |             |

## skipUnlessPipelineValue

`skipUnlessPipelineValue`

- is **required**
- type: `string`
- defined in this schema

### skipUnlessPipelineValue Type

`string`

## titleFrom

`titleFrom`

- is **required**
- type: complex
- defined in this schema

### titleFrom Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `title`  | string | **Required** |
| `type`   | string | **Required** |

#### title

`title`

- is **required**
- type: `string`

##### title Type

`string`

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `STATIC` |             |

#### Option 2

`object` with following properties:

| Property        | Type   | Required     |
| --------------- | ------ | ------------ |
| `pipelineValue` | string | **Required** |
| `type`          | string | **Required** |

#### pipelineValue

`pipelineValue`

- is **required**
- type: `string`

##### pipelineValue Type

`string`

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value            | Description |
| ---------------- | ----------- |
| `PIPELINE_VALUE` |             |

# Properties

| Property                                                                                                | Type      | Required     | Nullable | Defined by                                 |
| ------------------------------------------------------------------------------------------------------- | --------- | ------------ | -------- | ------------------------------------------ |
| [orderResultFormPipeline](#orderresultformpipeline)                                                     | `string`  | Optional     | No       | (this schema)                              |
| [payloadFormPipeline](#payloadformpipeline)                                                             | `string`  | Optional     | No       | (this schema)                              |
| [payloadFormPipelineToYieldPipelineConnections](#payloadformpipelinetoyieldpipelineconnections)         | reference | **Required** | No       | (this schema)                              |
| [quoteResultFormPipeline](#quoteresultformpipeline)                                                     | `string`  | Optional     | No       | (this schema)                              |
| [subRows](#subrows)                                                                                     | reference | **Required** | No       | (this schema)                              |
| [titleFromPipelineValue](#titlefrompipelinevalue)                                                       | `string`  | Optional     | No       | (this schema)                              |
| [yieldPipeline](#yieldpipeline)                                                                         | `string`  | **Required** | No       | (this schema)                              |
| [yieldPipelineToOrderResultFormPipelineConnections](#yieldpipelinetoorderresultformpipelineconnections) | reference | **Required** | No       | (this schema)                              |
| [yieldPipelineToQuoteResultFormPipelineConnections](#yieldpipelinetoquoteresultformpipelineconnections) | reference | **Required** | No       | (this schema)                              |
| `*`                                                                                                     | any       | Additional   | Yes      | this schema _allows_ additional properties |

## orderResultFormPipeline

`orderResultFormPipeline`

- is optional
- type: `string`
- defined in this schema

### orderResultFormPipeline Type

`string`

## payloadFormPipeline

`payloadFormPipeline`

- is optional
- type: `string`
- defined in this schema

### payloadFormPipeline Type

`string`

## payloadFormPipelineToYieldPipelineConnections

`payloadFormPipelineToYieldPipelineConnections`

- is **required**
- type: reference
- defined in this schema

### payloadFormPipelineToYieldPipelineConnections Type

- []() – `#/definitions/Record&lt;string,string&gt;`

## quoteResultFormPipeline

`quoteResultFormPipeline`

- is optional
- type: `string`
- defined in this schema

### quoteResultFormPipeline Type

`string`

## subRows

`subRows`

- is **required**
- type: reference
- defined in this schema

### subRows Type

Array type: reference

All items must be of the type:

- []() – `#/definitions/OfferingSubRow`

## titleFromPipelineValue

`titleFromPipelineValue`

- is optional
- type: `string`
- defined in this schema

### titleFromPipelineValue Type

`string`

## yieldPipeline

`yieldPipeline`

- is **required**
- type: `string`
- defined in this schema

### yieldPipeline Type

`string`

## yieldPipelineToOrderResultFormPipelineConnections

`yieldPipelineToOrderResultFormPipelineConnections`

- is **required**
- type: reference
- defined in this schema

### yieldPipelineToOrderResultFormPipelineConnections Type

- []() – `#/definitions/Record&lt;string,string&gt;`

## yieldPipelineToQuoteResultFormPipelineConnections

`yieldPipelineToQuoteResultFormPipelineConnections`

- is **required**
- type: reference
- defined in this schema

### yieldPipelineToQuoteResultFormPipelineConnections Type

- []() – `#/definitions/Record&lt;string,string&gt;`

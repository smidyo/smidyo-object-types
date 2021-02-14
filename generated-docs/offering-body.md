# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                               |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------------------------------------- |
| Can be instantiated | Yes        | Experimental | No           | Forbidden         | Permitted             | [offering-body.json](offering-body.json) |

# Definitions

| Property                                            | Type     | Group                          |
| --------------------------------------------------- | -------- | ------------------------------ |
| [skipUnlessPipelineValue](#skipunlesspipelinevalue) | `string` | `#/definitions/OfferingSubRow` |
| [titleFrom](#titlefrom)                             | complex  | `#/definitions/OfferingSubRow` |
| [value](#value)                                     | `object` | `#/definitions/OfferingSubRow` |

## skipUnlessPipelineValue

`skipUnlessPipelineValue`

- is optional
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

## value

`value`

- is optional
- type: `object`
- defined in this schema

### value Type

`object` with following properties:

| Property | Type | Required     |
| -------- | ---- | ------------ |
| `from`   |      | **Required** |
| `type`   |      | **Required** |

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
| `type`   | string | **Required** |
| `value`  | number | **Required** |

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `STATIC` |             |

#### value

`value`

- is **required**
- type: `number`

##### value Type

`number`

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
- type: reference

##### type Type

- []() – `#/definitions/OfferingSubRowValueType`

# Properties

| Property                                                                                                | Type      | Required     | Nullable | Defined by                                 |
| ------------------------------------------------------------------------------------------------------- | --------- | ------------ | -------- | ------------------------------------------ |
| [addToShippingPrice](#addtoshippingprice)                                                               | complex   | Optional     | No       | (this schema)                              |
| [hideSubRows](#hidesubrows)                                                                             | `boolean` | Optional     | No       | (this schema)                              |
| [orderResultFormPipelineSlug](#orderresultformpipelineslug)                                             | `string`  | Optional     | No       | (this schema)                              |
| [payloadFormPipelineSlug](#payloadformpipelineslug)                                                     | `string`  | Optional     | No       | (this schema)                              |
| [payloadFormPipelineToYieldPipelineConnections](#payloadformpipelinetoyieldpipelineconnections)         | reference | **Required** | No       | (this schema)                              |
| [quoteMinimumBasePrice](#quoteminimumbaseprice)                                                         | `object`  | Optional     | No       | (this schema)                              |
| [quoteResultFormPipelineSlug](#quoteresultformpipelineslug)                                             | `string`  | Optional     | No       | (this schema)                              |
| [subRows](#subrows)                                                                                     | reference | **Required** | No       | (this schema)                              |
| [titleFromPipelineValue](#titlefrompipelinevalue)                                                       | `string`  | Optional     | No       | (this schema)                              |
| [yieldPipelineSlug](#yieldpipelineslug)                                                                 | `string`  | **Required** | No       | (this schema)                              |
| [yieldPipelineToOrderResultFormPipelineConnections](#yieldpipelinetoorderresultformpipelineconnections) | reference | **Required** | No       | (this schema)                              |
| [yieldPipelineToQuoteResultFormPipelineConnections](#yieldpipelinetoquoteresultformpipelineconnections) | reference | **Required** | No       | (this schema)                              |
| `*`                                                                                                     | any       | Additional   | Yes      | this schema _allows_ additional properties |

## addToShippingPrice

`addToShippingPrice`

- is optional
- type: complex
- defined in this schema

### addToShippingPrice Type

**Any** following _options_ needs to be fulfilled.

#### Option 1

`object` with following properties:

| Property | Type   | Required     |
| -------- | ------ | ------------ |
| `type`   | string | **Required** |
| `value`  | number | **Required** |

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `STATIC` |             |

#### value

`value`

- is **required**
- type: `number`

##### value Type

`number`

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

## hideSubRows

`hideSubRows`

- is optional
- type: `boolean`
- defined in this schema

### hideSubRows Type

`boolean`

## orderResultFormPipelineSlug

`orderResultFormPipelineSlug`

- is optional
- type: `string`
- defined in this schema

### orderResultFormPipelineSlug Type

`string`

## payloadFormPipelineSlug

`payloadFormPipelineSlug`

- is optional
- type: `string`
- defined in this schema

### payloadFormPipelineSlug Type

`string`

## payloadFormPipelineToYieldPipelineConnections

`payloadFormPipelineToYieldPipelineConnections`

- is **required**
- type: reference
- defined in this schema

### payloadFormPipelineToYieldPipelineConnections Type

- []() – `#/definitions/Record&lt;string,string&gt;`

## quoteMinimumBasePrice

`quoteMinimumBasePrice`

- is optional
- type: `object`
- defined in this schema

### quoteMinimumBasePrice Type

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
| `type`   | string | **Required** |
| `value`  | number | **Required** |

#### type

`type`

- is **required**
- type: `enum`

The value of this property **must** be equal to one of the [known values below](#-known-values).

##### type Known Values

| Value    | Description |
| -------- | ----------- |
| `STATIC` |             |

#### value

`value`

- is **required**
- type: `number`

##### value Type

`number`

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

The value of this property **must** be equal to one of the [known values below](#quoteminimumbaseprice-known-values).

##### type Known Values

| Value     | Description |
| --------- | ----------- |
| `ADD`     |             |
| `MINIMUM` |             |

## quoteResultFormPipelineSlug

`quoteResultFormPipelineSlug`

- is optional
- type: `string`
- defined in this schema

### quoteResultFormPipelineSlug Type

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

## yieldPipelineSlug

`yieldPipelineSlug`

- is **required**
- type: `string`
- defined in this schema

### yieldPipelineSlug Type

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

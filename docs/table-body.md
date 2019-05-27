# Schema

```

```

| Abstract            | Extensible | Status       | Identifiable | Custom Properties | Additional Properties | Defined In                         |
| ------------------- | ---------- | ------------ | ------------ | ----------------- | --------------------- | ---------------------------------- |
| Can be instantiated | No         | Experimental | No           | Forbidden         | Permitted             | [table-body.json](table-body.json) |

# Properties

| Property            | Type       | Required     | Nullable | Defined by                                 |
| ------------------- | ---------- | ------------ | -------- | ------------------------------------------ |
| [columns](#columns) | `object[]` | **Required** | No       | (this schema)                              |
| [data](#data)       | `object`   | **Required** | No       | (this schema)                              |
| `*`                 | any        | Additional   | Yes      | this schema _allows_ additional properties |

## columns

`columns`

- is **required**
- type: `object[]`
- defined in this schema

### columns Type

Array type: `object[]`

All items must be of the type: `object` with following properties:

| Property    | Type   | Required     |
| ----------- | ------ | ------------ |
| `dataShape` | object | **Required** |
| `name`      | string | **Required** |

#### dataShape

`dataShape`

- is **required**
- type: `object`

##### dataShape Type

`object` with following properties:

| Property   | Type    | Required     |
| ---------- | ------- | ------------ |
| `list`     | boolean | **Required** |
| `nullable` | boolean | **Required** |
| `type`     | string  | **Required** |

#### list

`list`

- is **required**
- type: `boolean`

##### list Type

`boolean`

#### nullable

`nullable`

- is **required**
- type: `boolean`

##### nullable Type

`boolean`

#### type

`type`

- is **required**
- type: `string`

##### type Type

`string`

#### name

`name`

- is **required**
- type: `string`

##### name Type

`string`

## data

`data`

- is **required**
- type: `object`
- defined in this schema

### data Type

`object` with following properties:

| Property    | Type   | Required     |
| ----------- | ------ | ------------ |
| `row-names` | object | **Required** |

#### row-names

`row-names`

- is **required**
- type: `object`

##### row-names Type

`object` with following properties:

| Property | Type | Required |
| -------- | ---- | -------- |


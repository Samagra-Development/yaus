## URL Register API

### **POST `/api/register`**

> Store a new URL in the store.

**Request Body**

| Field        | Type     | Required | Notes                                                               |
| ------------ | -------- | -------- | ------------------------------------------------------------------- |
| user         | `string` | `true`   | User Id(UUID) of the user creating the url                          |
| tags         | `array`  | `false`  | Defined tags for the URL which can be tracked for future analysis   |
| url          | `string` | `false`  | Number of present clicks on the URL (Defaults to 0)                 |
| hashid       | `int`    | `false`  | Auto Incremented Id for the URL                                     |
| project      | `string` | `false`  | Project Id(UUID) for the the project for which the URL is created   |
| customHashId | `string` | `false`  | Unique custom keyword as an alternative to visti the url            |
| params       | `array`  | `false`  | Key, Value pairs to be attached with the url before the redirection |

Example:

```json
{
  "user": "string",
  "tags": [
    "string",
  ],
  "url": "string",
  "hashid": "integer",
  "project": "string",
  "customHashId": "string"
  "params": [
    "key": "value",
  ]
}
```

**Response**

Example:

```json
{
	"meta": {
		"status": 200
},
{
  "id": "string: UUID",
  "user": "string: UUID",
  "tags": [
    "string"
  ],
  "url": "string",
  "hashid": "integer",
  "project": "string: UUID",
  "customHashId": "string"
  "params": {
    "key": "value",
  }
}
```

**Errors**

_Known Request Error_

```json
{
	"meta": {
		"status": 500
	},
{
  "code": "A Prisma-specific error code.",
  "meta": "Additional information about the error - for example, the field that caused the error",
  "message": "Error message associated with error code"
  
}
```

_Unknown Request Error_

```json
{
	"meta": {
		"status": 500
	},
{
  "code": "A Prisma-specific error code.",
  "message": "Error message associated with error code"
}
```

_Missing/Invalid Payload_

```json
{
	"meta": {
		"status": 400
	},
	"error": {
		"code": "improper-payload",
		"message": "Invalid value provided for field `renderer`."
	}
}
```

_Invalid Request_

```json
{
	"meta": {
		"status": 500
	},
	"error": {
		"code": 500,
		"message": "Internal Server Error"
	}
}
```

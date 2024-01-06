<!-- Generator: Widdershins v4.0.1 -->

<h1 id="wake-on-lan">wake-on-lan v1.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="/wake-on-lan">/wake-on-lan</a>

License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication

- HTTP Authentication, scheme: basic 

* API Key (Bearer)
    - Parameter Name: **X-AUTHORIZATION**, in: header. Generated by /authentication

<h1 id="wake-on-lan-device">device</h1>

## get__device

`GET /device`

*Get devices*

> Example responses

> 200 Response

```json
[
  {
    "createdAt": "string",
    "id": "string",
    "mac": "string",
    "name": "string",
    "updatedAt": "string"
  }
]
```

<h3 id="get__device-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[response.Response](#schemaresponse.response)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[response.Response](#schemaresponse.response)|

<h3 id="get__device-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[entity.Device](#schemaentity.device)]|false|none|none|
|» createdAt|string|false|none|none|
|» id|string|false|none|none|
|» mac|string|false|none|none|
|» name|string|false|none|none|
|» updatedAt|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## put__device

`PUT /device`

*Create device*

> Body parameter

```json
{
  "mac": "string",
  "name": "string"
}
```

<h3 id="put__device-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[request.DeviceRequest](#schemarequest.devicerequest)|true|body|

> Example responses

> 200 Response

```json
{
  "createdAt": "string",
  "id": "string",
  "mac": "string",
  "name": "string",
  "updatedAt": "string"
}
```

<h3 id="put__device-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[entity.Device](#schemaentity.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[response.Response](#schemaresponse.response)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[response.Response](#schemaresponse.response)|

<aside class="success">
This operation does not require authentication
</aside>

## get__device_{id}

`GET /device/{id}`

*Get device*

<h3 id="get__device_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id|

> Example responses

> 200 Response

```json
{
  "createdAt": "string",
  "id": "string",
  "mac": "string",
  "name": "string",
  "updatedAt": "string"
}
```

<h3 id="get__device_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[entity.Device](#schemaentity.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[response.Response](#schemaresponse.response)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[response.Response](#schemaresponse.response)|

<aside class="success">
This operation does not require authentication
</aside>

## put__device_{id}

`PUT /device/{id}`

*Update device*

> Body parameter

```json
{
  "mac": "string",
  "name": "string"
}
```

<h3 id="put__device_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id|
|body|body|[request.DeviceRequest](#schemarequest.devicerequest)|true|body|

> Example responses

> 200 Response

```json
{
  "createdAt": "string",
  "id": "string",
  "mac": "string",
  "name": "string",
  "updatedAt": "string"
}
```

<h3 id="put__device_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[entity.Device](#schemaentity.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[response.Response](#schemaresponse.response)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[response.Response](#schemaresponse.response)|

<aside class="success">
This operation does not require authentication
</aside>

## post__device_{id}

`POST /device/{id}`

*Update device*

> Body parameter

```json
{
  "mac": "string",
  "name": "string"
}
```

<h3 id="post__device_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id|
|body|body|[request.DeviceRequest](#schemarequest.devicerequest)|true|body|

> Example responses

> 200 Response

```json
{
  "createdAt": "string",
  "id": "string",
  "mac": "string",
  "name": "string",
  "updatedAt": "string"
}
```

<h3 id="post__device_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[entity.Device](#schemaentity.device)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[response.Response](#schemaresponse.response)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[response.Response](#schemaresponse.response)|

<aside class="success">
This operation does not require authentication
</aside>

## delete__device_{id}

`DELETE /device/{id}`

*Delete device*

<h3 id="delete__device_{id}-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|id|

> Example responses

> 400 Response

```json
{
  "code": "string",
  "message": "string"
}
```

<h3 id="delete__device_{id}-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No Content|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[response.Response](#schemaresponse.response)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[response.Response](#schemaresponse.response)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="wake-on-lan-health">health</h1>

## get__health

`GET /health`

*Get health*

> Example responses

> 200 Response

```
"string"
```

<h3 id="get__health-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|string|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|string|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_entity.Device">entity.Device</h2>
<!-- backwards compatibility -->
<a id="schemaentity.device"></a>
<a id="schema_entity.Device"></a>
<a id="tocSentity.device"></a>
<a id="tocsentity.device"></a>

```json
{
  "createdAt": "string",
  "id": "string",
  "mac": "string",
  "name": "string",
  "updatedAt": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|createdAt|string|false|none|none|
|id|string|false|none|none|
|mac|string|false|none|none|
|name|string|false|none|none|
|updatedAt|string|false|none|none|

<h2 id="tocS_request.DeviceRequest">request.DeviceRequest</h2>
<!-- backwards compatibility -->
<a id="schemarequest.devicerequest"></a>
<a id="schema_request.DeviceRequest"></a>
<a id="tocSrequest.devicerequest"></a>
<a id="tocsrequest.devicerequest"></a>

```json
{
  "mac": "string",
  "name": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|mac|string|false|none|none|
|name|string|false|none|none|

<h2 id="tocS_response.Response">response.Response</h2>
<!-- backwards compatibility -->
<a id="schemaresponse.response"></a>
<a id="schema_response.Response"></a>
<a id="tocSresponse.response"></a>
<a id="tocsresponse.response"></a>

```json
{
  "code": "string",
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|code|string|false|none|none|
|message|string|false|none|none|

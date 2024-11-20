# Edge Addons API Library for nodejs

This library provides a simple way to interact with the Edge Addons API V1.1. It is a wrapper around the Edge Addons API, which is a RESTful API that allows you to interact with the Edge Addons platform.


## Installation

```bash
npm install @terateams/edge-addons-api
```

## Usage

```javascript
import { NextEdgeWebstoreClient } from '@terateams/edge-addons-api';

const client = new NextEdgeWebstoreClient(apiKey, clientId, productId);
const result = await client.submit('test.zip', notes);
```

## License

[MIT](https://github.com/terateams/edge-addons-api/blob/main/LICENSE)

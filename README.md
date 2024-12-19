# hono-dev-log
A middleware for hono.js development, logging requests and responses to console

### Usage
```js
import { Hono } from 'hono'
import { devLog } from 'hono-dev-log'

const app = new Hono()
app.use(devLog)

```


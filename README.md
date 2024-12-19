# hono-dev-log
A middleware for hono.js development, logging requests and responses to console

### Usage
```js
import { Hono } from 'hono'
import { devLog } from './middlewares/devLog.js'

const app = new Hono()
app.use(devLog)

```


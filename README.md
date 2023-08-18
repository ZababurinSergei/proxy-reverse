# stun

https://www.thisdot.co/blog/build-your-backend-with-netlify-functions-in-20-minutes/

```js
import type {HandlerContext, HandlerEvent} from '@netlify/functions'
import type {Request, Response} from 'express'
import express from 'express'
export async function handler(event : Event, context: Context) {
  const app = express()
  return serverless(app)(event, context)
}
```
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { handle } from 'hono-alibaba-cloud-fc3-adapter'

const app = new Hono()

app.use('/*', (c, next) => {
  const token = process.env.AUTH_TOKEN
  if (!token) {
    return next()
  }
  return bearerAuth({ token })(c, next)
})

app.get('/', async (c) => {
  const url = c.req.query('url')
  if (!url) {
    return c.text('你好 Hono！')
  }

  try {
    const userAgent = c.req.header('User-Agent')
    const headers: HeadersInit = {}
    if (userAgent) {
      headers['User-Agent'] = userAgent
    }

    const response = await fetch(url, { headers })

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    return c.text(`Proxy error: ${error}`, 500)
  }
})

export const handler = handle(app)
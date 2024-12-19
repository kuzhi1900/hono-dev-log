// 开发LOG中间件
require('colors')
export const devLog = async (c, next) => {
    if (c.req.path.includes('static')) {
        return next()
    }
    console.clear()
    console.log(
        '======================== DEV LOG - REQUEST =========================='.yellow.bgBlack
    )
    console.log('c.req.method'.yellow, c.req.method)
    console.log('c.req.url'.yellow, c.req.url)
    console.log('c.req.path'.yellow, c.req.path)
    console.log('c.req.query'.yellow, c.req.query())
    console.log('c.req.param'.yellow, c.req.param())
    if (c.req.method === 'POST') {
        console.log('c.req.body'.yellow, await c.req.json())
    }
    console.log(
        '======================== DEV LOG - REQUEST =========================='.yellow.bgBlack
    )
    console.log()
    await next()
    console.log()
    console.log(
        '======================== DEV LOG - RESPONSE =========================='.blue.bgBlack
    )
    console.log('c.res.status'.green, c.res.status)
    const res = await c.res.json()
    console.log('c.res.json'.blue, res)
    c.res = new Response(JSON.stringify(res), {
        status: c.res.status,
        headers: {
            ...c.res.headers,
            'Content-Type': 'application/json' // 设置响应为 JSON 格式
        }
    })
    console.log(
        '======================== DEV LOG - RESPONSE =========================='.blue.bgBlack
    )
    console.log()
}

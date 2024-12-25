require('colors')

export const devLog = async (c, next) => {
    if (c.req.path.includes('static')) {
        return next()
    }

    console.clear()
    console.log(
        '======================== DEV LOG - REQUEST =========================='
            .yellow.bgBlack
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
        '======================== DEV LOG - REQUEST =========================='
            .yellow.bgBlack
    )
    console.log()

    await next()
    console.log()

    console.log(
        '======================== DEV LOG - RESPONSE =========================='
            .blue.bgBlack
    )
    console.log('c.res.status'.green, c.res.status)

    // 检查响应是否为 JSON 格式
    let res
    const contentType = c.res.headers.get('Content-Type') || ''
    if (contentType.includes('application/json')) {
        try {
            res = await c.res.json()
            console.log('c.res.json'.blue, res)
            c.res = new Response(JSON.stringify(res), {
                status: c.res.status,
                headers: {
                    ...c.res.headers,
                    'Content-Type': 'application/json' // 确保响应为 JSON 格式
                }
            })
        } catch (error) {
            console.error('Error parsing JSON response:'.red, error.message)
            res = 'Response is not valid JSON'
            console.log('c.res.body'.blue, res)
        }
    } else {
        res = await c.res.text() // 如果不是 JSON，读取为文本
        console.log('c.res.text'.blue, res)
    }

    console.log(
        '======================== DEV LOG - RESPONSE =========================='
            .blue.bgBlack
    )
    console.log()
}

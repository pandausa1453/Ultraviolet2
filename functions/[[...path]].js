export async function onRequest(context) {
  const { request, params } = context
  let targetUrl

  // Use the path after the Pages URL as the target site
  if (params.path && params.path.length) {
    targetUrl = params.path.join('/')
    if (!targetUrl.startsWith('http')) {
      targetUrl = 'https://' + targetUrl
    }
  } else {
    // Default site to load if no path is given
    targetUrl = 'https://google.com'
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })

  const newResponse = new Response(response.body, response)
  newResponse.headers.set('Access-Control-Allow-Origin', '*')
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  newResponse.headers.set('Access-Control-Allow-Headers', '*')

  return newResponse
}

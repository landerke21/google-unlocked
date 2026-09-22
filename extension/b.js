chrome.webRequest.onHeadersReceived.addListener((details) => {
    const responseHeaders = Array.isArray(details.responseHeaders) ? details.responseHeaders : []
    const filteredHeaders = responseHeaders.filter(header => header.name.toLowerCase() !== 'access-control-allow-origin')
    filteredHeaders.push({ name: 'Access-Control-Allow-Origin', value: '*' })
    return { responseHeaders: filteredHeaders }
}, { urls: ['https://lumendatabase.org/*'] }, ['blocking', 'responseHeaders', 'extraHeaders'])



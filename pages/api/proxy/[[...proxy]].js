import requestIp from 'request-ip';


export default async function handler(req, res) {
    try {
        const { method, body, headers } = req;
        const { proxy } = req.query
        delete req.query.proxy
        // Define the URL you want to proxy to
        const queryParams = new URLSearchParams(req.query);
        const url = `https://127.0.0.1/${proxy !== undefined ? proxy.join('/') : ''}?${queryParams.toString()}`;
        let newHeader = { ...headers }
        newHeader['origin'] = newHeader['referer']
        delete newHeader['host']
        delete newHeader['content-length']
        delete newHeader['x-forwarded-for']
        newHeader['x-req-client-ip'] = requestIp.getClientIp(req)
        if (newHeader['x-req-client-ip'] === "::1") {
            delete newHeader['x-req-client-ip']
        }
        const _request = new Request(url, {
            method: method,
            body: method !== "GET" && method !== "HEAD" ? body : undefined,
            headers: newHeader
        });
        // Forward the request
        const response = await fetch(_request);

        // Pass along the headers from the target server's response
        for (const [key, value] of response.headers.entries()) {
          res.setHeader(key, value);
        }
        // Set status code from target response
        res.statusCode = response.status;
        // Manually stream the response body from target server to client
        const blob = await response.blob();
        const _blob = await blob.text();
        res.write(_blob);
        res.end();
    } catch (error) {
        // Handle errors
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * Cloudflare Worker for dohainfotech.com
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Route: Homepage
    if (url.pathname === '/') {
      return new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Doha InfoTech</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              padding: 50px;
              border-radius: 10px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 600px;
            }
            h1 { color: #333; margin-bottom: 20px; font-size: 3em; }
            p { color: #666; font-size: 1.1em; line-height: 1.6; margin-bottom: 20px; }
            .status { 
              background: #4CAF50; 
              color: white; 
              padding: 10px 20px; 
              border-radius: 5px; 
              display: inline-block;
              margin: 20px 0;
            }
            .api-link {
              margin-top: 30px;
            }
            a {
              color: #667eea;
              text-decoration: none;
              font-weight: bold;
            }
            a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Doha InfoTech</h1>
            <p>Welcome to your Cloudflare Workers deployment!</p>
            <div class="status">✓ Live on Cloudflare Edge</div>
            <div class="api-link">
              <p>Try the API: <a href="/api/status">/api/status</a></p>
            </div>
          </div>
        </body>
        </html>
      `, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    // Route: API Status
    if (url.pathname === '/api/status') {
      return new Response(JSON.stringify({
        status: 'online',
        domain: 'dohainfotech.com',
        timestamp: new Date().toISOString(),
        powered_by: 'Cloudflare Workers'
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    // Route: Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 404 Not Found
    return new Response(JSON.stringify({ error: 'Not Found' }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

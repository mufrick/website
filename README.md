# Website - Cloudflare Workers

A simple Cloudflare Workers project deployed to the edge.

## Getting Started

### Prerequisites
- Node.js 16+ installed
- Cloudflare account

### Installation

```bash
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

Visit `http://localhost:8787` to see your worker in action.

### Deployment

Deploy to Cloudflare:

```bash
npm run deploy
```

## Routes

- `/` - Welcome page
- `/api/hello` - JSON API endpoint
- All other paths return 404

## Configuration

Edit `wrangler.toml` to customize:
- Worker name
- Routes and domains
- Environment variables
- Triggers and schedules

For more info, see the [Wrangler docs](https://developers.cloudflare.com/workers/wrangler/).

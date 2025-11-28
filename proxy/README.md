# Clash Config Proxy

This is the proxy server component for Clash Config, built with [Hono](https://hono.dev/) and deployed to Alibaba Cloud Function Compute (FC3).

## Features

- **Serverless**: Deployed on Alibaba Cloud FC3.
- **Authentication**: Bearer Token authentication support.
- **Lightweight**: Built on Hono.

## Prerequisites

- Node.js (v20 recommended)
- pnpm
- Alibaba Cloud Account and credentials configured for Serverless Devs (`s` tool).

## Installation

1. Navigate to the proxy directory:

   ```bash
   cd proxy
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

## Configuration

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Generate a secure authentication token:

   ```bash
   node generate-token.js
   ```

3. Update your `.env` file with the generated token:

   ```dotenv
   AUTH_TOKEN=your_generated_token_here
   ```

   If `AUTH_TOKEN` is set, all requests will require a `Authorization: Bearer <token>` header. If not set, authentication is disabled.

## Deployment

To deploy the function to Alibaba Cloud:

```bash
pnpm run deploy
```

This script uses `dotenv` to load your `.env` file and then runs `s deploy`.

## Development

To build the project locally:

```bash
pnpm run build
```

## API Endpoints

### `GET /`

Returns a simple greeting.

**Request:**

```http
GET / HTTP/1.1
Authorization: Bearer <your_token>
```

**Response:**

```text
你好 Hono！
```

# Stablecoin

A centralized cryptocurrency exchange platform.

## Prerequisites

- Docker
- Node.js

## Installation

```bash
npm install -C backend
npm install -C frontend
```

## Usage

```bash
docker-compose up -d
npm run build -C frontend && npm start -C frontend
npm run build -C backend && npm run start:prod -C backend
```

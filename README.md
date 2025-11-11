# QR & Barcode Studio

A web app to generate QR codes and barcodes, scan images to decode codes, and download results.

## Getting started

Prerequisites:
- Node.js and npm installed 

Setup:
```sh
npm install
npm run dev
```

## Available scripts

- dev: Start the development server
- build: Build for production
- build:dev: Build with development mode
- preview: Preview the production build
- lint: Run linting

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## License

This project is provided as-is under your chosen license. Update this section as needed.

## Run with Docker (no Node setup required)

Build and run:
```sh
docker build -t code-fusion-scanner .
docker run -p 8080:80 code-fusion-scanner
```


# Serverless CRUD API

A serverless REST API built with AWS API Gateway, Lambda, and DynamoDB using the Serverless Framework and TypeScript.

## Features

- CRUD operations for items
- TypeScript support
- AWS API Gateway integration
- DynamoDB storage
- CORS enabled
- Multi-stage deployments (dev/prod)
- GitHub Actions CI/CD pipeline

## Prerequisites

- Node.js 18.x
- AWS CLI configured with appropriate credentials
- Serverless Framework CLI
- GitHub account (for CI/CD)

## Project Structure

```
.
├── src/
│   ├── handlers/         # Lambda function handlers
│   ├── utils/           # Utility functions
│   └── types.ts         # TypeScript type definitions
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── serverless.yml       # Serverless Framework configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## API Endpoints

- `POST /items` - Create a new item
- `GET /items` - List all items
- `GET /items/{id}` - Get a single item
- `PUT /items/{id}` - Update an item
- `DELETE /items/{id}` - Delete an item

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd serverless-crud-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure AWS credentials:
   ```bash
   aws configure
   ```

4. Deploy to development:
   ```bash
   npm run deploy:dev
   ```

5. Deploy to production:
   ```bash
   npm run deploy:prod
   ```

## CI/CD Setup

1. Fork the repository to your GitHub account
2. Add the following secrets to your GitHub repository:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

3. The GitHub Actions workflow will automatically:
   - Build the TypeScript code
   - Deploy to dev environment
   - Deploy to prod environment (only on main branch)

## API Usage Examples

### Create Item
```bash
curl -X POST https://your-api-url/dev/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "description": "This is a test item"}'
```

### Get Item
```bash
curl https://your-api-url/dev/items/{id}
```

### List Items
```bash
curl https://your-api-url/dev/items
```

### Update Item
```bash
curl -X PUT https://your-api-url/dev/items/{id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "This is an updated item"}'
```

### Delete Item
```bash
curl -X DELETE https://your-api-url/dev/items/{id}
```

## Development

1. Make changes to the code
2. Run the build command:
   ```bash
   npm run build
   ```
3. Deploy to dev environment:
   ```bash
   npm run deploy:dev
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC # serverless-framework

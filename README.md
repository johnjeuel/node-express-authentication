# traffle-api

Template for Back-end Authentication using Node, Express and MongoDB

## getting started

**Requirements:**

- TypeScript (https://www.typescriptlang.org/download)
- MongoDB Service (Local / Cloud). Install On-premises MongoDB (Local) https://www.mongodb.com/try/download/community or use a cloud service (https://www.mongodb.com/atlas/database)
- ```npm install``` Install required packages

**Scripts**

```npm run serve``
Run development environment. Recompiles TypeScript code on save and re-runs the server after. 
## environment variables

Create a .env file with the following variables:
```
NODE_ENV=                           // optional: defaults to 'dev' if not provided
MONGODB_URI=                        // required: mongodb service url
JWT_SECRET=                         // required: to be used by auth service
```
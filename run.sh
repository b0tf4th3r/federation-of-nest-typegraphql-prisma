#!/bin/bash
echo "worker-api"
cd worker-api
npm install
npm run migrate
npm run seed
# to prevent gateway error
sed -i "s/export class AffectedRowsOutput/@TypeGraphQL.Directive('@shareable') \\nexport class AffectedRowsOutput/g" ./__generated__/typegraphql-prisma/resolvers/outputs/AffectedRowsOutput.ts
npm run start &

echo "device-api"
cd ..
cd device-api
npm install
npm run migrate
npm run seed
# to prevent gateway error
sed -i "s/export class AffectedRowsOutput/@TypeGraphQL.Directive('@shareable') \\nexport class AffectedRowsOutput/g" ./__generated__/typegraphql-prisma/resolvers/outputs/AffectedRowsOutput.ts
npm run start &

sleep 20

echo "gateway"
cd ..
cd gateway
npm install
npm run start

tail -f /dev/null
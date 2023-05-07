#!/bin/sh

echo "DATABASE_URL=$DATABASE_URL" > .env
echo "SENDGRID_API_KEY=$SENDGRID_API_KEY" >> .env
echo "SENDGRID_SENDER=$SENDGRID_SENDER" >> .env

npm run start
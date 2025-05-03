#!/bin/bash
python -m venv venv
source /workspaces/lazy_agent/venv/bin/activate
cd back
pip install -r requirements.txt
cd ..
cd front 
npm i
touch .env.local 
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
echo "NEXT_PUBLIC_NEXT_API_URL=http://localhost:3000/api" >> .env.local
cd ..
cd back
touch .env.local
echo "DATABASE_URL="postgresql://lazy_helper:lazy@db/lazy_agent"" > .env.local
echo "GOOGLE_API_KEY=ここにAPIkeyを入れる" >> .env.local
cd ..

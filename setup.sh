#!/bin/bash
python -m venv venv
source /workspaces/lazy_agent/venv/bin/activate
cd back
pip install -r requirements.txt
cd ..
cd front 
npm i
cd ..


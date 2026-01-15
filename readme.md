# AI-Powered Request for Proposal (RFP) Management System

## Overview
A single-user web application that streamlines procurement RFP workflows using AI.
The system converts natural language requirements into structured RFPs, sends them to vendors,
parses vendor responses automatically, and recommends the best vendor.

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB
- AI: OpenAI (GPT-4o-mini)
- Email: Nodemailer (SMTP via Gmail)

## Key Features
- Natural language → structured RFP using AI
- Vendor management and RFP email dispatch
- AI-based parsing of vendor responses
- Proposal comparison dashboard
- AI-assisted vendor recommendation with reasoning

## Assumptions & Trade-offs
- Single-user system (no authentication)
- Vendor replies are demonstrated via paste-based input instead of IMAP polling
- Attachments parsing is out of scope

## AI Usage
AI is used for:
1. Structuring RFPs from natural language
2. Parsing unstructured vendor proposals
3. Comparing proposals and recommending vendors

## Running Locally
1. Setup backend (.env.example)
2. npm install && npm run dev (backend)
3. npm install && npm run dev (frontend)

## Flow
1. Create RFP using natural language
2. Add vendors and send RFP via email
3. Paste vendor response
4. Compare proposals
5. Get AI recommendation

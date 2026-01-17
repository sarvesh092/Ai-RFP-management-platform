# AI-Powered Request for Proposal (RFP) Management System

A single-user web application that streamlines procurement RFP workflows using AI. The system converts natural language requirements into structured RFPs, dispatches them to vendors via email, parses unstructured vendor responses into comparison tables, and utilizes AI to recommend the best vendor.

## 1. Project Setup

### a. Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas connection string)
- **OpenAI API Key** (for generating RFPs and parsing proposals)
- **Gmail Account** (for sending emails via Nodemailer)

### b. Installation Steps

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

### c. Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string           # Your MongoDb connection string
OPENAI_API_KEY=your_openAi_api_key                 # Your OpenAI Key
EMAIL_USER=your-email@gmail.com                    # Gmail address used to send RFPs
EMAIL_PASS=your-app-password                       # Gmail App Password (not login password)
```
#### Generating `EMAIL_PASS`
To enable email sending via Nodemailer, you must generate a **Gmail App Password** for the email account you are using in `EMAIL_USER`:

1. Go to your **Google Account → Security**
2. Enable **2-Step Verification**
3. Search and Open **App Passwords**
4. Create a new app password
5. Google will generate a **16-character password**
6. Use this value as `EMAIL_PASS` in your `.env` file

### d. Running Locally

You need to run both the frontend and backend servers concurrently.

**Start Backend**

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend**

```bash
cd frontend
npm run dev
# Client runs on http://localhost:5173
```

### e. Seed Data

The application starts empty. You can:

1. Go to **RFP Management** page.
2. Use the **Vendors** card to add new vendors (Name & Email).

## 2. Tech Stack

### a. Frontend

- **Framework**: React (Vite)
- **UI Library**: Ant Design (antd)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Ant Design Icons

### b. Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: OpenAI SDK (GPT-4o-mini)
- **Email Service**: Nodemailer (SMTP)

## 3. API Documentation

### RFP Endpoints

- **POST** `/api/rfp/generate`
  - Body: `{ text: "Requirement description..." }`
  - Response: `{ title, items: [...], ... }` (Structured RFP object)
- **GET** `/api/rfp`
  - Returns: List of all generated RFPs.
- **GET** `/api/rfp/:id`
  - Returns: Single RFP details by ID.

### Vendor Endpoints

- **GET** `/api/vendor`
  - Returns: List of all vendors.
- **POST** `/api/vendor`
  - Body: `{ name: "Vendor Inc", email: "contact@vendor.com" }`
  - Returns: Created vendor object.

### Email Endpoints

- **POST** `/api/email/:rfpId/send`
  - Body: `{ vendorIds: ["id1", "id2"] }`
  - Action: Sends the RFP details to selected vendors via email.

### Proposal Endpoints

- **POST** `/api/proposal/parse`
  - Body: `{ rfpId, vendorId, text: "Raw proposal text..." }`
  - Action: Uses AI to extract structured data (price, warranty, etc.) from text and saves a proposal record.
- **GET** `/api/proposal/:rfpId`
  - Returns: List of parsed proposals for a specific RFP.
- **POST** `/api/proposal/recommend/:rfpId`
  - Action: Analyzes all proposals for an RFP and returns an AI-generated recommendation with reasoning.

## 4. Decisions & Assumptions

### a. Key Design Decisions

- **AI-First Workflow**: Instead of complex forms, the app relies on Natural Language Processing (NLP) to generate RFPs and parse incoming vendor emails (simulated via text paste).
- **Component Architecture**: The Proposal screen is modularized (`ParseVendorProposal`, `CompareAndRecommendation`) to handle distinct logic for data entry vs. data analysis.
- **State Persistence**: URL-based routing (`/proposals/:id`) is used to ensure application state survives page refreshes.

### b. Assumptions

- **Single User**: The system is designed for a single procurement officer; no authentication or multi-role support is implemented.
- **Manual Input for Proposals**: Since we cannot easily poll a real email inbox in this demo environment, we assume the user copies the vendor's email response and pastes it into the "Parse Vendor Response" text area.
- **Text-Based Proposals**: We assume vendor proposals are text-based. Parsing PDF/Excel attachments is out of scope.

## 5. AI Tools Usage

### a. Tools Used
    - Copilot
    - ChatGPT

### b. How AI Helped

- **UI & UX Design:** Helped refine the layout and step-by-step flow to keep the application intuitive and easy to follow.
- **Debugging Support:** Used for diagnosing issues, validating data models, and debugging API problems.
- **Documentation:** Assisted in drafting this README to accurately reflect the project’s decisions.

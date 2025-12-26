# MeetSphere API

MeetSphere API is a Node.js and Express-based backend service for managing meetup events, providing CRUD operations and search/filter capabilities for online and offline events stored in MongoDB.

## Tech Stack

- **Runtime:** Node.js 
- **Framework:** Express
- **Database:** MongoDB with Mongoose ODM 
- **Other:** CORS, dotenv

## Features

- Create new meetup events.  
- Retrieve all events or a single event by ID.  
- Search and filter events by type (Online, Offline, Both) and query term (title, tags).  
- Update existing events by ID.  
- Delete events by ID.

## Live Deployment

- Hosted on **Vercel** as a backend API.  https://meetup-app-backend-chi.vercel.app/

## Getting Started

### Prerequisites

- Node.js (LTS recommended).
- A MongoDB database (local or cloud, e.g. MongoDB Atlas).

### Installation

1. Clone the repository:
git clone https://github.com/Rjesh-Kumar/Meetsphere-App-Backend.git
cd meetsphere-api

2. Install dependencies:
npm install


### Environment Variables

Create a `.env` file in the project root and add:

MONGODB=your-mongodb-connection-string

PORT=4000 PORT number give like: 3000/4000 etc.


Use the same variable names that your `db/db.connect` file expects for the MongoDB connection.


### Running the Server

- Development: npm run dev

- By default, the server listens on **PORT 4000**, so the base URL for local development is: http://localhost:4000


## API Endpoints

Base URL (local): http://localhost:4000

Base URL (production): https://meetup-app-backend-chi.vercel.app/

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/events` | Get all events |
| `GET` | `/events/search?type=Online&q=react` | Search/filter |
| `GET` | `/events/:id` | Single event |
| `POST` | `/events` | Create event |
| `POST` | `/events/:id` | Update event |
| `DELETE` | `/events/:id` | Delete event |


## Contact
For bugs or feature request, please reach out to rajeshkumarrout40@gmail.com
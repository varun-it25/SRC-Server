# Event Management API

This is a simple RESTful API built with Node.js, Express, and MongoDB to manage events and members. It allows users to create events and members, and retrieve event and member data from the database.

## Features

- **Create Events**: Allows the creation of event data such as event name, description, date, and guest information.
- **Create Members**: Allows the addition of member details including name, role, and contact information.
- **Get Events**: Retrieve a list of all events or specific event details by ID.
- **Get Members**: Retrieve a list of all members or specific member details by ID.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (locally or use MongoDB Atlas)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/event-management-api.git
    cd event-management-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory to store environment variables (optional):
    ```bash
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/src
    ```

4. Start the MongoDB server (if running locally):
    ```bash
    mongod
    ```

5. Run the application:
    ```bash
    npm start
    ```

The server will start on `http://localhost:3000` (or your specified `PORT`).

## API Endpoints

### 1. Create Event

**POST** `/create-event`

Create a new event by sending the following JSON payload:

```json
{
  "event_banner": "image_url",
  "event_name": "Event Name",
  "event_venue": "Venue Name",
  "event_description": "Event Description",
  "event_date": "2025-01-26",
  "event_start_time": "10:00 AM",
  "event_end_time": "2:00 PM",
  "guest_image": "guest_image_url",
  "guest_name": "Guest Name",
  "guest_email": "guest@example.com",
  "guest_mobile_no": "1234567890"
}
# WebSocket Server with Express & React

This repository demonstrates a WebSocket server built using **Node.js**, **Express**, **React**, and the **`ws`** library. The project features real-time communication, multiple room logic, typing indicators, and stores chat history using **PostgreSQL**. It aims to replicate **WhatsApp**-like functionality, implementing chat rooms, real-time typing, and more.

## Project Structure

### 1) **1server.js** – **Express Server Setup**
   - **Description**: Sets up a basic Express server in Node.js.
   - **Functionality**: Initializes the HTTP server to handle routes and middlewares.

### 2) **2WSS.js** – **WebSocket Server with `ws` Library**
   - **Description**: Sets up a WebSocket server using the `ws` library.
   - **Functionality**: Handles WebSocket connections, allowing clients to send and receive messages in real-time.

### 3) **3server.js** – **WebSocket Server with Express**
   - **Description**: Combines Express with WebSocket functionality.
   - **Functionality**: Creates a WebSocket server integrated with Express for both HTTP and WebSocket communication.
   - **Frontend for `3server.js`**:
     - **Description**: React-based frontend that connects to the `3server.js` WebSocket server.
     - **Functionality**: Allows users to interact with the server, send and receive messages in real-time.

### 4) **4Rooms.js** – **Room-Based WebSocket Server**
   - **Description**: Extends the WebSocket server (`3server.js`) to support "rooms."
   - **Functionality**: Users can join specific rooms, and messages are sent only to clients in the same room.
   - **Frontend for `4Rooms.js`**:
     - **Description**: React-based frontend that supports the room logic implemented in `4Rooms.js`.
     - **Functionality**: Users can join and chat within specific rooms.

### 5) **5Typing** – **Typing Indicator Logic (Frontend & Backend)**
   - **Description**: Implements the **typing indicator** feature in real-time.
   - **Structure**: Contains both frontend and backend code that tracks when a user is typing and displays a "typing..." indicator in the UI.

### 6) **6** – **WhatsApp-like Chat System (Frontend & Backend)**
   - **Description**: Mimics all major features of **WhatsApp**, including real-time messaging, user connections, and rooms.
   - **Functionality**: Includes both frontend and backend code to replicate WhatsApp-like functionality.

## Key Features

1. **Multiple Rooms Logic**:
   - Users can create and join different chat rooms for isolated communication. Each room operates independently, enabling users to send messages within specific rooms.

2. **Typing Indicator**:
   - The **5Typing** folder implements the **typing indicator** feature. Users will see a real-time "typing..." indicator when someone is typing in the room.

3. **Chat History with PostgreSQL**:
   - All chat messages are saved in a PostgreSQL database using **Prisma**. This allows users to retrieve chat history, ensuring conversations are accessible at any time.

## Upcoming Features

- **List of Users in Room**:
   - Users can view the list of participants currently active in any given room.

- **Private Rooms**:
   - The ability to create **private rooms**, allowing users to restrict access to specific people.

## Tech Stack

- **Frontend**:
   - React, WebSockets

- **Backend**:
   - Node.js, Express, `ws` for WebSocket server
   - PostgreSQL, Prisma for database management

- **Real-time Communication**:
   - WebSockets for real-time message broadcasting

## How to Run the Project

### Prerequisites

- Node.js (v12 or higher)
- PostgreSQL
- npm or yarn (for installing dependencies)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArthKulkarni93/WebSockets.git
   cd WebSockets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and configure the connection in `6/6BE/prisma/schema.prisma`.

4. Run the backend server:
   ```bash
   node server.js
   ```

5. Run the frontend React app:
   ```bash
   npm run dev
   ```

### Visit the app in your browser at:
   - Frontend: `http://localhost:5173`
   - WebSocket Server: `ws://localhost:4001`

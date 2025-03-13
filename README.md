# WebSocket Server with Express & React

This repository demonstrates a WebSocket server built using Node.js, Express, and the `ws` library. The project includes both server-side and frontend code with different features and functionalities related to WebSocket communication.

## Project Structure

### 1. **`server.js`** - Simple Express Server (Node.js)
   - **Description**: Sets up a basic Express server in Node.js.
   - **Functionality**: Creates an HTTP server that can be extended to handle different routes and middlewares.

### 2. **`WSS.js`** - WebSocket Server with `ws` Library
   - **Description**: Creates a WebSocket server using the `ws` library.
   - **Functionality**: Handles WebSocket connections, sending and receiving messages to/from clients.

### 3. **`server.js`** - WebSocket Server with Express (Node.js)
   - **Description**: A more advanced version of a WebSocket server that integrates WebSockets with the Express server.
   - **Functionality**: Creates a WebSocket server while maintaining HTTP functionalities provided by Express.

### 4. **`frontend`** - Frontend for `server.js` (React)
   - **Description**: A React-based frontend application to interact with the WebSocket server created in `server.js`.
   - **Functionality**: Provides a UI where users can connect to the WebSocket server, send and receive messages.

### 5. **`Rooms.js`** - WebSocket Server with Express and Rooms
   - **Description**: Extends the WebSocket server (`server.js`) to include the concept of "rooms", allowing users to join specific rooms.
   - **Functionality**: Users can send messages to specific rooms, and only clients in those rooms will receive the messages.

### 6. **`FE`** - Frontend for `Rooms.js` (React)
   - **Description**: A React-based frontend that supports the "rooms" functionality of the WebSocket server.
   - **Functionality**: Users can join and send messages within specific rooms.

## Current Features

- **WebSocket Connections**: Real-time communication between the server and clients.
- **Basic Chat**: Users can send and receive messages in real-time.
- **Room Feature**: Users can join specific rooms, allowing for targeted communication within the WebSocket server.

## Next Goals

The following features are planned for future implementation:

- **Private Rooms**: Allow users to create private rooms with restricted access.
- **User List in Room**: Display the list of users currently in a particular room.
- **Typing Indicator**: Show a "typing" indicator when a user is typing a message in a room.
- **Message History**: Store chat history in a database (PostgreSQL, Prisma) for future retrieval.

> **Note**: These features are **not yet implemented** but are part of the roadmap for future versions.

## How to Run the Project

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn (for installing dependencies)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ArthKulkarni93/WebSockets.git
   cd WebSockets

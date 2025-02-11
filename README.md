# Event Management Backend  

## API Endpoints  

### Authentication  
- **POST** `/api/auth/register` – Register a new user  
- **POST** `/api/auth/login` – Login user and get JWT token  
- **GET** `/api/auth/getProfile` – Get user profile (Protected)  

### Events  
- **POST** `/api/createEvent` – Create an event (Protected, with image upload)  
- **GET** `/api/getEvents` – Get all events  
- **GET** `/api/getEvent/:id` – Get a single event by ID  
- **PUT** `/api/editEvent/:id` – Edit an event (Protected, with image upload)  
- **POST** `/api/deleteEvent/:id` – Delete an event (Protected)  

### Attendee Management  
- **POST** `/api/registerToEvent/:id` – Register for an event (Protected)  
- **POST** `/api/unregisterToEvent/:id` – Unregister from an event (Protected)  


## Project Structure

### 1. **config**  
Contains configuration files, such as the database connection setup.

### 2. **utils**  
Stores utility functions, including socket-related utilities.

### 3. **controllers**  
Holds the business logic for processing requests and interacting with the database.

### 4. **models**  
Defines the data models for the application (e.g., Event, User).

### 5. **routes**  
Contains route definitions for different API endpoints.


## Socket Working

    initSocket(server): Initializes the socket connection with the provided server.
    connection event: Fired whenever a user connects to the socket server.
    joinEvent event: Fired when a user joins an event. The user is added to the event’s participant list, and the updated count is emitted.
    leaveEvent event: Fired when a user leaves an event. The user is removed from the participant list, and the updated count is emitted.

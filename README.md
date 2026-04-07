# Flashcard Learning App 
## Project Overview
This is a **Single-Page Application (SPA)** designed for efficient learning through digital flashcards. The interface is inspired by **modern art galleries**, featuring a minimalist aesthetic, a **Morandi color palette**, and seamless CRUD operations to manage study materials.

## Features
### 1. Seamless CRUD Operations
The application fulfills all CRUD requirements as specified in the assignment:
*   **Create**: Add new flashcards with a category through a sleek modal interface.
*   **Read**: Dynamically fetch and display all active flashcards (where `is_learned = 0`) from the MySQL database.
*   **Update**: 
        1. Content Management: Users can modify the question, answer, and category of existing cards.
        2. Status Update: Marking a card as "learned" updates its status in the database, triggering the "disappearing" effect.
        3. Global Reset: A dedicated function to batch-update all cards back to an "unlearned" state.
*   **Delete**: Permanently remove cards from the collection with a confirmation prompt.

### 2. Gallery-Inspired UX/UI
While the core is functional, the interface draws heavy inspiration from modern gallery aesthetics to enhance focus:
*   **Museum Aesthetic**: High contrast typography, generous whitespace, and subtle backdrop blurs.
*   **Morandi Palette**: Uses sophisticated, low-saturation colors (Foggy Blue, Sage Green) for a focused learning environment.
*   **Disappearing Logic**: Following requirements, cards "disappear" after use (marked as learned) to simulate progress.
*   **Responsive Design**: A fully fluid layout that transforms from a multi-column grid to a focused vertical stack on mobile devices.

### 3. Study Tools
*   **Category Filtering**: Sort cards by topics dynamically extracted from your data.
*   **Reset Gallery**: A one-click restoration feature that resets all learned statuses in the database.

### 4. User Experience (UX) Decision: "Got it" vs. Auto-Hide
Regarding the requirement "The card disappears after use":

*   **The Problem**: An automatic timer-based disappearance may interrupt the user's reading flow, causing frustration if the answer is long or complex.

*  **The Solution**: To ensure a seamless and non-interrupted experience, I implemented a manual confirmation button ("Got it! Hide this") on the back of each card.

*  **The Result**: The card only disappears once the user explicitly confirms they have memorized the content. This respects the user's reading pace while still fulfilling the requirement that cards disappear after use. Users can restore all cards at any time via the "Reset All" action

## Tech Stack
*   **Frontend**: React.js, Axios, CSS3 (Flexbox/Grid/3D Transforms).
*   **Backend**: Node.js, Express.js.
*   **Database**: MySQL.

## Folder Structure
- `/Back-end`: Node.js server, API routes, and database connection.
- `/Front-end/client`: React frontend, components, and styling.
- `/flashcard.sql`: Database export for MySQL Workbench.

## Challenges Overcome
During the development, one major challenge was ensuring a seamless User Experience (UX) while adhering to the "card disappears after use" requirement. I initially considered an automatic timer, but realized it might interrupt the user's reading flow, so I implemented a manual "Got it" confirmation to give users control. Another technical hurdle was managing the state transitions in a Single-Page Application (SPA) to ensure that CRUD operations (like deleting or adding a card) reflected instantly without a page reload. Lastly, configuring the Express backend to handle CORS and MySQL connection errors ensured the app remains stable even during database interruptions.


## Installation & Setup

### 1. Database Setup
1. Open MySQL Workbench.
2. Import the provided `flashcard_db.sql` file.

### 2. Backend Configuration
1. Navigate to the server directory: `cd Back-end`
2. Install dependencies: `npm install`
3. **IMPORTANT**: Open `server.js` and verify the database credentials:
   - **Host**: localhost
   - **User**: root
   - **Password**: `XXXXXXXX` (Please update this to your local MySQL password)
   - **Database**: `flashcard_db`
4. Start the server: `node server.js` (Running on http://localhost:8080)

### 3. Frontend Configuration
1. Navigate to the client directory: `cd Front-end/client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

---
*Developed for Web Systems Assignment 1.*
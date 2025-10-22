# Manual Testing Instructions

This document provides a step-by-by-step guide to manually test the full functionality of the Mini AI Studio web application.

## Prerequisites

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```
3.  **Set up environment variables:**
    *   Create a `.env` file in the `backend` directory and add the following, replacing the placeholder with your PostgreSQL database connection string:
        ```
        DATABASE_URL="postgresql://user:password@host:port/database"
        ```
    *   Create a `.env` file in the `frontend` directory and add the following, replacing the placeholder with the URL of your backend server:
        ```
        VITE_API_BASE_URL="http://localhost:3001"
        ```
4.  **Create the database schema:**
    *   Connect to your PostgreSQL database and run the SQL commands in `backend/src/db/init.sql` to create the `users` and `generations` tables.

## Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    npm run dev
    ```
2.  **Start the frontend server:**
    ```bash
    cd frontend
    npm run dev
    ```
3.  **Open the application:**
    *   Open your web browser and navigate to `http://localhost:5173`.

## Testing Scenarios

### 1. User Authentication

1.  **Sign Up:**
    *   On the signup page, enter a valid email address and password.
    *   Click the "Sign Up" button.
    *   You should be redirected to the login page.
2.  **Log In:**
    *   On the login page, enter the email address and password you used to sign up.
    *   Click the "Login" button.
    *   You should be redirected to the home page.
3.  **Log Out:**
    *   On the home page, click the "Logout" button.
    *   You should be redirected to the login page.

### 2. Image Generation

1.  **Upload an Image:**
    *   On the home page, click the "Choose File" button to select an image from your computer.
    *   A preview of the selected image should appear.
2.  **Enter a Prompt and Select a Style:**
    *   In the "Prompt" input field, enter a text prompt (e.g., "a red dress").
    *   From the "Style" dropdown, select a style (e.g., "Style 1").
3.  **Generate an Image:**
    *   Click the "Generate" button.
    *   The button should become disabled and show "Generating...".
    *   After a 1-2 second delay, the generation should complete.
4.  **View the Generation in the History:**
    *   The newly generated image should appear in the "Recent Generations" section with a thumbnail and timestamp.

### 3. Error Handling and Retry

1.  **Simulated "Model Overloaded" Error:**
    *   The backend has a 20% chance of returning a "Model overloaded" error. You may need to try generating an image multiple times to trigger this error.
    *   When the error occurs, an error message should be displayed, and the frontend will automatically retry up to 3 times.
    *   If the retries fail, a "Try Again" button will appear. Clicking this button should re-submit the generation request.
2.  **Abort Generation:**
    *   While a generation is in progress, an "Abort" button will appear.
    *   Clicking the "Abort" button should cancel the generation request.

### 4. Restore a Generation

1.  **Click a Recent Generation:**
    *   In the "Recent Generations" section, click on one of the previously generated images.
2.  **Restore to Workspace:**
    *   The image, prompt, and style of the selected generation should be restored to the Image Generation Studio workspace.

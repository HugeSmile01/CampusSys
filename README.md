# CampusSys

## Project Overview

CampusSys is a web application designed to facilitate communication and collaboration between students and teachers within a campus. The application provides various features such as a calendar planner, newsfeed, resources, and user account management.

## Features

- Calendar Planner: Plan and manage events with a drag-and-drop interface.
- Newsfeed: Stay updated with the latest posts and announcements.
- Resources: Access and manage educational resources.
- User Account Management: Register, login, and manage user profiles.
- Notifications: Receive notifications for important updates and events.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HugeSmile01/CampusSys.git
   cd CampusSys
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   ```bash
   echo "NODE_OPTIONS=--openssl-legacy-provider" > .env
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

## Usage Guidelines

- **Navigating the Application**: Use the navigation menu to access different sections of the application such as the calendar planner, newsfeed, resources, and account management.
- **Adding Events**: In the calendar planner, click the "Add Event" button to create a new event. Drag and drop events to reschedule them.
- **Posting Updates**: In the newsfeed, click the "Add Post" button to create a new post. Edit or delete posts as needed.
- **Managing Resources**: In the resources section, add, edit, or delete educational resources.
- **User Account Management**: Register a new account, login, and update your profile information in the account management section.
- **Receiving Notifications**: Check the notifications section for important updates and events.

## Webpack OpenSSL Issue with Node.js 17+

When using Node.js 17 or newer, you may encounter an issue with Webpack due to changes in OpenSSL. To resolve this issue, we need to set the environment variable `NODE_OPTIONS=--openssl-legacy-provider`.

### Solution

1. **package.json**: The `build` and `start` scripts in `package.json` have been updated to include `NODE_OPTIONS=--openssl-legacy-provider` before `react-scripts build` and `react-scripts start`.

2. **.env file**: A `.env` file has been added to the repository with the following content to ensure compatibility during development:

   ```
   NODE_OPTIONS=--openssl-legacy-provider
   ```

By setting this environment variable, we ensure that the application works correctly with Node.js 17+.

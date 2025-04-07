# CampusSys

CampusSys is a web application designed for students and teachers within the campus. It provides various features to enhance the user experience and ensure security.

## Features

- **Hamburger Menu**: A sliding menu that appears from the side of the screen when the toggle button is clicked. It uses CSS transitions to create a smooth sliding effect and can be closed by clicking outside the menu area or pressing the escape key.
- **Newsfeed**: A component that displays posts with filtering and sorting options. Users can filter posts by categories, tags, or date, and sort them by most recent, most liked, or most commented. It also implements real-time updates using WebSockets or Firebase.
- **Footer**: A component that includes a back-to-top button with smooth scrolling for a better user experience. The button is positioned in a fixed location, such as the bottom right corner of the screen.
- **Header**: A component that includes a search bar, dropdown menu for user profile options, notification icon with unread count, and sticky behavior to remain visible at the top of the page while scrolling.
- **Login**: A component that stores sessionId in a cookie with HttpOnly and Secure flags. It implements rate limiting and CAPTCHA to prevent automated attacks and uses HTTPS for secure data transmission. Proper access controls and the principle of least privilege are followed.
- **Registration**: A component that handles errors securely and provides user feedback. It implements rate limiting and CAPTCHA to prevent automated attacks and uses HTTPS for secure data transmission. Proper access controls and the principle of least privilege are followed.
- **User Profile**: A component that allows users to update their profile information and enroll in multi-factor authentication (MFA) for enhanced security.
- **Notifications**: A component that implements Firebase Cloud Messaging (FCM) notifications to enhance user experience with real-time updates.
- **Calendar Planner**: A component that allows users to manage events with input validation and sanitization to ensure data integrity and prevent malicious input.

## Firebase Integration

CampusSys uses Firebase as the database for data storage and retrieval. The following steps were taken to integrate Firebase:

1. Set up a Firebase project in the Firebase Console and added a web app to the project.
2. Installed the Firebase SDK by running `npm install firebase` in the project directory.
3. Created a `firebaseConfig.js` file in the `src` directory to store the Firebase configuration and initialize Firebase.
4. Updated the API functions in `src/utils/api.js` to use Firebase Firestore for data storage and retrieval.
5. Updated the components to use the new Firebase-based API functions for data operations.

## Security Considerations

When using Firebase as a database, the following security aspects were considered:

- **Authentication and authorization**: Only authenticated users can access the database. Firebase Authentication is used to manage user sign-ins and implement role-based access control.
- **Database rules**: Firebase Realtime Database or Firestore security rules are configured to control read and write access to the database.
- **Data encryption**: HTTPS is used to encrypt data transmitted between the client and Firebase servers. Firebase automatically encrypts data at rest.
- **Validation**: User input is validated on both the client and server sides to prevent malicious data from being stored in the database.
- **Rate limiting**: Rate limiting is implemented to prevent abuse and protect the database from denial-of-service attacks.
- **Monitoring and logging**: Firebase's monitoring and logging features are enabled to track access patterns, detect anomalies, and identify potential security threats.
- **Regular updates**: The Firebase SDK and dependencies are kept up to date to ensure the latest security patches and improvements.
- **Access control**: The principle of least privilege is followed by granting only the necessary permissions to users and services. Firebase IAM (Identity and Access Management) is used to manage access control.
- **Backup and recovery**: A robust backup and recovery strategy is implemented to protect data in case of accidental deletion or corruption.

## Getting Started

To get started with CampusSys, follow these steps:

1. Clone the repository: `git clone https://github.com/HugeSmile01/CampusSys.git`
2. Navigate to the project directory: `cd CampusSys`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

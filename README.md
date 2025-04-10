# CampusSys

## Webpack OpenSSL Issue with Node.js 17+

When using Node.js 17 or newer, you may encounter an issue with Webpack due to changes in OpenSSL. To resolve this issue, we need to set the environment variable `NODE_OPTIONS=--openssl-legacy-provider`.

### Solution

1. **package.json**: The `build` and `start` scripts in `package.json` have been updated to include `NODE_OPTIONS=--openssl-legacy-provider` before `react-scripts build` and `react-scripts start`.

2. **.env file**: A `.env` file has been added to the repository with the following content to ensure compatibility during development:

   ```
   NODE_OPTIONS=--openssl-legacy-provider
   ```

By setting this environment variable, we ensure that the application works correctly with Node.js 17+.

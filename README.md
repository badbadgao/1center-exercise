# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run the website
 1) run `yarn` to install required libraries
 2) run `yarn start` to start the project
 3) visit `http://localhost:3000/onboard` to the home page

## Technical debts or things that can be improved
1) The project is using react context to share the logged in user's email across the app, can add session storage to support refreshing the page. In real word, when refreshing the page, I will need to check if the user's authentication session.
2) Could use redux store for managing the shared status like the user account information.
3) Could think about making more reusable form fields, but that needs more time to design the contract of the fields properly, otherwise it may be much worse than using the native form fields according to my experience. So I did not choose to do that in a limited time.
4) In this project, I just wrote limited unit tests to give an idea of what needs to be tested. Could write more unit tests to cover the routing, form validation, and mocking data for components.
5) The styling part may still have space to be cleaned up, could use sass or bootstrap to reuse styles and make styling easier.
6) Could make a usable component to make redirection easier instead of dealing with redirecting in an individual page when authentication fails.
7) Since I am using the latest react-route-dom v6 which is quite different from the old version which I used in my previous project, the routing part can be improved. 

## Available Scripts

In the project directory, you can run:

### `yarn`
Install the required libraries
 
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000/onboard](http://localhost:3000/onboard) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

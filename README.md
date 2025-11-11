Dynamic Recipe Finder

A simple, single-page web application built with React to search for and display recipes from a public API.

🚀 Live Demo

See the project in action: https://dynamic-recipe-finder.vercel.app/

Project Description

This project is a lightweight, responsive web app that
allows users to search for recipes. It was built to practice core React
concepts, including state management with hooks and fetching data from a
live API.

This project was built to demonstrate the following skills:

Developed a simple web app in React.js

Lets users search for recipes

Fetched recipe data from a public REST API

Used the useState hook to store and display search results

Styled the app with CSS to ensure it was responsive

Core Features Explained

How Search Works

The user types into an HTML <input> field. When they click
"Search", an onSubmit event is triggered. This calls the fetchRecipes
function.

Fetching from an API

The fetchRecipes function uses the browser's built-in
fetch command to send a request to TheMealDB public REST API. It
dynamically inserts the user's search term into the API's URL.

State Management with useState

This is the core of the app. We use the useState hook to manage all the app's data:

searchTerm: Stores what the user is typing in the search box.

recipes: An array that holds the list of recipes returned from the API.

loading: A boolean to show a "Loading..." message.

error: A string to show an error message if the API fails or no recipes are found.

When the data is successfully fetched, setRecipes() is
called, which updates the state and causes React to automatically
re-render the page to display the new recipe cards.

Responsive Styling

All styling is in the style.css file. A responsive
grid-template-columns is used for the recipe list, which automatically
changes from 3 columns on a desktop to 1 column on a mobile phone.

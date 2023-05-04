# Description

This is a React project that consumes Marvel API to list characters, comics and creators. It also haves a navbar to search for your favorite hero or comic! The list is exibited in a infinite scroll format that permits a free exploring time to the user.
It also features a modal with more information if you want to know more of what you're looking for.

## Available Scripts

In the project directory, you can run:

### `npm start`

To directly install every dependence from this project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### How to use MarvelistApi

At first, you need to get your API keys in Marvel Site (https://developer.marvel.com/), then submit it, after that you can select characters, comics or creators to load some of those itens, and after that, you can scroll down as you wish and filter in the search bar as you please.

## Dark Mode

You can switch the button in the top right of the page, it's inspired in thanos (purple darkmode) and iron man (red lightmode), it was made changing css in body element with useState and a simple verification.

## Filter

The search bar works with name that starts with, that is given for API users from Marvel. Anything you search will return what you want. The search bar is individual for each entity (Characters, comics and characters) and it was made with useState, useEffect in a handleSearch function that gets the info from the API and set the state for the filtered entity.

## Infinite Scroll

The infinite scroll feature uses a verification of the document height and renders again the next items of the API return.

## Modal with Detailed Info

It's a mix of CSS and React, but for it's core gimmick, it's the portal from React-DOM that really shines, making it possible to make a 'second' body element to store the modal opening in front of the user.

## Router

The website use the router of react aswell, it has use for dividing the endpoints and making the site more dynamic for the user, and making it easier to code.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## I wish you like this :)

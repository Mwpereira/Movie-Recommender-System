# 📌 Group Members

- Michael Pereira (500896409)
- Hitarth Chudgar (500888845)
- Dhanayush Raninga (500967245)

# 🍿🎞️ Movie Recommender System

This project requires [node.js](https://nodejs.org/en/download/).

## Build Setup

```bash
# install dependencies
$ yarn install 

# serve with hot reload at localhost:8080
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

Alternatively, can use *npm* instead of yarn.

## 📚 Frameworks

-   _Nuxt.js_ - for building user interfaces and connecting Javascript/Typescript code
-   _Bulma_ - for UI components and styling

## 🔐 Back-End

### Dependencies

-   _express_ - for running a server locally to access local files

## 🎨 Front-End

### Dependencies

- _Buefy_ - for using UI components for Vue.js based on Bulma
- _axios_ - for the promise based HTTP client to handle requests

## 📷 Gallery
<img src="static/gallery/home.png" width="900">
<img src="static/gallery/movies.png" width="900">
<img src="static/gallery/rate-movies.png" width="900">
<img src="static/gallery/recommendations.png" width="900">
<img src="static/gallery/calculations.png" width="900">

View more images under the ```./static/gallery/``` directory.

## 📝 Program Details

### Recommendation algorithm - User Based Collaborative Filtering 

- We made use of the collaborative filtering method to recommend relevant movies to the user based on the similarity score and by using the formula to predict the rating that user would give for the movie. 
- User-Based Collaborative Filtering is a technique for predicting which products a user would enjoy based on the ratings provided to that item by other users with similar tastes to the target user.
- Pearson correlation was used to calculate similarity s<img width="586" alt="Screen Shot 2021-12-09 at 3 45 10 PM" src="https://user-images.githubusercontent.com/20516641/145472932-74a6b289-5f22-40ae-8866-faabcf00bd0a.png">
cores as follows:


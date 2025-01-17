# Mojahed Elbakre - Home assignment (User managements)

## Requirements

1.  We need to create CRUD endpoints
2.  The entries (users) can just be saved in a noSQL database (Bonus for using Firebase Realtime Database)
3.  Each user should have the following data entries:
    id, name, zip code, latitude, longitude, timezone
4.  When creating a user, allow input for name and zip code.  
     (Fetch the latitude, longitude, and timezone - Documentation: https://openweathermap.org/current)
5.  When updating a user, Re-fetch the latitude, longitude, and timezone (if zip code changes)
6.  Connect to a ReactJS front-end

- feel free to add add something creative you'd like

API Key: 7afa46f2e91768e7eeeb9001ce40de19

## Overview

Demo application support above requirements. In addition to that, it also support sort and search users by name or location, in addition to support pagination

## Used stacks

Analyze libraries used to build an app with listing pros and cons, and impact on the performance. At the end, you may suggest any libraries to increase the performance

### Backend

Nodejs and express behind NestJS framework. Axios to fetch data from 3rd parties dependencies and firebase realtime database with firebase-admin library.

### Frontend

ReactJS, used vite fast builder. Cloudscape UI framework for building interfaces. react-router-dom to support multiple paths. Manging forms, used formik and yup for validation. Fetching data from the server used @tanstack/react-query in according with axios and native fetch. And finally, leaflet and react-leaflet to render maps (mapbox under the hood).

## Available Scripts

In the project directory, you can run:

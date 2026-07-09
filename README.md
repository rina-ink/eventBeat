Here I am - developing my own sense of explaining things throughout my learning curve. I'm going to start simply, with the ***key takeaways*** and gradually explore the idea of transfer (learning & sharing). 

Throughout my journey, I appreciate and seek out creative ways of explaining ideas, while continually refreshing my perspective with new research and insights.

# eventBeat

*A full-stack event discovery platform for exploring and managing events across Europe (for now).*

The React frontend communicates with a REST API built with Express and TypeScript. The backend uses Mongoose to interact with MongoDB Atlas. Event data is returned as JSON and rendered as interactive map markers and event cards in the frontend.

#### Frontend
- React
- Vite
- Leaflet
- CSS

#### Backend
- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose

Features: *Browse events on an interactive Leaflet map, View event details, Create new events, Edit existing events, Delete events, User authentication (when completed), Dark/Light theme, Responsive layout.*

![Dark theme](./src/assets/dark-theme.png)

*figure 1. dark-theme*

## Start React app - Frontend: 

`npm create vite@latest events` <sub>->*downloads & runs the latest Vite version*</sub>

`"type": "module",` <sub>->*add it in*</sub> `package.json`

`node -v` <sub>->*to check e.g. node version*</sub>

###### choose

`React`

`JavaScript`

###### run
`cd events`

`npm install` <sub>->*downloads all the dependencies*</sub>

`npm run dev` <sub>->*to begin development*</sub>

`npm install tailwindcss @tailwindcss/vite`


##### project's structure

```text
eventBeat/
├── src/                 -> React + Vite frontend
│   ├── components/
│   ├── pages/
│   ├── config/
│   └── assets/
│
├── backend/
│   ├── src/             -> Express + TypeScript backend
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── dbinit.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── package.json         
└── README.md
```


## Backend setup

`cd backend`

`npm init -y` <sub>->*to start a Node.js project from scratch, bye-bye to Vite in backend*</sub>

`npm install express cors mongoose` <sub>->*my application needs Express to build the server, CORS to allow browser requests from another origin, and Mongoose to communicate with MongoDB*</sub>

<sub>*express → handles routes and HTTP requests*</sub>

<sub>*CORS → allows Vite frontend to talk to the backend*</sub>

<sub>*mongoose → connects application to MongoDB database*</sub>

`npm install -D typescript @types/node @types/express @types/cors` <sub>->*typescript installs tsc - compiles ts into js | the rest types definitions*</sub>

###### to deploy

`build command: npm install && npm run build`

`start command: npm start`

###### in backend/package.json

###### change/add

`"start": "node dist/server.js"`

<sub>*tsc compiles to dist*</sub>

<sub>*start runs compiled JS*</sub>


![Light theme](./src/assets/light-theme.png)


*figure 2. light-theme*

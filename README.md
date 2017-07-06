# Auginc

## Quick start

Make sure you have Node.js and Yarn installed

1. Clone the repo and install all deps

```sh
$ git clone git@github.com:oPauloChaves/auginc-frontend.git
$ cd auginc-frontend
$ yarn install
```

2. Start the development server

```sh
$ yarn start
```

> It opens automatically the brower for you at [localhost:3000](http://localhost:3000)

## Production build

1. Generate it

```sh
$ yarn run build
```

2. Test the build locally

```sh
yarn global add serve
serve -s build


   ┌────────────────────────────────────────────────┐
   │                                                │
   │   Serving!                                     │
   │                                                │
   │   - Local:            http://localhost:5000    │
   │   - On Your Network:  http://10.0.0.102:5000   │
   │                                                │
   │   Copied local address to clipboard!           │
   │                                                │
   └────────────────────────────────────────────────┘

```

## Deploy to Github pages

1. Configure the project homepage in [package.json](package.json)
2. Run this command

```sh
$ yarn run deploy
```

## Login

user           | password | role
---------------|----------|--------
admin@user.com | admin    | ADMIN
bob@user.com   | user     | MANAGER

## Credits to

- [admin-on-rest](https://marmelab.com/admin-on-rest/index.html)
- [admin-on-rest-demo](https://github.com/marmelab/admin-on-rest-demo)
- [Material-UI](http://www.material-ui.com)
- [React](https://facebook.github.io/react/)
- [React Router](https://reacttraining.com/react-router/)
- [Redux](redux.js.org/index.html)

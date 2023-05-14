# Auction Web

This is an auction system web implementation using `React` where user can register and login. Then create items and publish items for bidding. Bid on published items. Here users can also see all `Draft`, `Ongoing`, and `Completed` items.

This is the ui implementation of [**auction-service**](https://github.com/faizul-mustafiz/auction-service.git)

This application leverages technologies like `Typescript` `React`, `JWT`, `Redux`

## Table of contents

- Quick Start
- Project Structure
- Deployments

## Quick Start

To get started with the project quickly do these steps

Clone the repo:

```
git colone https://github.com/faizul-mustafiz/auction-web.git
```

Install the dependencies:

```
npm install
# OR
npm ci
```

Set the environment variables:
To run the project set up the environment variables inside `./environments` directory.
**Note**: you need to add `REACT_APP` prefix before every environment variables to be able to read data using `process.env`

Run the project locally:

```
npm run dev
```

Or you can try the other commands listed in the `script` section of package.json

## Project Structure

```
|--environments           # environment variables
|--public                 # public folder for main index.html entrypoint
|--src\
    |--App\               # Main app component for loading all routes
    |--assets\            # all static assets
    |--components\        # all page components and dumb components
    |--configs\           # different types of configurations
    |--containers\        # all containers for components
    |--enums\             # different type of enums
    |--services\          # different type of service calls
    |--store\             # redux store related functions
    |--utility\           # utility methods for services and components
    |--index.css
    |--index.tsx
    |--react-app-env.d.ts
    |--reportWebVitals
    |--setupTests.ts
|--.gitignore
|--.prettierignore
|--.prettierrc
|--package-lock.json
|--package.json
|--README.md
|--tsconfig.json
```

## Deployments

For production it is suggested to build react application using build command for production environments. then ship the build files via any server `apache` `nginx`
you can also deploy application using docker, docker-compose and kubernetes.

### available build command

```
npm run build

# for dev environments
npm run build-dev

# for stage environments
npm run build-stage

# for prod environments
npm run build-prod
```

All the build commands are listed in `package.json`

**NOTE**: This web application has dependency on `auction-service` so you need to deploy/run auction service first then deploy/run `auction-web`

# Raspberry

An open-source application for personal use.

## Open for modification

This project can be downloaded and modified by anyone interested.

### Requirements

- Download and install [Node.js](https://nodejs.org/). Node 16.17 LTS or higher recommended
- Install Angular CLI globally `npm install -g @angular/cli`. Angular 14 is recommended.

### Setup

- Clone this repo, go to its root directory and run `npm install` to install its dependencies.
- Create an `environment.ts` file in the project's `root/src/environment` directory. An example can be found in `environment_example.ts`.

### Development

Run `npm run start` for a dev server. Navigate to `http://localhost:1337/`.

### Deploy

Run `npm run deploy` for a full build of the project.
This executes a custom bash script providing multiple options, but is mainly focussed on automating the SSH actions I had to manually do after every build

## Unit testing

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Visit `root/coverage/raspberry/index.html` for a detailed coverage report via [istanbul](https://istanbul.js.org/).<br>
Note that the coverage folder is only created after running a test for the first time, and is hidden by default.

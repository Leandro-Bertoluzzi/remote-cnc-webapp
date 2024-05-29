<h1 align="center">Remote CNC webapp</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/Leandro-Bertoluzzi/remote-cnc-webapp?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/Leandro-Bertoluzzi/remote-cnc-webapp?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Leandro-Bertoluzzi/remote-cnc-webapp?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/Leandro-Bertoluzzi/remote-cnc-webapp?color=56BEB8">
</p>

<!-- Status -->

<h4 align="center">
	🚧 Remote CNC webapp 🚀 Under construction...  🚧
</h4>

<hr>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0;
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-getting-started">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/Leandro-Bertoluzzi" target="_blank">Authors</a>
</p>

<br>

## :dart: About

Dashboard to interface the [remote-cnc-api](https://github.com/Leandro-Bertoluzzi/remote-cnc-api), to control an Arduino-based CNC machine.

## :sparkles: Features

:heavy_check_mark: Files, users and inventory management\
:heavy_check_mark: Real time monitoring of CNC status\
:heavy_check_mark: Manual control and calibration of CNC status\
:heavy_check_mark: Tasks management and scheduling

## :rocket: Technologies

The following tools were used in this project:

-   [Next.js](https://nextjs.org/)
-   [Typescript](https://www.typescriptlang.org/)
-   [Flowbite](https://flowbite.com/)
-   [Docker](https://www.docker.com/)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Node](https://nodejs.org/en/) installed.

Alternatively, if you have [Docker](https://www.docker.com/) installed, you can build and run the application, both in development and production mode, without installing the project locally.

## :checkered_flag: Getting Started

The first time you use the app, you must run:

```bash
$ npm install
# or
$ yarn install
```

Then, every time you want to run the development server:

```bash
$ npm run dev
# or
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### With Docker

```bash
$ docker compose --profile=ui up
```

### Initiate mocked camera stream

You can start a mocked version of the camera web server, which streams the test file `/camera/video/mock.mp4` in a loop.

```bash
$ cp camera/.env.dist camera/.env
$ docker compose --profile=camera up
```

if you want both ui and camera:

```bash
$ docker compose --profile=all up
```

You can validate the camera web server works properly by visiting `http://localhost:8081` in your web browser.

## :wrench: Running tests

### Unit tests

```bash
$ npm run test:unit
```

The coverage report is available in the folder `/coverage/lcov-report`.

### E2E (end-to-end) tests

```bash
$ npm run test:e2e
```

The report is available in the folder `/playwright-report`, or by running the command `npm run test:e2e:report`.

**NOTE:** Before running the E2E tests, be sure to update the `build` output (`npm run build`).

### Code style linter

In this project we use `prettier` for the `formatting rules`, and `ESLint` for `code quality rules`.

```bash
# Formatting
$ npm run format:fix
# Code quality
$ npm run lint:check
```

### With Docker

Most commands can be run in the following way: `docker exec -it remote-cnc-app {{command}}`:

```bash
# Formatter
$ docker exec -it remote-cnc-app npm run format:fix
# Linter
$ docker exec -it remote-cnc-app npm run lint:check
# Unit tests
$ docker exec -it remote-cnc-app npm run test:unit
# Build output
$ docker exec -it remote-cnc-app npm run build
```

The great exception are E2E (end-to-end) tests, which can't be run from inside a container yet.

## :checkered_flag: Deployment

You can export the app as a static site, and serve it from a static server:

```bash
$ npm run build
# or
$ yarn build
```

## :memo: License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

## :writing_hand: Authors

Made with :heart: by <a href="https://github.com/Leandro-Bertoluzzi" target="_blank">Leandro Bertoluzzi</a> and Martín Sellart.

<a href="#top">Back to top</a>

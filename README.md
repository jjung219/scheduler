# Interview Scheduler

## Setup

Install dependencies with `npm install`.
Must run both the Webpack development server and [scheduler-api](https://github.com/jjung219/scheduler-api) for the app to run.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## App Description
One page Interview Scheduler app.

### Important Note
- When saving and deleting a page, a status page shows that the app is saving/deleting a page. The app purposely takes a few seconds to save/delete appointments to show the loading pages that are displayed to the user if the api request takes longer to be completed.

Landing Page
!["Landing page"](screenshots/app.png)

Adding an appointment
!["Adding an appointment"](screenshots/appointment-form.png)

Editing an appointment
![Editing an appointment](screenshots/appointment-edit.png)

Deleting an appointment
![Deleting an appointment](screenshots/appointment-delete.png)

Booked appointments
![Booked appointments](screenshots/appointments-booked.png)
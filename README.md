# KartoaLawWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Generate Model and Component

ng g m [ModuleName] --routing
ng g c [FolderName]/components/[ComponentName] --module [ModuleName]

ng g m lawyer --routing
ng g c lawyer/components/signin --module lawyer

ng g m client --routing
ng g c client/components/signin --module client

## Generate Service

ng g s services/[name] --skip-tests

## Generate Model

ng g class Models/[name] --type=model --skip-tests

## Generate Interfaces

ng g interface interfaces/[name] 


## Changes tsconfig and angular.json
 "noPropertyAccessFromIndexSignature": false, //true
  "strictPropertyInitialization": false,

## Run Build in Production mode for testing PWA and PUSH 
npm install -g angular-http-server
angular-http-server --open
https://www.npmjs.com/package/angular-http-server



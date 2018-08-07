# Initial Setup

1. Install Node 8.11.3 for linux 64 bit binary
2. Install Mongo linux lagecy
3. Set environement variable in .bash_profile
 >  export NODE_ENV=$HOME/Softwares/node-v8.11.3-linux-x64/bin
 >  export NPM_HOME=$HOME/Softwares/node-v8.11.3-linux-x64/lib/node_modules/npm/bin
 >  PATH=$NODE_ENV:$NPM_HOME:$PATH

 reload bash profile
 > source .bash_profile

 4. Install Mongo db and create the data/db folder at the root location and provide the 777 permission.

 5. Go to Mongo software location inside bin and run the below command
 >   ./mongod

6. Proxy seeting for network
      npm config set http-proxy 'url'

6. Set the registery
      npm config set registry http://registry.npmjs.org/
      
# AngularCRUD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

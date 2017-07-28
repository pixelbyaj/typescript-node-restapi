# Start with MENT
##                                                Mongo Express Node TypeScript

Rest API using Node and TypeScript

# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/joshiabk/node-restapi.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm start
```
Navigate to `http://localhost:3000`

# MENT 
The main purpose of this repository is to show a good REST API project setup and workflow for writing Node code in TypeScript with bit flavor of Object Oriented Programming.
I will try to keep this as up-to-date as possible, but community contributions and recommendations for improvements are encouraged and will be most welcome. 

In the next few sections I will call out everything that changes when adding TypeScript to an Express project.
Note that all of this has already been setup for this project, but feel free to use this as a reference for converting other Node.js project to TypeScript.

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/). 
Throughout the README I'll try to call out specific places where VS code really shines or where this project has been setup to take advantage of specific features.

## Getting TypeScript
TypeScript itself is simple to add to any project with `npm`.
```
npm install -D typescript
```
If you're using VS Code then you're good to go!
VS Code will detect and use the TypeScript version you have installed in your `node_modules` folder. 
For other editors, make sure you have the corresponding [TypeScript plugin](http://www.typescriptlang.org/index.html#download-links). 

## Project Structure
The most obvious difference in a MENT project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` folders remain top level as expected. 

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | Express,Mongo,Passport,Route config class declared and it also has passport strategies and authentication strategies and login middleware. Add other complex config code here                                                        | 
| **src/login**            | Login Module which will have Login Model & Controller.Models define Mongoose schemas that will be used in storing and retrieving for Mongo and data from MongoDB                                                                     |             
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section] (#type-definition-dts-files) |
| **src/server.ts**          | Entry point to your Server Class app which will help to Execute Express as well as other config classes. |
| **.env.example**         | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| **package.json**             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)  |

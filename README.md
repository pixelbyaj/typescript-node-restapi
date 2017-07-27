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

# TypeScript + Node 
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



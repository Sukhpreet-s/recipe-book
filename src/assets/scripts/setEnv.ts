/* tslint:disable */
// @ts-nocheck

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {

    writeFile(targetPath, environmentFileContent, function (err) {
        if (err) {
            console.log(err);
        }

        if (environmentFileContent !== '') {
            console.log(`wrote variables to ${targetPath}`);
        }
    });
}

const envDirectory = './src/environments';

if (!existsSync(envDirectory)) {
    mkdirSync(envDirectory);
}

writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

// choose the correct targetPath based on the environment chosen
const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  // This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
  export const environment = {
    production: ${isProduction},
    
    // Firebase credentials
    FIREBASE_API_KEY: '${process.env.FIREBASE_API_KEY}',
    FIREBASE_AUTH_DOMAIN: '${process.env.FIREBASE_AUTH_DOMAIN}',
    FIREBASE_PROJECT_ID: '${process.env.FIREBASE_PROJECT_ID}',
    FIREBASE_STORAGE_BUCKET: '${process.env.FIREBASE_STORAGE_BUCKET}',
    FIREBASE_MESSAGE_SENDER: '${process.env.FIREBASE_MESSAGE_SENDER}',
    FIREBASE_APP_ID: '${process.env.FIREBASE_APP_ID}',
    FIREBASE_MEASUREMENT_ID:'${process.env.FIREBASE_MEASUREMENT_ID}',

    // Server api
    apiUrl: '${process.env.SERVER_API_URL}',
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file


/* tslint:enable */
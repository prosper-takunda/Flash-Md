const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || '+.",.FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUozS3lqb1VXejhRTGp2Mk91Q1FjUTFveHFsc0N1N0tJVzJnTnRRRTRYbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGNYQmxIaWcyQ3ljbkxhUmFqdmRLcGtIRXREUnkrVUVVZlFuc2lTSFMxQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSTgwRkpEY2hRQVlTRFVkU2EwVXFTbDdLZ3lXSUxjdFV0NlRmLzhIbmwwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxSXBmSEhZT2Q3c2M1N0t3N3BQY2t2ZEdxcEM3bGlzSVlTYUhQQ0p6Q1dRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFQbUx1SUM2SThqTWZzQXFPQ05mYW9WVnhNZFR4R29kN3J4cWdRZndFMzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVWMjVxOHVXQUsxRW1ldWlHZHFMOEFPbStGcStLWEZnK0FiSlI3RXdXU2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0RYSmtjcnZJNFRrTXBLOUFhOTQ5MnhKU213bWRLMTBjdThzdUJSbUtFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU1rdlNvM0NLN1Y4MVNSYlJHM1RQQUVSdTlQeEowTHFQUmVmSURZYldrQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpjOVBiUjVYQmhueXJVckdJYkM4L3phZ3c5Vmx1TlNMRmdIYzBDc1RUQjlnVWdZYmRxSWdhanRsUC96Y2hJM1UwS2xUb0tOeWF5cUFMTGVTZktRMmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJiS29YRWRIbzcyUFJZbGtYdDNOMklucStsQ3ZseTBEUFpKaUZ4TmJoVFNFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNVFJjWVVhNFJBbXpmMGd4d1ZnMktRIiwicGhvbmVJZCI6IjllNzE1YTU3LTI0Y2EtNGJmOC1hMzM2LWNjMmRkNjM3ODExZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZbE9NMGQ5aDVQZnZOdHM4NGh0V2UwVXp1dXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTldYK3dzcTdZMFVYdEpJcEFqRENPY0hNNUVJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNBR1lDWlFZIiwibWUiOnsiaWQiOiIyNjM3MTMyNzExNzk6MjZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BIUDhOUUJFTFBCenJJR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InNpZmRpMG81L3VDdk5taVhpcDhXemhRYnlwVXBVWE0vNDA5TFoxbVo5ejQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRnWTU4NElaU2VDSUpNYjNGeUZYblhkMndPQUFaSjdFSXo3cit1OW5vRmlqcW96TjBRTkJYaVZIbE0wYmdjUE1icTBrK2pFWEwwYXA2eVpYODFvVUNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpUW11SjN4TG1LSHAxRzlkSTBmdVpvN1Z0c1JaWTYyUzJTaStaRHFJd3JGdUlqQnE0ZDZFVnVOWExsQWU4c05WcFY4L2s4WnRlT25TYWNJOHpTUk9ndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxMzI3MTE3OToyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiSW4zWXRLT2Y3Z3J6Wm9sNHFmRnM0VUc4cVZLVkZ6UCtOUFMyZFptZmMrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE2NzU2NjcyfQ==
    OWNER_NAME: process.env.OWNER_NAME || "Prosper",
    PREFIXE: process.env.PREFIX || ".",@
    NUMERO_OWNER : process.env.OWNER_NUMBER || "263713271179", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Prosper_md',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

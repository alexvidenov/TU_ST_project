# TU_ST_project Discord Bot

### Requirements

- Node >= 18
- Download service account json file from your Firebase project
- Rename the file to `firebase-adminsdk.json` and place it inside the `bot` directory
- Copy `.env.template` and name the copy `.env` and fill out the varaibles inside

### Installation

```$ npm install```

### Running in dev mode

```$ npm run dev```

### Building

```$ npm run build```

### Running in prod mode

```$ npm run start```

### Commands

```/auth <username> <password>``` - connects Moodle user to the caller's Discord account. ```username``` is the faculty number of the user (it is used as a username in Moodle) and the ```password``` is the respective password for that Moodle account

```/sync``` - renames and places roles to all connected Discord users to their respective Moodle accounts

```/redeploy``` - redeploys commands to the server the where the command was executed from. Useful when updating/changing existing commands logic or when you've created new commands

```/ping``` - test the connection between the bot and Firestore
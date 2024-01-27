# TU_ST_project Discord Bot

### Requirements

- Node >= 18
- Download service account json file from your Firebase project
- Rename the file to `firebase-adminsdk.json` and place it inside the `bot` directory
- Copy `.env.template` and name the copy `.env` and fill out the varaibles inside

### To create a bot

- Go to https://discord.com/developers/applications
- Create 'New Application'
- From the OAuth2 menu, go to the General submenu and get "CLIENT ID" and "CLIENT SECRET"
- Make the `DISCORD_CLIENT_ID` variable in the `.env` file to be equal to the "CLIENT ID" and the `DISCORD_TOKEN` variable to be equal to the "CLIENT SECRET"
- In order to add the bot to the server, from the OAuth2 menu, go to the URL Generator submenu. From the Scopes, select `bot` and `application.commands`. From Bot Permissions select `Administrator`. Then copy the generated URL from the bottom, visit it in your browser and add the bot to your server

### Installation

```$ npm install```

### Running in dev mode (will be enough for testing and demonstration)

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
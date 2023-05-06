#Readme document for **Spotify Browser in Angular**#

**Repository Structure**

The repository contains somewhere around 80 files. You will not need to edit most of them in this assignment. The repository contains two folders: **webserver** and **client.webserver** includes the Express/Node.js backend for communicating with the Spotify API. client includes the Angular frontend for browsing music.

In the backend (**webserver** folder), you will not need to edit any of the JavaScript files; they are provided for you. However, you do need to create two files:

    1. client_secret.json

    2. tokens.json

Both files contain secret information, so they should not be committed to the repository and are therefore listed in the .gitignore file. (Which is also why we cannot provide them to you)

In the frontend (**client folder**), the files which need editing are all under the app folder. Within that folder, the files/subfolders you should edit are:

* The six components in the components folder: **about, carousel, carousel-card, search, track-list, and thermometer**. Each component folder contains four files **( *.component.css, *.component.html, *.component.ts , *.component.spec.ts)**. Of these files, all edits will be made in the **.component.html** and **.component.ts** files.

* Three of the four components in the pages folder: **album-page, artist-page, and track-page. home-page** will not be edited. Again, all edits will be made in the       **.component.html and .component.ts files.**
   
* The one service in the services folder: spotify-service. All edits will be made in the **.service.ts** file, none in the **.service.spec.ts** file.

* One of the six classes in the data folder: **track-features.ts.** The four other classes do not need to be edited.
    

You will also edit the readme.txt file in the root folder.

This assignment can be completed without writing any additional files or functions. But you may find it helpful to add a file or function, such as to complete one of the bonus features.

**Setting up your Workspace**

If you’re feeling unfamiliar with the command line, you might find the guides in the resources page helpful.

Some of the packages/libraries depend on newer versions of Node JS. Check what version of Node JS you have installed with:

    node --version
    
If you installed Node JS before this class, make sure you’ve updated to at least 10, such as with nvm or downloading the latest version from the node website. If you installed Node during A2, you should not need to update, but it’s probably worth checking the version number anyways.

There are no global dependencies required to run the Express webserver.

For the client, you will need to install Angular through npm. To do this, you will install the Angular Command Line Interface (CLI) globally with:

    npm install -g @angular/cli 
    
The Angular project is already set up in the client folder, but the CLI is necessary to run the project.

You will also need to install the dependencies for both the webserver and the client. These dependencies are defined in each project’s respective package.json files. cd into each respective project’s folder and install the dependencies with:

    npm install
    
You may encounter a few installation warnings or high severity security vulnerabilities. We will ignore them for this assignment, but these should typically be addressed when using libraries.

When installing, if you run into issues which look like “permission denied, try changing the permissions of the node_modules directory. If you are still having trouble, ask on Zulip or talk to the course staff. It’s important to try to get the setup working sooner rather than later, even if you do not plan on working on the assignment until close to the deadline.

You may get a warning that the version of Angular that you have installed is newer than the version of the project. You can safely ignore that in this assignment.

It’s likely that your project code will have out of date dependencies, so before you move to the next section, cd into both the client and webserver directories and run the following command:

    npm update
    
**Running the Webserver**

A Spotify Developer account is required to set up the Express webserver. Create a Spotify account or log in at https://developer.spotify.com/dashboard/ and follow the instructions to create a client id. Name the app whatever you’d like. For the App description, enter:

This App is used to create a music browser as part of a course assignment for IN4MATX 133, User Interface Software, at the University of California, Irvine.

Indicate that you are building a Website and are not developing a commercial application.

Once you have created your application, be sure to set the redirect URI to:

    http://localhost:8888/callback
    
This will tell Spotify to redirect back to our Express webserver once authentication and authorization is complete. You should also create a file in the webserver folder (not the routes folder), client_secret.json, with your consumer key and secret. It should be of the form:

    {
     "client_id": "Your Client Key",
     "client_secret": "Your Client Secret"
    }

At this time, also create a placeholder file in the same folder for tokens.json. This file will be overwritten once an access and refresh token have been retrieved. Your tokens.json file should be exactly:

    {
     "access_token": null,
     "refresh_token": null
    }
    
To run the Express webserver, cd into the webserver folder and run: npm start

This will start the webserver at:

    localhost:8888
   
Be sure the dependencies have been installed first via:

    npm install
    
If you make a change to code in the webserver (which you should not need to do to complete the required portions of this assignment), you will have to end the running program and re-run it. End it by typing Ctrl-C into the command line and then re-running it with:

    npm start
    
**Running the client**

To run the Angular client, cd into the client folder and run:

    ng serve --open
    NOTE: '--open' is optional
    
This will start the client at **localhost:4200.** Adding the **--open** flag will open it up in the browser. Be sure the dependencies have been installed first via **npm install.**

Any code changes will be automatically reloaded on the client.

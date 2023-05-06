--Readme document for **Hand gesture Dating app** 

**Repository Structure**

The repository contains a fairly standard Angular web framework project. It contains a home page and one custom component that enables gestural control through a hand tracking library called Handtrack.js. Handtrack.js is a library built on top of the machine learning platform TensorFlow. We have abstracted most of the complexity with Handtrack.js into a component that emits hand gesture events detected from a webcam.

To get started with the starter repository, you will first need to run:

  **npm install**

from the command line. You may want to add variables and functions to these files, or create new subclasses. They are:

One class in the app folder: PredictionEvent. This class contains the data that is emitted when a hand pose is detected. It currently only supports a single string description of a gesture. You may decide that you want to emit additional information, like coordinates of the gesture, if so then you will want to add them to this class.

One component in the app folder: handtracker. This component is responsible for importing the Handtrack.js library, configuring a basic model, running the hand detection logic, and managing the camera.

One component in the app folder: home-page. This component is demonstrates how to integrate the handtracker component into a basic Angular page, and capture gesture events.

If you plan on building upon the start repository, you will likely want to create additional components, pages, or services to build your app using ng generate. You should be familiar with these commands by now, so we will not cover them in anymore detail here.

**Setting up your Workspace**
The workspace for the starter repository will be identical to the workspace you set up for A3. Once you have installed the required modules, run:

  **ng serve --open**

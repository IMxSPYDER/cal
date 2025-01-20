#  Google Calendar Event Viewer

This web application allows users to log in securely with their Google account via Single Sign-On (SSO), view their Google Calendar events, and filter them by date.

---------
## Tech Stack

<b>Frontend:</b>  React.js <br>
<b>Backend:</b> Node.js with Express.js (optional for additional API logic) <br>
<b>Authentication:</b> Google OAuth 2.0 (SSO login) <br>
<b>API Integration:</b> Google Calendar API <br>
<b>UI/UX Design:</b> Tailwind CSS <br>
<b>Deployment:</b> Google Cloud <br>

-----
## Features
### SSO Login with Google:

Users can securely log in using their Google account with OAuth 2.0.
Once logged in, users are granted access to their Google Calendar data.

## Display Google Calendar Events:

After logging in, the application fetches the user's Google Calendar events.
Events are displayed in a table format with the most recent events at the top.

## Filter Events by Date:

Users can filter events by date to easily view specific events within a chosen time range.
Setup Instructions

---------

1. Clone the repository:

     git clone [https://github.com/IMxSPYDER/cal.git](https://github.com/IMxSPYDER/cal.git)
   
     cd cal

3. Install Dependencies
   
Install frontend dependencies:

    npm install

3. Set Up Google OAuth 2.0
   
Create a Google Cloud project [here](https://cloud.google.com/free?utm_source=PMAX&utm_medium=display&utm_campaign=FY24-H2-apac-gcp-DR-campaign-IN&utm_content=in-en&gad_source=1&gclid=Cj0KCQiAhbi8BhDIARIsAJLOludkOz11dKNBksN6XAVcI-qvn2DcJVQVu-f77jekC7oLO-cYbOaLuS0aAr7hEALw_wcB&gclsrc=aw.ds&hl=en).
Enable the Google Calendar API in your project.
Create OAuth 2.0 credentials and configure the redirect URIs.
Save the credentials (client ID and client secret) for use in your application.

5. Add Environment Variables
Create

  a  The root of your project and add the following:
  
      REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
      REACT_APP_GOOGLE_CLIENT_SECRET=your-google-client-secret
      

5. Run the Application
Start the application:
  npm run dev

Open your browser and navigate to http://localhost:port to access the application.

-----

## API Integration
The application integrates with the Google Calendar API to fetch events. After the user logs in, the API returns the events, which are then displayed in a table format.

API Endpoints (Optional for Backend)
GET /api/events: Fetches all Google Calendar events for the authenticated user.
UI/UX Design
Tailwind CSS are used to give the application a modern and responsive design.
The calendar events are displayed in a table with sorting options to show the most recent events at the top.
A filter input is provided to allow users to specify a date range.

-----

## Deployment Instructions
Frontend: Deploy your frontend application to a cloud platform on Google Cloud.

Backend (Optional)

-----
## Demo
You can access a live demo at: [here](https://events-calendar-009.web.app/)

----
## Conclusion
This project demonstrates the ability to integrate third-party APIs, implement SSO authentication, create a user-friendly interface, and provide users with the functionality to filter and view their Google Calendar events.

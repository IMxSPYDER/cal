import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from './assets/google.png'
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;
  const [email, setEmail] = useState(null); // State to store email
  const [login, setLogin] = useState(false)

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
      fetchEvents(access_token);
      const userInfo = await fetchUserInfo(access_token); // Fetch user info after successful login
      setEmail(userInfo.email); // Set the email in state
      setLogin(true)
    },
    onError: () => console.log("Login Failed"),
    scope: "https://www.googleapis.com/auth/calendar.readonly",
  });

  const fetchUserInfo = async (accessToken) => {
    try {
      const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchEvents = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const sortedEvents = response.data.items.sort(
        (a, b) => new Date(b.start.dateTime || b.start.date) - new Date(a.start.dateTime || a.start.date)
      );
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching calendar events:", error);
    }
  };

  const handleFilter = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      const filtered = events.filter((event) =>
        event.start.dateTime
          ? event.start.dateTime.startsWith(selectedDate)
          : event.start.date.startsWith(selectedDate)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  const formatDate = (dateTime) => {
    if (!dateTime) return "";
    const dateObj = new Date(dateTime);
    return dateObj.toLocaleDateString();
  };

  const formatTime = (dateTime) => {
    if (!dateTime) return "";
    const dateObj = new Date(dateTime);
    return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get events for the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredEvents.length / eventsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    window.location.reload(); 
    setLogin(false)
  };

  return (
    <GoogleOAuthProvider clientId="1010339643164-sgkr6flk3fajqlcki2vffvdi7i7j8pjk.apps.googleusercontent.com">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <h1 className="text-2xl font-bold mb-4">Events from Google Calendar</h1>

        {!login ? (
          <button
            onClick={googleLogin}
            className="flex gap-2 items-center justify-center bg-gray-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 hover:font-bold"
          >
          <img src={GoogleLogo} className="h-5 w-5"/>
            Continue with Google
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">Welcome, {email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        {events.length === 0 || !login ? (
  <p className="text-lg text-gray-500 mt-4">No events scheduled yet.</p>
) : (
  <div className="flex w-full items-center justify-center overflow-x-auto">
    <div className="mt-6 overflow-x-auto p-3">
      <label className="block mb-2 text-gray-700">
        Filter by Date:
        <input
          type="date"
          value={filterDate}
          onChange={handleFilter}
          className="mt-1 w-full font-semibold p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 active:border-gray-200"
        />
      </label>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{event.summary || "No Title"}</td>
                <td className="px-4 py-2">
                  {formatDate(event.start.dateTime || event.start.date)}
                </td>
                <td className="px-4 py-2">
                  {formatTime(event.start.dateTime) || "No Time Added"}
                </td>
                <td className="px-4 py-2">
                  {event.location || "No Location Added"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(filteredEvents.length / eventsPerPage)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

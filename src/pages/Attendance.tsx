import "./style/Iplogs.css";
import { useEffect, useState } from "react";
import Request from "../functions/Request";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();

  interface LogEntry {
    _id: string;
    regno: string;
    time: string;
    convertedTime: string; // New property to store converted date as a string
  }

  const [response, setResponse] = useState<LogEntry[]>([]);

  const errorFunction = () => {
    navigate("/error");
  };

  const getattendance = async () => {
    const data = {};
    const url = process.env.REACT_APP_API_URL + "/attendance/show-attendance";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await Request(url, data, headers, errorFunction);
      const convertedResponse = res.data.map((log: LogEntry) => ({
        ...log,
        convertedTime: convertDate(log.time), // Convert time to desired format
      }));
      setResponse(convertedResponse);
    } catch (error) {
      console.error("Error fetching IP logs:", error);
      errorFunction();
    }
  };

  useEffect(() => {
    getattendance();
  }, []);

  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="iplogs-container">
      <h2>ATTENDANCE</h2>
      <div className="container">
        <h1>Welcome to Your Modern Dashboard</h1>
        <p>Get insights and manage your data with ease.</p>
        <a href="index.html">Go to Dashboard</a>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>IP Address</th>
              <th>Status</th>
              <th>Date</th>
              <th>Payload</th>
            </tr>
          </thead>
          <tbody>
            {response.map((log) => (
              <tr key={log._id}>
                <td>{log.regno}</td>
                <td>{log.convertedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

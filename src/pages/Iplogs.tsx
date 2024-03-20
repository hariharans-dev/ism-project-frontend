import "./style/Iplogs.css";
import { useEffect, useState } from "react";
import Request from "../functions/Request";
import { useNavigate } from "react-router-dom";

const Iplogs = () => {
  const navigate = useNavigate();

  interface LogEntry {
    _id: string;
    ip: string;
    status: string;
    payload: string | null;
    time: string;
    convertedTime: string; // New property to store converted date as a string
  }

  const [response, setResponse] = useState<LogEntry[]>([]);

  const errorFunction = () => {
    navigate("/error");
  };

  const getIpLogs = async () => {
    const data = {};
    const url = process.env.REACT_APP_API_URL + "/ip/show-iplogs?count=10";
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
    getIpLogs();
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
      <h2>IP Logs</h2>
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
                <td>{log.ip}</td>
                <td>{log.status}</td>
                <td>{log.convertedTime}</td>
                <td>{log.payload}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Iplogs;

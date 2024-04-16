import "./style/Attendance.css";
import { useEffect, useState } from "react";
import Request from "../functions/Request";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();

  interface LogEntry {
    _id: string;
    regno: string;
    date: string;
    convertedTime: string; // New property to store converted date as a string
  }

  const [regno, setregno] = useState("");
  const [response, setResponse] = useState<LogEntry[]>([]);

  const errorFunction = () => {
    navigate("/error");
  };

  const getattendance = async () => {
    const data = { regno: regno };
    const url = process.env.REACT_APP_API_URL + "/attendance/show-attendance";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await Request(url, data, headers, errorFunction);
      const convertedResponse = res.data.map((log: LogEntry) => ({
        ...log,
        convertedTime: convertDate(log.date), // Convert time to desired format
      }));
      console.log(convertedResponse.length);
      setResponse(convertedResponse);
    } catch (error) {
      console.error("Error fetching IP logs:", error);
      errorFunction();
    }
  };

  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "numeric",
      year: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="iplogs-container">
      <h2>ATTENDANCE</h2>

      <div className="attendance">
        <h1>Provide Register number</h1>
        <input
          type="text"
          className="regno"
          placeholder="eg. 21BIT0224"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setregno(value);
          }}
        />
        <div className="">
          <a
            className="button"
            onClick={() => {
              getattendance();
            }}
          >
            search
          </a>
        </div>
      </div>

      <div className="table-container">
        {response.length == 0 && <h5 className="response">No Attendance record found</h5>}
        {response.length != 0 && (
          <table>
            <thead>
              <tr>
                <th>REG NO</th>
                <th>DATE</th>
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
        )}
      </div>
    </div>
  );
};

export default Attendance;

import "./style/Registeredip.css";
import { useEffect, useState } from "react";
import Request from "../functions/Request";
import { useNavigate } from "react-router-dom";

const Registeredip = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<string[]>([]); // Specify that response is an array of strings
  const [ipaddr, setipaddr] = useState("");
  const [addipconsole, setaddipconsole] = useState("");

  const errorFunction = () => {
    navigate("/error");
  };

  const getregip = async () => {
    const data = {};
    const url = process.env.REACT_APP_API_URL + "/ip/show-registered-ip";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await Request(url, data, headers, errorFunction);

      // Assuming your response is an array of strings, set the state accordingly
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching registered IPs:", error);
      errorFunction();
    }
  };

  const addregip = async () => {
    const data = { ipaddr: ipaddr };
    console.log(data);
    const url = process.env.REACT_APP_API_URL + "/ip/add-registered-ip";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await Request(url, data, headers, errorFunction);
      console.log(res);
      // Assuming your response is an array of strings, set the state accordingly
      console.log(res);
      setaddipconsole(res.data.message);
    } catch (error) {
      console.error("Error fetching registered IPs:", error);
      setaddipconsole("error in adding registered ip");
      errorFunction();
    }
  };

  const deleteregip = async () => {
    const data = { ipaddr: ipaddr };
    const url = process.env.REACT_APP_API_URL + "/ip/delete-registered-ip";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const res = await Request(url, data, headers, errorFunction);
      setaddipconsole(res.data.message);
    } catch (error) {
      setaddipconsole("error in delete registered ip");
      errorFunction();
    }
  };
  const removeIpFromResponse = (ipToRemove: string) => {
    setResponse(response.filter((ip) => ip !== ipToRemove));
  };

  const addIpToResponse = (newIp: string) => {
    setResponse([...response, newIp]);
  };

  useEffect(() => {
    getregip();
  }, []);

  return (
    <div className="regip-container">
      <div className="add-regip-container">
        <h1>Provide IP address to add or delete</h1>
        <input
          type="text"
          className="regno"
          placeholder="eg. 192.168.1.54"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setipaddr(value);
          }}
        />
        <div>
          <a
            className="button"
            onClick={() => {
              addregip();
              addIpToResponse(ipaddr);
            }}
          >
            add
          </a>
          <a
            className="delete-button button"
            onClick={() => {
              deleteregip();
              removeIpFromResponse(ipaddr);
            }}
          >
            delete
          </a>
        </div>
        <div className="message">{addipconsole}</div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>REGISTERED IP</th>
            </tr>
          </thead>
          <tbody>
            {response.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registeredip;

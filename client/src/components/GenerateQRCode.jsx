/* eslint-disable react-hooks/exhaustive-deps */
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";
import axios from 'axios';


function GenerateQRCode() {

  // Todo: Faculty authentication
const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [subject, setSubject] = useState([]);

  const value = {
    "facultyId": user?._id || "Nahi hai",
    "date": new Date().toISOString(),
  }

  console.log(value);

  const [qrValue, setQrValue] = useState(JSON.stringify(value));

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = {
        ...value,
        "refreshedAt": new Date().toISOString(),
      };
      setQrValue(JSON.stringify(newValue));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect (() => {
    axios.post("https://attendance-management-nine.vercel.app/getSubject", {facultyId: user?._id}, {withCredentials: true})
    .then((res) => {
      console.log(res);
    })
    .catch ((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div style={{ background: 'white', padding: '16px' }}>
      {
        
      }
      {
        subject.length > 0 && 
        <QRCode 
          size={256}
          style={{ height: "500px", maxWidth: "100%", width: "100%" }}
          value={qrValue}
          viewBox={`0 0 256 256`}
        />
      }
    </div>
  );
}

export default GenerateQRCode;

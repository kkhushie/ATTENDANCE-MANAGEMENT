/* eslint-disable react-hooks/exhaustive-deps */
import QRCode from "react-qr-code";
import { useState, useEffect } from "react";


function GenerateQRCode() {

  // Todo: Faculty authentication
const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [qrValue, setQrValue] = useState(
    JSON.stringify({
      facultyId: user?._id || "N/A", // Use user._id properly
      date: new Date().toISOString(),
    })
  );

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

  return (
    <div style={{ background: 'white', padding: '16px' }}>
      <QRCode 
        size={256}
        style={{ height: "500px", maxWidth: "100%", width: "100%" }}
        value={qrValue}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}

export default GenerateQRCode;

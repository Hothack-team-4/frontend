import React from "react";
import codeGen from "../utils/qrCodeGenerator.js";
import "./artiststyle.css";
// import DashboardLandingPage from "../pages/dashboard.tsx"

// this page will be for the attendees on the venue when they scan the QR
const AttendanceLandingPage = () => {
  const code = codeGen();
  console.log(code);
  return <div>Hello this is artist landing page</div>;
};

export default AttendanceLandingPage;

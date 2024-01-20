import React from "react";
import codeGen from "../utils/qrCodeGenerator.js";
import './artiststyle.css'



// this page will be for the artist dashboard
const qrcodeGenerator = () => {
  const code = codeGen();
  return code;
};

const DashboardLandingPage = () => {

    return <div id= "document-body">
    <div>
        <h1>HELLO</h1>
    </div>
    <div id="current-event">
        <h2>CURRENT EVENT</h2>
        {/* JS insert: name/date of event or no event found*/}
        <div id="stats">
            <h2>NUMBER SCANNED</h2>
        </div>
        <div id= "QR-code">
            <div id= "placeholder-for-qrcode"></div>
            <button>DOWNLOAD</button>
        </div>
    </div>

    <button>Create New Event!</button>

    <script>
    {/* const currentEvent = document.querySelector("#current-event") */}
    </script>
        
    </div>
};


//export { DashboardLandingPage, qrcodeGenerator }
export default DashboardLandingPage

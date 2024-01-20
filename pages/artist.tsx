import React from 'react';
import './artiststyle.css'

// this page will be for the artist dashboard
const DashboardLandingPage = () => {

    return <html lang="en">
    <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Artist Dashboard</title>
    </head>
    <body>
    <div>
        <div id="image-placeholder"></div>
        <h1>HELLO</h1>
    </div>
    <section id="current-event">
        <h2>CURRENT EVENT</h2>
        <section id="stats">
            <h2>NUMBER SCANNED</h2>
            <p>-</p>
        </section>
        <div id= "QR-code">
            <div id= "placeholder-for-qrcode"></div>
            <button>DOWNLOAD</button>
        </div>
    </section>
    <button>Create New Event!</button>

    <script>

    </script>
        
    </body>
    </html>
};


export default DashboardLandingPage
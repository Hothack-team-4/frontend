// const fs = require('fs');
// const QRCode = require('qrcode');

// QRCode.toString('web dev is mi pasion !!!!', {
//   errorCorrectionLevel: 'H',
//   type: 'png',
//   width: 500
// }, function(err, data) {
//   if (err) throw err;

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <title>QR Code</title>
//     </head>
//     <body>
//       <div id="qrcode">${data}</div>
//     </body>
//     </html>
//   `;

//   fs.writeFileSync('index.html', htmlContent);

//   console.log('QR code saved as index.html');
// });

import QRCode from "qrcode";

function codeGen(input) {
  QRCode.toDataURL(
    input,
    {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 500,
    },
    function (err, data) {
      if (err) throw err;
      console.log(data);
    }
  );

  QRCode.toString(
    input,
    { type: "svg", errorCorrectionLevel: "H", width: 250 },
    function (err, svgString) {
      if (err) throw err;
      const qrCodeElement = document.getElementById("QR-code");
      if (!qrCodeElement) {
        console.error('Element with ID "QR-code" not found');
        return;
      }

      const svgElement = new DOMParser().parseFromString(
        svgString,
        "image/svg+xml"
      ).documentElement;
      qrCodeElement.innerHTML = "";
      qrCodeElement.appendChild(svgElement);
    }
  );
}

export default codeGen;

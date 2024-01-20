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

const QRCode = require("qrcode");

function codeGen() {
  QRCode.toDataURL(
    "web dev is mi pasion !!!!",
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
}

export default codeGen;

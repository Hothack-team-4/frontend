
import QRCode from "qrcode";

function codeGen(input, imgPlaceholder) {
   QRCode.toString(
    input,
    { type: "svg", errorCorrectionLevel: "H", width: 250 },
    function (err, svgString) {
      if (err) throw err;
      const qrCodeElement = document.getElementById(imgPlaceholder);
      if (!qrCodeElement) {
        console.error(`Element with ID ${imgPlaceholder} not found`);
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

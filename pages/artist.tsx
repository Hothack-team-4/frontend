import React from "react";
import codeGen from "../utils/qrCodeGenerator.js";



// this page will be for the attendees on the venue when they scan the QR
const qrcodeGenerator = () => {
  const code = codeGen();
  return code;
};

export default qrcodeGenerator;

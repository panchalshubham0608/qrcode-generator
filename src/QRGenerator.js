import React from "react";
import './QRGenerator.css';
import QRCode from 'react-qr-code';

export default function QRGenerator() {
    const [qrData, setQrData] = React.useState("");

    const downloadQR = () => {
        const svg = document.getElementById("qrcode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <div className="qr-generator">
            <form>
                <input type="text" placeholder="Enter text to generate QR code"
                    value={qrData} onChange={e => setQrData(e.target.value)}/>
            </form>
            <div className="qr-container">
                <QRCode size={256} value={qrData} id='qrcode' />
                <div>
                    <button className="download-qr-btn" onClick={downloadQR}>Download</button>
                </div>
            </div>
        </div>
    )
}
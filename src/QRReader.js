import React, { useEffect } from "react";
import QrScanner from "qr-scanner";
import QRFrame from './assets/qr-frame.svg';
import './QRReader.css';

export default function QRReader(props) {
    const scanner = React.useRef(); // Create a ref to the QRScanner component
    const videoRef = React.useRef(null); // Create a ref to the video element
    const qrBoxRef = React.useRef(null); // Create a ref to the QR box element
    const [loading, setLoading] = React.useState(true); // Create state to store the loading status
    const [scannerStarted, setScannerStarted] = React.useState(false); // Create state to store the scanner status
    const [qrData, setQrData] = React.useState(""); // Create state to store the QR data

    const onScanSuccess = (result) => {
        // if the QR data is already set, return
        if (qrData) return;
        // if the result is empty, return
        if (!result) return;
        // if the result doesn't have data, return
        if (!result.data) return;
        // set the QR data
        setQrData(result.data);
    }

    const onCloseResult = () => setQrData("");
    const openInNewWindow = () => {
        if (qrData.length > 0) {
            const win = window.open(qrData, '_blank');
            win.focus();
        }
    }

    useEffect(() => {
        if (videoRef?.current && !scanner?.current) {
            // Create a new instance of the QRScanner
            scanner.current = new QrScanner(videoRef?.current, onScanSuccess, {
                // environment: in case of a device with multiple cameras, this will use the back camera
                preferredCamera: 'environment',
                // highlight the scan region to show the user where to place the QR code
                highlightScanRegion: true,
                // this will pair with "highlightScanRegion" to show a box around the QR code
                overlay: qrBoxRef?.current,
            });

            // Start the scanner
            setLoading(true);
            scanner?.current.start()
            .then(() => setScannerStarted(true))
            .catch((err) => {
                setScannerStarted(false);
                console.log(err);
            })
            .finally(() => setLoading(false));
        }

        // cleanup function
        return () => {
            if (scanner?.current) {
                // stop the scanner
                scanner?.current.stop();
            }
        };
        // eslint-disable-next-line
    }, []);

    let boxClass = ['qr-box'];
    let styles = {};
    if (!scannerStarted) {
        styles = {
            backgroundColor: 'black',
        }
        boxClass.push('qr-disabled');
    }


    return (
        <div className="qr-reader">
            <h1 className="text-center">QR Code Scanner</h1>
            <video ref={videoRef} style={styles} />            
            <div ref={qrBoxRef} className={boxClass.join(' ')}>
                <div className="qr-frame">
                    {!loading && !scannerStarted &&
                    <p className="qr-camera-error">
                        Sorry, we couldn't start the camera.
                        Check if your browser supports the camera and if it's enabled.
                    </p>}
                    {!loading && scannerStarted &&
                    <img
                    src={QRFrame}
                    alt="QR Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                    />}
                    {!loading && scannerStarted && !qrData &&
                    <div className="qr-scanner-line"></div>}
                </div>
            </div>
            {qrData && qrData.length > 0 &&
            <div className="qr-scanned-result">
                <div className="qr-scanned-result-close">
                    <button onClick={onCloseResult}>X</button>
                </div>
                <form>
                    <input
                    type="text"
                    value={qrData.length > 0 ? qrData : "No QR code scanned"}
                    readOnly
                    placeholder="QR Code"
                    />
                    <button type="button" className="qr-open-result-button"
                        onClick={openInNewWindow}>Open in new window</button>
                </form>
            </div>}
        </div>
    );

}

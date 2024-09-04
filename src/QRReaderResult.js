import React, { useState } from "react";
import "./QRReaderResult.css";

export default function QRReaderResult({ url, onCloseResult }) {
    const [icon, setIcon] = useState("fa-regular fa-copy");

  // utility function to copy url to clipboard
  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Failed to copy password to clipboard", err);
      }
      textArea.remove();
    }
    setIcon("fa-solid fa-check");
    setTimeout(() => {
      setIcon("fa-regular fa-copy");
    }, 1000);
  };
  
  return (
        <div className="modal">
            <div className="modal-content">
                <div>
                    <div>
                        <a href={url} className="qr-result" target="_blank" rel="noreferrer">{url}</a>
                        <i className={icon} onClick={handleCopyUrl} />
                    </div>
                    <button onClick={onCloseResult} className="close-result-btn">
                        <i className="fa fa-times" />
                    </button>
                </div>
            </div>
        </div>
    );
}
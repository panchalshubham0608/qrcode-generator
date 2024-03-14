import React from 'react';
import QRReader from './QRReader';

export default function App() {
    return (
        <div className='centered'>
            <h1>QR Code Scanner</h1>
            <QRReader />
        </div>
    );
}

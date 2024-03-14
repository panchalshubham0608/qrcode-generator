import React from 'react';
import QRReader from './QRReader';
import QRGenerator from './QRGenerator';
import './App.css';
import Logo from './assets/logo.jpeg';

export default function App() {
  const [selectedIdx, setSelectedIdx] = React.useState(1);
  const list = ['Generate', 'Scan'];
    return (
      <div>
        <div className='navbar'>
          <img src={Logo} alt='logo' width={40} height={30} />
          <ul>
            {list.map((item, idx) => 
              <li key={item} className={selectedIdx === idx ? 'selected' : ''}
                onClick={() => setSelectedIdx(idx)}
              >{item}</li>)}
          </ul>
        </div>
        <div className='centered'>
            {selectedIdx === 0 && <QRGenerator />}
            {selectedIdx === 1 && <QRReader />}
        </div>
      </div>
    );
}

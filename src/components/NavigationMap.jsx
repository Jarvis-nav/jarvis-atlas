import React, { useRef, useState, useEffect } from 'react';
import QRScanner from './QRScanner';
import './NavigationMap.css';

const options = [
  { label: 'Commons Room',           value: 'COMMONS_ROOM' },
  { label: 'Small Meeting Room',     value: 'SMALL_MEETING_ROOM' },
  { label: 'Cafe',                   value: 'CAFE' },
  { label: 'Reception',              value: 'RECEPTION' },
  { label: 'Coffee Shop',            value: 'COFFEE_SHOP' },
  { label: 'Kenvue Store',           value: 'KENVUE_STORE' },
  { label: 'Gents Toilet',           value: 'GENTS_TOILET' },
  { label: 'Ladies Toilet',          value: 'LADIES_TOILET' },
  { label: 'Innovation Labs',        value: 'INNOVATION_LABS' },
  { label: 'Wellness Room Ladies',   value: 'WELLNESS_ROOM_LADIES' },
  { label: 'Large Meeting Room',     value: 'LARGE_MEETING_ROOM' },
  { label: 'Open Meeting Room',      value: 'OPEN_MEETING_ROOM' },
];

const SvgNavigator = () => {
  const svgRef = useRef(null);
  const [svgLoaded, setSvgLoaded]         = useState(false);
  const [sourceZone, setSourceZone]       = useState('');
  const [destinationZone, setDestination] = useState('');
  const [manualMode, setManualMode]       = useState(false);
  const [viewBox, setViewBox]             = useState('0 0 1600 900');
  const [qrVisible,setQrVisible] = useState(false);

  useEffect(() => {
    if (sourceZone && destinationZone) {
      setTimeout(() => {
        const svgDoc = svgRef.current?.contentDocument;
        if (!svgDoc) return;

        svgDoc.querySelectorAll('.highlight-blink').forEach(el =>
          el.classList.remove('highlight-blink')
        );

        const sourceEl = svgDoc.getElementById(sourceZone);
        const destEl   = svgDoc.getElementById(destinationZone);

        if (sourceEl) {
          sourceEl.classList.add('highlight-blink');
          sourceEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
        if (destEl) {
          destEl.classList.add('highlight-blink');
          destEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      }, 100);
    }
  }, [sourceZone, destinationZone]);

  const highlightSVG = (id) => { /* still a stub */ };

  const zoomToElements = (id1, id2) => {
    const svgDoc = svgRef.current?.contentDocument;
    if (!svgDoc) return;
    const el1 = svgDoc.getElementById(id1);
    const el2 = svgDoc.getElementById(id2);
    if (!el1 || !el2) return;
    const b1 = el1.getBBox(), b2 = el2.getBBox();
    const minX = Math.min(b1.x, b2.x), minY = Math.min(b1.y, b2.y);
    const maxX = Math.max(b1.x + b1.width, b2.x + b2.width);
    const maxY = Math.max(b1.y + b1.height, b2.y + b2.height);
    const pad = 100;
    setViewBox(
      `${minX - pad} ${minY - pad} ${(maxX - minX) + pad*2} ${(maxY - minY) + pad*2}`
    );
  };

  const handleQRDetected = (qr) => {
    const normalized = qr.replace(/-/g, '_').toUpperCase();
    const found = options.find(z => z.value === normalized);
    if (found) {
      setSourceZone(found.value);
      highlightSVG(found.value);
      setQrVisible(!qrVisible);
    } else {
      alert(`❌ QR code value '${qr}' does not match any known zone.`);
      setManualMode(true);
    }
  };

  useEffect(() => {
    if (svgLoaded && sourceZone && destinationZone) {
      highlightSVG(sourceZone);
      highlightSVG(destinationZone);
      zoomToElements(sourceZone, destinationZone);
    }
  }, [svgLoaded, sourceZone, destinationZone]);

  return (
    <div className="svg-navigator-container">
      <h2 style={{ color: 'black' }}>5th Floor Map</h2>
      <div>

      <button style={{textTransform:'uppercase',backgroundColor:'#bfffcf',color:'#000',marginBottom:10,fontWeight:'600'}}
      onClick={()=>{
        setQrVisible(!qrVisible);
      }}>Click to scan the qr</button>
      </div>
      { qrVisible ? (
        <QRScanner
          onDetected={handleQRDetected}
          onManualSelectTrigger={() => setManualMode(true)}
        />
      ) : (
        <div className="dropdowns">
          <div className="dropdown-group">
            <label>Source Zone</label>
            <select
              value={sourceZone}
              onChange={e => {
                setSourceZone(e.target.value);
                highlightSVG(e.target.value);
              }}
            >
              <option value="">Select Source</option>
              {options
                .filter(o => o.value !== destinationZone)
                .map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="dropdown-group">
            <label>Your Destination</label>
            <select
              value={destinationZone}
              onChange={e => {
                setDestination(e.target.value);
                highlightSVG(e.target.value);
              }}
            >
              <option value="">Select Destination</option>
              {options
                .filter(o => o.value !== sourceZone)
                .map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      <div className="svg-wrapper">
        <object
          ref={svgRef}
          type="image/svg+xml"
          data="/fifth_floor.svg"
          className="svg-map"
          aria-label="Interactive Office Map"
          onLoad={() => setSvgLoaded(true)}
        >
          Your browser does not support SVG
        </object>
      </div>
    </div>
  );
};

export default SvgNavigator;

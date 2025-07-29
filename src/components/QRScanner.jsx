import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';

const QRScanner = ({ onDetected, onManualSelectTrigger, disableScanner }) => {
  const [error, setError] = useState(null);
  const [showTimeoutError, setShowTimeoutError] = useState(false);
  const [scannedValue, setScannedValue] = useState('');      // ← new state
  const scanFailures = useRef(0);
  const lastScanTimeRef = useRef(Date.now());
  const html5QrCodeRef = useRef(null);
  const readerId = 'qr-reader';

  useEffect(() => {
    if (disableScanner) return;

    const startScanner = async () => {
      try {
        const readerElement = document.getElementById(readerId);
        if (!readerElement) {
          console.warn("QR reader element not found.");
          return;
        }

        const html5QrCode = new Html5Qrcode(readerId);
        html5QrCodeRef.current = html5QrCode;

        const cameras = await Html5Qrcode.getCameras();
        if (!cameras?.length) throw new Error("No camera found");
        const cameraId = cameras[0].id;

        await html5QrCode.start(
          cameraId,
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            // capture and display
            console.log("Decoded QR:", decodedText);
            setScannedValue(decodedText);        // ← store it
            scanFailures.current = 0;
            lastScanTimeRef.current = Date.now();
            stopScanner();
            onDetected(decodedText);
          },
          (errorMessage) => {
            if (!errorMessage.includes("NotFoundException")) {
              console.warn("QR scan error:", errorMessage);
              setError(errorMessage);
            }
          }
        );
      } catch (err) {
        setError(err.message || "Camera access error");
        setShowTimeoutError(true);
        setTimeout(() => setShowTimeoutError(false), 1000);
        onManualSelectTrigger();
      }
    };

    const startup = setTimeout(startScanner, 100);
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastScanTimeRef.current > 6000) {
        scanFailures.current += 1;
        setShowTimeoutError(true);
        setTimeout(() => setShowTimeoutError(false), 1000);
        lastScanTimeRef.current = now;
        if (scanFailures.current >= 3) {
          stopScanner();
          onManualSelectTrigger();
        }
      }
    }, 1000);

    return () => {
      clearTimeout(startup);
      clearInterval(interval);
      stopScanner();
    };
  }, [disableScanner, onDetected, onManualSelectTrigger]);

  const stopScanner = () => {
    const scanner = html5QrCodeRef.current;
    if (scanner && scanner.getState() === Html5QrcodeScannerState.SCANNING) {
      scanner.stop().then(() => scanner.clear()).catch(() => {});
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h3>📷 Scan QR Code to know your location</h3>

      {!disableScanner && (
        <div
          id={readerId}
          style={{
            width: '300px',
            height: '225px',
            margin: 'auto',
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
          }}
        />
      )}
     
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {showTimeoutError && !disableScanner && (
        <div
          style={{
            background: 'red',
            color: 'white',
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            borderRadius: '6px',
          }}
        >
          ⚠️ QR not detected
        </div>
      )}

      {/* ← Display whatever was last scanned */}
      {scannedValue && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Scanned value: {scannedValue}
        </p>
      )}
    </div>
  );
};

export default QRScanner;

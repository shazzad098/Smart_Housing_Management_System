import React, { useState, useRef, useEffect } from 'react';
import { Visitor, VisitorStatus } from '../types';
import { Camera, X, CheckCircle, AlertCircle, Search, QrCode, UserCheck, Ban, ArrowRight } from 'lucide-react';

// Mock database for verification
const upcomingVisitors: Visitor[] = [
  { id: '4', name: 'Amit Patel', flatNo: 'A-210', entryTime: '2024-07-29 02:00 PM', exitTime: '-', purpose: 'Family Guest', status: VisitorStatus.UPCOMING, qrCode: 'VP-2024-001' },
  { id: '6', name: 'Urban Company', flatNo: 'C-502', entryTime: '2024-07-29 03:30 PM', exitTime: '-', purpose: 'Service', status: VisitorStatus.UPCOMING, qrCode: 'VP-2024-002', vehicleNumber: 'MH-02-BZ-9999' },
];

const SecurityGate: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<Visitor | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setIsScanning(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure permissions are granted.');
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(manualCode);
  };

  const verifyCode = (code: string) => {
    // Simulate verification logic with case-insensitive match
    const visitor = upcomingVisitors.find(v => 
      (v.qrCode && v.qrCode.toLowerCase() === code.toLowerCase()) || 
      (v.vehicleNumber && v.vehicleNumber.toLowerCase() === code.toLowerCase())
    );
    
    if (visitor) {
      setScannedData(visitor);
      stopCamera();
      setManualCode('');
      setError(null);
    } else {
      setError('Invalid QR Code or ID. No visitor found.');
      setTimeout(() => setError(null), 3000);
    }
  };

  // Simulate a successful scan for demonstration purposes
  const simulateScan = () => {
    verifyCode('VP-2024-001');
  };

  const handleAction = (action: 'approve' | 'reject') => {
    if (scannedData) {
        const message = action === 'approve' 
          ? `Entry Approved for ${scannedData.name}` 
          : `Entry Denied for ${scannedData.name}`;
        
        setFeedback({
            type: action === 'approve' ? 'success' : 'error',
            message: message
        });
        setScannedData(null);
        setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto relative">
      {/* Feedback Toast */}
      {feedback && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-lg text-white font-medium z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 flex items-center gap-3 ${feedback.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {feedback.type === 'success' ? <CheckCircle size={20} /> : <Ban size={20} />}
            {feedback.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Gate Entry</h2>
          <p className="text-gray-500 dark:text-gray-400">Verify and manage visitor entry via QR Code.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             Gate Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scanner Section */}
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative min-h-[400px] flex flex-col">
                {!isScanning ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                            <QrCode size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Scan Visitor QR</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-8">
                            Use the camera to scan the visitor's entry pass QR code for instant verification.
                        </p>
                        <button 
                            onClick={startCamera}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-transform active:scale-95"
                        >
                            <Camera size={20} />
                            Activate Camera
                        </button>
                    </div>
                ) : (
                    <div className="relative flex-1 bg-black flex items-center justify-center">
                        <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover opacity-80"></video>
                        
                        {/* Scanning Overlay */}
                        <div className="relative z-10 w-64 h-64 border-2 border-white/50 rounded-3xl flex flex-col items-center justify-center">
                            <div className="absolute inset-0 border-2 border-blue-500 rounded-3xl animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                            <div className="w-full h-0.5 bg-red-500 absolute top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                        </div>
                        
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20 px-4">
                            <button 
                                onClick={stopCamera}
                                className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg border border-white/20 hover:bg-white/20"
                            >
                                Cancel
                            </button>
                             {/* Dev helper to simulate scan since we can't easily show a real QR to the camera in this env */}
                            <button 
                                onClick={simulateScan}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
                            >
                                Simulate Detect
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Manual Entry Fallback */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Manual Entry</h3>
                <form onSubmit={handleManualSubmit} className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            placeholder="Enter QR Code ID or Vehicle Number"
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white text-sm"
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={!manualCode}
                        className="px-6 py-2.5 bg-gray-900 dark:bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Verify
                    </button>
                </form>
                {error && (
                    <div className="mt-3 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}
            </div>
        </div>

        {/* Verification Result Section */}
        <div className="space-y-6">
             {scannedData ? (
                 <div className="bg-white dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-blue-900 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-blue-600 p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div className="flex items-center gap-3 mb-1">
                            <CheckCircle className="text-green-300" size={24} />
                            <span className="font-bold text-lg">Verified Visitor</span>
                        </div>
                        <p className="text-blue-100 text-sm">Pass ID: {scannedData.qrCode}</p>
                    </div>
                    
                    <div className="p-8 flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-lg -mt-20 mb-6 overflow-hidden bg-gray-100">
                            <img src={`https://ui-avatars.com/api/?name=${scannedData.name}&background=random`} alt={scannedData.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{scannedData.name}</h2>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-6">
                             <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">
                                {scannedData.purpose}
                             </span>
                             <span>•</span>
                             <span>{scannedData.vehicleNumber || 'No Vehicle'}</span>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4 mb-8">
                             <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                 <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Visiting Flat</p>
                                 <p className="text-xl font-bold text-gray-900 dark:text-white">{scannedData.flatNo}</p>
                             </div>
                             <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                 <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Expected Time</p>
                                 <p className="text-lg font-bold text-gray-900 dark:text-white">Now</p>
                             </div>
                        </div>

                        <div className="w-full flex gap-3">
                            <button 
                                onClick={() => handleAction('reject')}
                                className="flex-1 py-3 px-4 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-2 transition-colors"
                            >
                                <Ban size={18} />
                                Deny Entry
                            </button>
                            <button 
                                onClick={() => handleAction('approve')}
                                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-colors"
                            >
                                <ArrowRight size={18} />
                                Approve Entry
                            </button>
                        </div>
                    </div>
                 </div>
             ) : (
                 <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
                     <div className="text-center text-gray-400 dark:text-gray-500">
                         <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                             <UserCheck size={32} />
                         </div>
                         <p className="font-medium">No visitor scanned</p>
                         <p className="text-sm mt-1">Scan a QR code or enter details manually to verify a visitor.</p>
                     </div>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default SecurityGate;
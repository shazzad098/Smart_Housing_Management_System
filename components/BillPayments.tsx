
import React, { useState } from 'react';
import { Bill, BillStatus, User } from '../types';
import { Filter, Download, CreditCard, Eye, Zap, Droplets, Wrench, PartyPopper, X, CheckCircle, Loader2, AlertCircle, Shield, Plus, Calendar } from 'lucide-react';

interface BillPaymentsProps {
  user: User;
}

const initialBillsData: Bill[] = [
  { id: '1', type: 'Monthly Maintenance', billId: '#SS-1025', dueDate: 'Oct 25, 2023', amount: 2500.00, status: BillStatus.OVERDUE },
  { id: '2', type: 'Water Charges', billId: '#SS-1024', dueDate: 'Nov 15, 2023', amount: 850.00, status: BillStatus.DUE },
  { id: '3', type: 'Electricity Bill', billId: '#SS-1023', dueDate: 'Nov 18, 2023', amount: 1500.00, status: BillStatus.DUE },
  { id: '4', type: 'Monthly Maintenance', billId: '#SS-1022', dueDate: 'Sep 25, 2023', amount: 2500.00, status: BillStatus.PAID },
  { id: '5', type: 'Festival Contribution', billId: '#SS-1021', dueDate: 'Aug 30, 2023', amount: 1000.00, status: BillStatus.PAID },
];

const getIcon = (type: string) => {
  if (type.includes('Maintenance')) return <Wrench size={18} className="text-blue-500" />;
  if (type.includes('Water')) return <Droplets size={18} className="text-cyan-500" />;
  if (type.includes('Electricity')) return <Zap size={18} className="text-yellow-500" />;
  if (type.includes('Festival')) return <PartyPopper size={18} className="text-purple-500" />;
  return <CreditCard size={18} className="text-gray-500" />;
};

const BillPayments: React.FC<BillPaymentsProps> = ({ user }) => {
  const [bills, setBills] = useState<Bill[]>(initialBillsData);
  const [statusFilter, setStatusFilter] = useState<'All' | BillStatus>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  
  // Modal States
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  
  // Processing States
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generateSuccess, setGenerateSuccess] = useState(false);

  // New Bill Form State
  const [newBillData, setNewBillData] = useState({
    type: 'Monthly Maintenance',
    amount: '',
    dueDate: ''
  });

  // Extract unique bill types for the dropdown
  const billTypes = ['All', ...Array.from(new Set(bills.map(bill => bill.type)))];

  const filteredBills = bills.filter(bill => {
    const matchStatus = statusFilter === 'All' || bill.status === statusFilter;
    const matchType = typeFilter === 'All' || bill.type === typeFilter;
    return matchStatus && matchType;
  });

  const getStatusColor = (status: BillStatus) => {
    switch (status) {
      case BillStatus.PAID: return 'bg-green-100 text-green-700';
      case BillStatus.OVERDUE: return 'bg-red-100 text-red-700';
      case BillStatus.DUE: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const unpaidBills = bills.filter(b => b.status === BillStatus.DUE || b.status === BillStatus.OVERDUE);
  const totalDueAmount = unpaidBills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalDueCount = unpaidBills.length;

  const handlePayAllClick = () => {
    if (totalDueCount > 0) {
      setIsPaymentModalOpen(true);
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedBills = bills.map(bill => {
        if (bill.status === BillStatus.DUE || bill.status === BillStatus.OVERDUE) {
          return { ...bill, status: BillStatus.PAID };
        }
        return bill;
      });
      
      setBills(updatedBills);
      setIsProcessing(false);
      setIsPaymentModalOpen(false);
      setPaymentSuccess(true);
      
      setTimeout(() => setPaymentSuccess(false), 4000);
    }, 2000);
  };

  const handleGenerateBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBillData.amount || !newBillData.dueDate) return;

    const newBill: Bill = {
      id: Date.now().toString(),
      type: newBillData.type,
      billId: `#SS-${Math.floor(1000 + Math.random() * 9000)}`,
      dueDate: new Date(newBillData.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: parseFloat(newBillData.amount),
      status: BillStatus.DUE
    };

    setBills([newBill, ...bills]);
    setIsGenerateModalOpen(false);
    setNewBillData({ type: 'Monthly Maintenance', amount: '', dueDate: '' });
    setGenerateSuccess(true);
    setTimeout(() => setGenerateSuccess(false), 3000);
  };

  const handleDownloadReceipt = (bill: Bill) => {
    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) {
      alert('Please allow popups to download receipt');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${bill.billId}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
          .header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 24px; font-weight: bold; color: #1e3a8a; }
          .bill-info { text-align: right; }
          .status { display: inline-block; padding: 5px 15px; background: #dcfce7; color: #166534; border-radius: 20px; font-weight: bold; font-size: 14px; border: 1px solid #bbf7d0; }
          .content { margin-bottom: 40px; }
          .row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #f3f4f6; padding-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .total { font-size: 20px; font-weight: bold; border-top: 2px solid #333; padding-top: 15px; margin-top: 20px; }
          .footer { text-align: center; font-size: 12px; color: #999; margin-top: 60px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">SocietyHub</div>
          <div class="bill-info">
            <h1>Payment Receipt</h1>
            <p>Receipt ID: RCPT-${Date.now().toString().slice(-6)}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div class="content">
          <div style="text-align: center; margin-bottom: 30px;">
            <span class="status">PAID SUCCESSFULLY</span>
          </div>

          <div class="row">
            <span class="label">Bill ID</span>
            <span>${bill.billId}</span>
          </div>
          <div class="row">
            <span class="label">Bill Type</span>
            <span>${bill.type}</span>
          </div>
          <div class="row">
            <span class="label">Bill Date</span>
            <span>${bill.dueDate}</span>
          </div>
          <div class="row">
            <span class="label">Payment Method</span>
            <span>Online Transfer</span>
          </div>
           <div class="row total">
            <span>Total Amount</span>
            <span>₹${bill.amount.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <p>This is a computer generated receipt and does not require a physical signature.</p>
          <p>SocietyHub Management System • Flat A-101, Smart Heights</p>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    receiptWindow.document.write(htmlContent);
    receiptWindow.document.close();
  };

  return (
    <div className="space-y-6 relative">
      {/* Success Toasts */}
      {paymentSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
            <CheckCircle size={24} />
            <div>
              <h4 className="font-bold">Payment Successful!</h4>
              <p className="text-sm text-green-100">All dues have been cleared.</p>
            </div>
          </div>
        </div>
      )}

      {generateSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-blue-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
            <CheckCircle size={24} />
            <div>
              <h4 className="font-bold">Bill Generated!</h4>
              <p className="text-sm text-blue-100">The new bill has been added successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Generate Bill Modal (Admin) */}
      {isGenerateModalOpen && user.role === 'admin' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Generate New Bill</h3>
              <button 
                onClick={() => setIsGenerateModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleGenerateBill} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bill Type</label>
                <select 
                  value={newBillData.type}
                  onChange={(e) => setNewBillData({...newBillData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                >
                  <option value="Monthly Maintenance">Monthly Maintenance</option>
                  <option value="Water Charges">Water Charges</option>
                  <option value="Electricity Bill">Electricity Bill</option>
                  <option value="Festival Contribution">Festival Contribution</option>
                  <option value="Parking Fees">Parking Fees</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                <input 
                  type="date" 
                  required
                  value={newBillData.dueDate}
                  onChange={(e) => setNewBillData({...newBillData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={newBillData.amount}
                  onChange={(e) => setNewBillData({...newBillData, amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 mt-4 flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Create Bill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal (Only for Residents) */}
      {isPaymentModalOpen && user.role === 'resident' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Summary</h3>
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Amount to Pay</span>
                  <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">₹{totalDueAmount.toFixed(2)}</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400">For {totalDueCount} pending bills</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Breakdown</p>
                <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  {unpaidBills.map(bill => (
                    <div key={bill.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{bill.type}</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{bill.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">₹{totalDueAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</p>
                <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 cursor-pointer transition-all">
                  <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                    VISA
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">•••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/24</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button 
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay ₹{totalDueAmount.toFixed(2)}
                    <Zap size={18} className="fill-white" />
                  </>
                )}
              </button>
              <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                <Shield size={12} />
                Secure 256-bit SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.role === 'admin' ? 'Manage Bills' : 'Your Bills'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {user.role === 'admin' 
              ? 'View and generate bills for society residents.' 
              : 'View and manage all your society bills here.'}
          </p>
        </div>
        
        {/* Conditional Action Button */}
        {user.role === 'resident' ? (
          <button 
            onClick={handlePayAllClick}
            disabled={totalDueAmount === 0}
            className={`bg-blue-900 text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition flex items-center gap-2 shadow-lg shadow-blue-900/20 ${totalDueAmount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <CreditCard size={18} />
            {totalDueAmount > 0 ? `Pay All Dues (₹${totalDueAmount.toFixed(2)})` : 'No Dues Pending'}
          </button>
        ) : (
          <button 
            onClick={() => setIsGenerateModalOpen(true)}
            className="bg-blue-900 text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition flex items-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Generate New Bill
          </button>
        )}
      </div>

      {/* Summary Cards - Display different context for Admin vs Resident if needed, kept generic for now */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {user.role === 'admin' ? 'Total Outstanding' : 'Total Due'}
          </p>
          <p className={`text-3xl font-bold ${totalDueAmount > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            ₹{totalDueAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending Bills</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{totalDueCount} Bills</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {user.role === 'admin' ? 'Collected This Month' : 'Last Payment'}
          </p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {user.role === 'admin' ? '₹45,250' : '₹2,500.00'}
          </p>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
             <input 
               type="text" 
               placeholder="Search by Bill ID..." 
               className="w-full pl-3 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
             />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select 
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="All">All Status</option>
              <option value={BillStatus.DUE}>Due</option>
              <option value={BillStatus.OVERDUE}>Overdue</option>
              <option value={BillStatus.PAID}>Paid</option>
            </select>
            <select 
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {billTypes.map(type => (
                <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4">Bill Type</th>
                <th className="px-6 py-4">Bill ID</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                      {getIcon(bill.type)}
                    </div>
                    {bill.type}
                  </td>
                  <td className="px-6 py-4">{bill.billId}</td>
                  <td className="px-6 py-4">{bill.dueDate}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">₹{bill.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                        <Eye size={18} />
                      </button>
                      {/* Payment Action - Hidden for Admin */}
                      {user.role === 'resident' && bill.status !== BillStatus.PAID && (
                        <button className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition" title="Pay Now">
                          <CreditCard size={18} />
                        </button>
                      )}
                       {bill.status === BillStatus.PAID && (
                        <button 
                          onClick={() => handleDownloadReceipt(bill)}
                          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                          title="Download Receipt"
                        >
                          <Download size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">Showing {filteredBills.length} entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">Previous</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-xs hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPayments;

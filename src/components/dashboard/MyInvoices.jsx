"use client";

import { useState, useEffect } from "react";
import { Download, FileText, ExternalLink, CreditCard, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/api";

export default function MyInvoices() {
  const { student } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (student?.id) {
      fetchInvoices();
    }
  }, [student?.id]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await apiRequest(`/students/${student.id}/invoices`);
      if (response && response.success) {
        setInvoices(response.data.invoices);
      } else {
        setError("Failed to load invoices.");
      }
    } catch (err) {
      setError(err.message || "Failed to load invoices. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-red-200 p-8 text-center text-red-600">
        <FileText className="w-12 h-12 mx-auto mb-4 text-red-400" />
        <p>{error}</p>
        <button 
          onClick={fetchInvoices}
          className="mt-4 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Invoices Found</h3>
        <p className="text-gray-500">
          You don't have any past invoices yet. Once you make a purchase, your receipt will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-800" />
            Billing & Invoices
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            View and download receipts for your course and event purchases.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
              <th className="p-4 pl-6">Invoice details</th>
              <th className="p-4">Date</th>
              <th className="p-4">Context</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice._id} className="hover:bg-gray-50 transition-colors group">
                <td className="p-4 pl-6">
                  <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                </td>
                <td className="p-4 text-gray-600">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(invoice.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    invoice.itemType === 'Course' ? 'bg-indigo-50 text-indigo-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                    <CreditCard className="w-3.5 h-3.5" />
                    {invoice.itemType} Registration
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-gray-900">
                    {invoice.currency} {invoice.amount.toLocaleString()}
                  </div>
                </td>
                <td className="p-4 text-right pr-6">
                  <button
                    onClick={() => handleDownload(invoice.pdfUrl)}
                    disabled={!invoice.pdfUrl}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={!invoice.pdfUrl ? "Invoice PDF not available" : "Download Invoice"}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

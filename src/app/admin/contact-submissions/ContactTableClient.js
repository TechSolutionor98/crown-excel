"use client"
import React, { useState, useMemo, useEffect } from 'react';

export default function ContactTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      refresh();
    }
  }, []);

  // Sort latest first
  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(r => (
      (r.name || '').toString().toLowerCase().includes(q) ||
      (r.email || '').toString().toLowerCase().includes(q) ||
      (r.phone || '').toString().toLowerCase().includes(q) ||
      (r.subject || '').toString().toLowerCase().includes(q) ||
      (r.service || '').toString().toLowerCase().includes(q) ||
      (r.productName || '').toString().toLowerCase().includes(q) ||
      (r.productBarcode || '').toString().toLowerCase().includes(q)
    ));
  }, [sorted, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function refresh() {
    try {
      setLoading(true);
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/contact-submissions`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(data);
      setPage(1);
    } catch (err) {
      console.error('Failed to refresh:', err);
      alert('Failed to refresh: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!rows || rows.length === 0) return alert('No data');
    const headers = ['#', 'name', 'email', 'phone', 'subject', 'service', 'productName', 'productBarcode', 'comments', 'createdAt'];
    const csv = [headers.join(',')].concat(rows.map((r, i) => {
      const vals = [i + 1, r.name, r.email, r.phone, r.subject, r.service, r.productName || '', r.productBarcode || '', r.comments, r.createdAt ? new Date(r.createdAt).toLocaleString() : ''];
      return vals.map(v => {
        const s = ((v ?? '') + '').replace(/"/g, '""');
        return `"${s}"`;
      }).join(',');
    })).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'contact_submissions.csv'; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  // Get the global index for a row on current page
  const getGlobalIndex = (pageIndex) => (page - 1) * pageSize + pageIndex + 1;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search name, email, phone, subject..."
            className="border border-[#00a63e] focus:border-[#084032] p-2 rounded-lg w-full sm:w-80 outline-none transition-all text-sm"
          />
          <button
            onClick={() => { setQuery(''); setPage(1); }}
            className="px-3 py-2 bg-gray-100 hover:bg-[#00a63e] hover:text-white rounded-lg transition-all text-sm font-medium cursor-pointer shrink-0"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={refresh}
            className={`px-3.5 py-2 rounded-lg bg-[#00a63e] hover:bg-[#084032] text-white text-sm font-semibold shadow-sm ${loading ? 'opacity-60' : ''} transition-all cursor-pointer`}
          >
            Refresh
          </button>
          <button
            onClick={downloadCSV}
            className="px-3.5 py-2 rounded-lg bg-[#084032] hover:bg-[#0a5a47] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Page size selector */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#084032] cursor-pointer"
        >
          {[10, 25, 50, 100].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: "auto", maxHeight: "580px", overflowY: "auto" }} className="w-full max-w-full rounded-lg border border-gray-200 shadow-xs">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#084032] text-white text-xs uppercase tracking-wider">
              <th className="px-4 py-3.5 font-semibold text-left">Inquiry #</th>
              <th className="px-4 py-3.5 font-semibold text-left">Name</th>
              <th className="px-4 py-3.5 font-semibold text-left">Email</th>
              <th className="px-4 py-3.5 font-semibold text-left">Phone</th>
              <th className="px-4 py-3.5 font-semibold text-left">Subject</th>
              <th className="px-4 py-3.5 font-semibold text-left">Service</th>
              <th className="px-4 py-3.5 font-semibold text-left">Comments</th>
              <th className="px-4 py-3.5 font-semibold text-left">Submitted At</th>
              <th className="px-4 py-3.5 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-gray-500 text-sm">
                  No inquiries found.
                </td>
              </tr>
            ) : (
              pageData.map((s, idx) => (
                <tr key={s.id ?? s._id ?? idx} className="hover:bg-[#e6f9f0] align-top transition-colors">
                  <td className="px-4 py-3.5 align-middle font-semibold text-[#084032]">{getGlobalIndex(idx)}</td>
                  <td className="px-4 py-3.5 align-middle font-medium text-gray-900">{s.name || '—'}</td>
                  <td className="px-4 py-3.5 align-middle text-gray-600">{s.email || '—'}</td>
                  <td className="px-4 py-3.5 align-middle text-gray-600 font-mono text-xs">{s.phone || '—'}</td>
                  <td className="px-4 py-3.5 align-middle text-gray-800">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                      {s.subject || 'General'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 align-middle text-gray-700">{s.service || '—'}</td>
                  <td className="px-4 py-3.5 align-middle text-gray-500 max-w-[220px] truncate" title={s.comments}>
                    {(s.comments || '').length > 30 ? s.comments.substring(0, 30) + '...' : (s.comments || '—')}
                  </td>
                  <td className="px-4 py-3.5 align-middle text-gray-500 text-xs whitespace-nowrap">
                    {s.createdAt ? new Date(s.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                  </td>
                  <td className="px-4 py-3.5 align-middle text-center">
                    <button
                      onClick={() => setViewRow({ ...s, inquiryNo: getGlobalIndex(idx) })}
                      className="px-3.5 py-1.5 bg-[#084032] hover:bg-[#0a5a47] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-600">
          Showing {Math.min(filtered.length, (page - 1) * pageSize + 1)} - {Math.min(filtered.length, page * pageSize)} of {filtered.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-[#e6f9f0] transition-all cursor-pointer text-sm font-medium"
          >
            Prev
          </button>
          <div className="px-4 py-2 font-semibold text-sm text-[#084032]">{page} / {totalPages}</div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-[#e6f9f0] transition-all cursor-pointer text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Detail Popup */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#084032] rounded-t-2xl px-6 py-4 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">Inquiry #{viewRow.inquiryNo}</h2>
              <button
                onClick={() => setViewRow(null)}
                className="text-white/80 hover:text-white text-2xl font-bold cursor-pointer leading-none"
              >
                ×
              </button>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Name</p>
                  <p className="text-[#084032] font-semibold text-sm">{viewRow.name || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-[#084032] font-semibold text-sm break-all">{viewRow.email || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-[#084032] font-semibold text-sm">{viewRow.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                  <p className="text-[#084032] font-semibold text-sm">{viewRow.subject || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {viewRow.productName ? 'Product / Service' : 'Service'}
                  </p>
                  <p className="text-[#084032] font-semibold text-sm">{viewRow.service || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Submitted At</p>
                  <p className="text-[#084032] font-semibold text-sm">{viewRow.createdAt ? new Date(viewRow.createdAt).toLocaleString() : '—'}</p>
                </div>
                {viewRow.productName && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Product Name</p>
                    <p className="text-[#084032] font-semibold text-sm">{viewRow.productName}</p>
                  </div>
                )}
                {viewRow.productBarcode && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Product Barcode</p>
                    <p className="text-[#084032] font-semibold text-sm font-mono">{viewRow.productBarcode}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Comments</p>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap break-words min-h-[80px]">
                  {viewRow.comments || '—'}
                </div>
              </div>

              <button
                onClick={() => setViewRow(null)}
                className="w-full bg-[#084032] hover:bg-[#0a5a47] text-white rounded-full h-[42px] font-semibold text-[14px] cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

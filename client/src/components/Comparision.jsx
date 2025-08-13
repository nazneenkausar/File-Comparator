import React, { useState } from 'react';
import axios from 'axios';

const XMLcompare = (props) => {
  const [files, setFiles] = useState([]);
  const [results, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const onsubmit = async () => {
    if (!files || files.length < 2) {
      setError('Please select at least two XML files.');
      return;
    }
    setError('');
    setLoading(true);
    const formdata = new FormData();
    for (const file of files) {
      formdata.append('xmlfile', file);
    }
    try {
      const res = await axios.post('http://localhost:3000/compare', formdata);
      setResult(res.data);
    } catch (err) {
      setError('Error comparing files. Please check your backend server.');
      setResult({});
    }
    setLoading(false);
  };

  const renderValue = (val) => {
    if (val === undefined) return <span style={{ color: '#aaa' }}>N/A</span>;
    if (typeof val === 'object') {
      if (val && val.Name && val.id) {
        return <span><b>Employee:</b> {val.Name} <span style={{ color: '#888' }}>(ID: {val.id})</span></span>;
      }
      if (Array.isArray(val)) {
        return <span>[Array: {val.length}]</span>;
      }
      // For Contact or other objects, show a summary
      if (val && val.Email && val.Phone) {
        return <span><b>Contact:</b> {val.Email}, {val.Phone}</span>;
      }
      return <span>[Object]</span>;
    }
    if (val === '(missing)') return <span style={{ color: '#e57373' }}><b>Missing</b></span>;
    return String(val);
  };

  const renderTable = () => {
    const diffs = results.differences || [];
    if (!diffs.length) return null;
    const fileCount = diffs[0].values.length;
    const fileLabels = Array.from({ length: fileCount }, (_, i) => `File ${i + 1}`);
    return (
      <div style={{
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'auto',
        marginTop: 24,
        boxSizing: 'border-box',
      }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>
          Showing <b>{diffs.length}</b> difference{diffs.length !== 1 ? 's' : ''}
        </div>
        <table style={{ width: '100%', minWidth: 500, borderCollapse: 'collapse', border: '2px solid #1976d2', fontSize: 'clamp(13px, 2vw, 16px)', background: '#f9fafd' }}>
          <thead style={{ background: '#1976d2', color: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>
            <tr>
              <th style={{ padding: '8px 10px', border: '1px solid #1976d2', minWidth: 120 }}>Key/Path</th>
              <th style={{ padding: '8px 10px', border: '1px solid #1976d2', minWidth: 80 }}>Name</th>
              {fileLabels.map((label, idx) => (
                <th key={idx} style={{ padding: '8px 10px', border: '1px solid #1976d2', minWidth: 120 }}>{label}</th>
              ))}
              <th style={{ padding: '8px 10px', border: '1px solid #1976d2', minWidth: 80 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {diffs.map((diff, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f1f5fb' }}>
                <td style={{ border: '1px solid #1976d2', padding: '6px 8px', fontFamily: 'monospace', fontSize: 13 }}>{diff.definitionKey || diff.parentKey || diff.path}</td>
                <td style={{ border: '1px solid #1976d2', padding: '6px 8px' }}>{diff.definitionName || '—'}</td>
                {diff.values.map((val, idx) => (
                  <td key={idx} style={{ border: '1px solid #1976d2', padding: '6px 8px', whiteSpace: 'pre-wrap' }}>
                    {renderValue(val)}
                  </td>
                ))}
                <td style={{ border: '1px solid #1976d2', padding: '6px 8px', fontWeight: 500, color: diff.status === 'Changed' ? '#d32f2f' : diff.status === 'Added' ? '#388e3c' : '#1976d2' }}>
                  {diff.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', // move card toward top
      background: '#f5f7fa',
      padding: '24px 8px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 16px #0001',
        padding: '32px 16px',
        marginTop: 8, // less margin to top
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#1976d2', letterSpacing: 1 }}>
          {props.fileType === 'ini' ? 'INI File Comparison' : props.fileType === 'xml' ? 'XML File Comparison' : 'File Comparison'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type='file'
            multiple
            accept={props.fileType === 'ini' ? '.ini' : props.fileType === 'xml' ? '.xml' : '.xml,.ini'}
            style={{ marginBottom: 12 }}
            onChange={handleChange}
          />
          {files && files.length > 0 && (
            <div style={{
              background: '#f1f5fb',
              borderRadius: 8,
              padding: '10px 18px',
              marginBottom: 10,
              marginTop: 2,
              minWidth: 220,
              boxShadow: '0 1px 6px #1976d210',
              fontSize: 15,
              color: '#1976d2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
              maxWidth: 340,
              wordBreak: 'break-all',
            }}>
              <div style={{ fontWeight: 600, color: '#1976d2', marginBottom: 2 }}>
                {files.length} file{files.length > 1 ? 's' : ''} selected:
              </div>
              {Array.from(files).map((file, idx) => (
                <div key={file.name + idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#90caf9', fontSize: 18 }}>📄</span>
                  <span style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block' }}>{file.name}</span>
                </div>
              ))}
            </div>
          )}
          <button onClick={onsubmit} style={{ marginTop: 8, marginBottom: 18, padding: '8px 24px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Submit</button>
        </div>
        {loading && <div style={{ textAlign: 'center', color: '#1976d2', marginBottom: 10 }}>Comparing files, please wait...</div>}
        {error && <div style={{ color: '#d32f2f', margin: 8, textAlign: 'center' }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default XMLcompare;

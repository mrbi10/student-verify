import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [regNo, setRegNo] = useState('');
  const [dob, setDob] = useState('');
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(rawData => {
        const cleanedData = rawData.map(record => {
          const cleaned = {};
          for (let key in record) {
            cleaned[key.trim()] = typeof record[key] === 'string' ? record[key].trim() : record[key];
          }
          return cleaned;
        });
        setData(cleanedData);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedInputDob = new Date(dob).toISOString().split('T')[0]; // "YYYY-MM-DD"
    
    const match = data.find(item =>
      String(item['Registration No.']).trim().toLowerCase() === regNo.trim().toLowerCase() &&
      String(item['D.O.B']).trim() === formattedInputDob
    );

    if (match) {
      setResult(match);
      setError('');
    } else {
      setResult(null);
      setError('No matching record found.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>IV CSE PLACEMENT DATA</h1>
        <h3>BATCH 2022-2026</h3>
        <p className="subtitle">Enter your details to view your record</p>
      </header>

      <form onSubmit={handleSubmit} className="lookup-form">
        <div className="form-group">
          <label>Register Number</label>
          <input
            value={regNo}
            onChange={e => setRegNo(e.target.value)}
            placeholder="Enter your Reg. No"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify</button>
        {error && <p className="error">{error}</p>}
      </form>

      {result && (
        <div className="result-card">
          <h2>{result['Name']}</h2>
          <div className="info-grid">
            <p><strong>Reg No:</strong> {result['Registration No.']}</p>
            <p><strong>DOB:</strong> {result['D.O.B']}</p>
            <p><strong>Gender:</strong> {result['Gender (M/F)']}</p>
            <p><strong>X %:</strong> {result['X %']}</p>
            <p><strong>XII %:</strong> {result['XII %']}</p>
            <p><strong>Diploma %:</strong> {result['Diploma%']}</p>
            <p><strong>UG CGPA:</strong> {result['UG (CGPA upto 5th sem)']}</p>
            <p><strong>Arrears:</strong> {result['History of Arrears']}</p>
            <p><strong>Backlogs:</strong> {result['No.of. Backlogs']}</p>
            <p><strong>Mobile:</strong> {result['Mobile']}</p>
            <p><strong>Email:</strong> {result['Email-id']}</p>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a
              href="https://forms.gle/xmdwpqagSqFqFh3p7"
              target="_blank"
              rel="noopener noreferrer"
              className="report-link"
            >
              Found an issue in your data? Report it here →
            </a>
          </div>
          <footer className="footer">
            <p>Made with 💙 by <strong>Mrbi</strong></p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;

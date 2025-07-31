import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [regNo, setRegNo] = useState('');
  const [dob, setDob] = useState('');
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load student data.');
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setError('Failed to load student data.'));
  }, []);

  const handleVerify = () => {
    const student = data.find(
      (s) =>
        s['Registration No.']?.toString().trim() === regNo.trim() &&
        s['D.O.B']?.trim() === dob.trim()
    );

    if (student) {
      setResult(student);
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
        <h3>Batch 2022-2026</h3>
        <p className="subtitle">Verify using Register Number and Date of Birth</p>
      </header>

      <div className="lookup-form">
        <div className="form-group">
          <label htmlFor="regNo">Register Number</label>
          <input
            id="regNo"
            type="text"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Enter Register Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth (DD-MM-YYYY)</label>
          <input
            id="dob"
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="Enter Date of Birth"
          />
        </div>

        <button onClick={handleVerify}>Verify</button>

        {error && <div className="error">⚠️ {error}</div>}
      </div>

      {result && (
        <div className="result-card">
          <h3>Student Found</h3>
          <div className="info-grid">
            {Object.entries(result).map(([key, value]) => (
              <div key={key}>
                <strong>{key}</strong><br />
                <span>{value}</span>
              </div>
            ))}
          </div>
            <div className="report-link">
       <a
  href="https://forms.gle/8ymTQrhMxT7sJmpG7"
  target="_blank"
  rel="noreferrer"
  className="text-blue-600 hover:underline text-sm mt-4 block"
>
  📩 Report an Issue
</a>

      </div>
          <div className="footer">
        <p>
          Developed by <strong>Mrbi💙</strong>
        </p>
      </div>
        </div>
      )}

      
    </div>
  );
}

export default App;

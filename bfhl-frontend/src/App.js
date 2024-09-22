import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const parsedInput = JSON.parse(jsonInput);
      
      const res = await fetch('http://localhost:3000/bfhl', { // Updated to port 3001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
  
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error in API call:', error);
      alert('Failed to submit: ' + error.message);
    }
  };
  
  

  return (
    <div className="container">
      <h1>API Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter valid JSON here"
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>

      <div className="multi-filter">
        <h2>Multi Filter</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="numbers">Numbers</option>
          <option value="alphabets">Alphabets</option>
        </select>
      </div>

      {response && (
        <div className="response-box">
          {filter === 'numbers' && (
            <div>
              <h3>Numbers:</h3>
              <p>{response.numbers.join(', ')}</p>
            </div>
          )}
          {filter === 'alphabets' && (
            <div>
              <h3>Alphabets:</h3>
              <p>{response.alphabets.join(', ')}</p>
            </div>
          )}
          {filter === 'all' && (
            <div>
              <h3>Response:</h3>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

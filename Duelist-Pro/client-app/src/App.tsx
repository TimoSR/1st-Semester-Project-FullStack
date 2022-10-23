import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [activities, setActivies] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7032/api/Activities').then(response => {
      console.log(response);
      setActivies(response.data)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {activities.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

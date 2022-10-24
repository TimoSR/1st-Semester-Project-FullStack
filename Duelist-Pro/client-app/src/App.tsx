import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [activities, setActivies] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7032/api/Activities').then(response => {
      console.log(response);
      setActivies(response.data)
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Duelist Pro'/>
        <List>
        {activities.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
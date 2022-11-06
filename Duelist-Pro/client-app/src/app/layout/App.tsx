import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import Navbar from './Navbar';

function App() {

  /** Creating a hook for the activities */

  const [activities, setActivies] = useState<IActivity[]>([]);

  /** HTTP request for the Activites in the backend */

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:7032/api/Activities').then(response => {
      //console.log(response);
      setActivies(response.data)
    })
  }, [])

  return (
    <div>
      {/** Using semantic ui for handling website layout */}
      <Navbar />
      <Container style = {{marginTop: '7em'}}>
        {/** Listing the array received from the backend */}
        <List>
          {activities.map((activity) => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))}
          </List>
      </Container>
    </div>
  );
}

export default App;
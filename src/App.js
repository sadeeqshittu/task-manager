import React from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import ProjectDetail  from './pages/ProjectDetails';
import {ProjectProvider} from './projectContext';
import {
 BrowserRouter as Router,
 Switch,
 Route
} from 'react-router-dom';

import firebase from './Firebase/Firebase';


function App(props) {
  return (
  <ProjectProvider>
    <Router>
         <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/project/:id'>
                <ProjectDetail />
          </Route>
          <Route path= '/today/' component={Home}/>
          </Switch>
    </Router>
    </ProjectProvider>
  );
}

export default App;

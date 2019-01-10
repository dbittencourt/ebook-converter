import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AboutPage from './containers/AboutPage';
import BookPage from './containers/BookPage';
import Callback from './containers/Callback';
import HomePage from './containers/HomePage';


class App extends React.Component {
  public render() {
    return (
        <div className="App">
          <Navbar />
          <main>
            <Switch>
              <Route path='/' exact={true} component={HomePage} />
              <Route path='/home' component={HomePage}/>
              <Route path='/about' component={AboutPage} />
              <Route path='/books'component={BookPage} />
              <Route path='/callback' component={Callback} />
            </Switch>
        </main>
      </div>
    );
  }
}

export default App;

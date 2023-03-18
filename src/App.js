import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './components/pages/Home'

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route path={'/'} component={Home}></Route>
          </Switch>
        </Layout >
      </Router>
    </div>
  );
}

export default App;

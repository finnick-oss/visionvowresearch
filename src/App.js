import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './statics/Header';
import Footer from './statics/Footer';
import Home from './statics/Home';
import AboutUs from './statics/AboutUs';
import Dashboard from './statics/Dashboard';
import ContactUs from './statics/ContactUs';
import CompletedPage from './status/CompletedPage';
import TerminatePage from './status/TerminatePage';
import QuotaFullPage from './status/QuotaFullPage';
import AdminDashboard from './statics/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />714
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/contactus" component={ContactUs} />         
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/redirect/complete" exact render={(props) => <CompletedPage {...props} />} />
            <Route path="/redirect/terminate" exact render={(props) => <TerminatePage {...props} />} />
            <Route path="/redirect/quotafull" exact render={(props) => <QuotaFullPage {...props} />} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

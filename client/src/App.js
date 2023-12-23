import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import {BrowserRouter ,Route} from 'react-router-dom'
import Productdescription from './screens/Productdescription';
import Cartscreen from './screens/Cartscreen';
import Registrationscreen from './screens/Registrationscreen';
import Loginscreen from './screens/Loginscreen';
import Ordersscreen from './screens/Ordersscreen';
import Orderinfo from './screens/Orderinfo';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
       <Navbar/>
       <BrowserRouter>
       <Route path='/' component={Homescreen} exact/>
       <Route path='/product/:id' component={Productdescription} exact/>
       <Route path='/cart' component={Cartscreen} exact />
       <Route path='/register' component={Registrationscreen} />
       <Route path='/Login' component={Loginscreen} exact><Loginscreen/></Route>
       <Route path='/orders' component={Ordersscreen}/>
       <Route path='/orderinfo/:orderid' component={Orderinfo}/>
       <Route path='/profile' component={Profilescreen}/>
       <Route path='/admin' component={Adminscreen}/>
       </BrowserRouter>
       <Footer/>
    </div>
  );
}

export default App;

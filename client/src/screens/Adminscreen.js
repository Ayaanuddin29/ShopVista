import React from 'react'
import {Link} from 'react-router-dom'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Userslist from './Userslist'
import Productlist from './Productlist'
import Addproduct from './Addproduct'
import Orderslist from './Orderslist'
import Editproduct from './Editproduct'
export default function Adminscreen() {
  return (
    <div>
      <div className='row justify-content-center mt-5 w-10'>
        <div className='col-md-10'>
        <h2>Admin Panel</h2>
           <ul className='admin p-3'>
            <li><Link to='/admin/userlist'>UserList</Link></li>
            <li><Link to='/admin/productlist'>ProductList</Link></li>
            <li><Link to='/admin/addnewproduct'>AddNewProduct</Link></li>
            <li><Link to='/admin/orderslist'>OrderList</Link></li>
           </ul>
           <Switch>
            <Route path='/admin/userlist' component={Userslist}/>
            <Route path='/admin/productlist' component={Productlist}/>
            <Route path='/admin/addnewproduct' component={Addproduct}/>
            <Route path='/admin/orderslist' component={Orderslist}/>
            <Route path='/admin/editproduct/:productid' component={Editproduct}/>
           </Switch>
        </div>
      </div>
    </div>
  )
}

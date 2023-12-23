import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../screens/actions/userActions'
export default function Navbar() {
  const cartreducer=useSelector(state=>state.cartReducer)
  const {cartItems}=cartreducer||{}
  const currentUser=JSON.parse(localStorage.getItem('currentUser'))
  const dispatch=useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-sm float">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><img style={{width:'50px'}} src="shopvista-removebg-preview.png"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i className='fas fa-bars' style={{color:'white'}}></i></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <div className='navbar-nav ms-auto'>
       {currentUser?(
      <div className="dropdown">
  <button className="btn dropdown-toggle" type="button" aria-haspopup='true' id='dropdownMenuButton' data-toggle="dropdown" aria-expanded="false">
    {currentUser.name}<i className='fa fa-user'/>
  </button>
  <ul class="dropdown-menu w-25 m-auto" aria-labelledby='dropdownMenuButton'>
    <a className="dropdown-item" href="/profile">Profile</a>
    <a className="dropdown-item" href="/orders">Orders</a>
    <li className="dropdown-item" href="/logout" onClick={()=>{(dispatch(logoutUser()))}}>LogOut</li>
  </ul>
</div>
    ):(
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/Login">Login</a>
        </li>
       )}
       
       <li className="nav-item">
          <a className="nav-link active" href="/cart"><i class='fas fa-shopping-cart'>{cartItems.lenght}</i>{cartItems.length}</a>
        </li>
       </div>
     
       
 
    </div>
  </div>
</nav>
    </div>
  )
}

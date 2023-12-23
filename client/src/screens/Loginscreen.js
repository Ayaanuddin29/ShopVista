import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from './actions/userActions';
import Error from '../components/Error';
import Loader from '../components/Loader';
export default function Loginscreen() {
  // const registerstate=useSelector(state=>state.registerNewUserReducer)
    
    const [email,setemail]=useState('');
    const loginreducer=useSelector(state=>state.loginReducer)
    const {loading,error}=loginreducer
    const [password,setpassword]=useState('');
    const dispatch=useDispatch()
    function Login(e){
        e.preventDefault()
        const user={
            email:email,
            password:password
        }
        dispatch(loginUser(user))
    }
    useEffect(()=>{
      if(localStorage.getItem('currentUser')){
        window.location.href="/"
      }
    })
  return (
    <div>
      <div className='row justify-content-center '>
        <div className='col-md-4 card p-5 shadow  mb-5 bg-white rounded' style={{marginTop:'150px'}}>
            <div className='div'>
                <h2>Login <i className='fa fa-sign-in'></i></h2> 
                {error && <Error error={'invalid credentials'}/>}
                {loading&&<Loader/>}
                <form onSubmit={Login}>
               
                <input type='email' placeholder='enter the email' className='form-control' required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type='password' placeholder='enter the password' className='form-control' required value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
               
                <button type='submit'
                 className='btn mt-3 mb-3' >Login</button>
                </form>
                <a style={{color:'black',textDecoration:'none'}} href='/register'>Click here to Register</a>
            </div>
        </div>
      </div>
    </div>
  )
}

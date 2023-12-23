import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { registerNewUser } from './actions/userActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
export default function Registrationscreen() {
  // const registerstate=useSelector(state=>state.registerNewUserReducer)
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [cpassword,setcpassword]=useState('');
    const registerstate=useSelector(state=>state.registerNewUserReducer)
    const {loading,error}=registerstate
    const dispatch=useDispatch()
    function register(e){
        e.preventDefault()
        const user={
            name:name,
            email:email,
            password:password
        }
        if(password==cpassword){
    dispatch(registerNewUser(user))
        }
        else{
            alert('password not matched')
        }
    }
  return (
    <div>
      <div className='row justify-content-center '>
        <div className='col-md-5 card p-5 shadow  mb-5 bg-white rounded' style={{marginTop:'150px'}}>
            <div className='div'>
                <h2>Register<i className='fa fa-user-plus'/></h2>
                {error&&<Error error={'Already Existing user'}/>}
                {loading&&<Success Success={'Your Registration is Successfull'}/>}
                <form onSubmit={register}>
                <input type='text' placeholder='enter the name' className='form-control' required value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <input type='email' placeholder='enter the email' className='form-control' required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type='password' placeholder='enter the password' className='form-control' required value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <input type='password' placeholder='enter the email' className='form-control' required value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                <button type='submit'
                 className='btn mt-3 mb-4' >Register</button>
                </form>
                <a style={{color:'black',textDecoration:'none'}} href='/login'>Click Here to login</a>
            </div>
        </div>
      </div>
    </div>
  )
}

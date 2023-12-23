import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../components/Error';
import { updateUser } from './actions/userActions';
import Loader from '../components/Loader';
import Success from '../components/Success';

export default function Profilescreen() {
    const loginstate=useSelector(state=>state.loginReducer)
    const updateuserstate=useSelector(state=>state.updateReducer);
    const currentUser=loginstate.currentUser;
    const {error,success,loading}=updateuserstate
    const [name,setname]=useState(currentUser.name)
    const [email,setemail]=useState(currentUser.email);
    const [password,setpassword]=useState('');
    const [cpassword,setcpassword]=useState('');
    const dispatch=useDispatch();
    function update(e){
        e.preventDefault();
        if(password==cpassword){
    const updateuser={
        name:name,
        email:email,
        password:password,
    };
    dispatch(updateUser(currentUser._id,updateuser))
    }
    else{
        alert('password not matched')
    }
}
  return (
    <div>
       <div className='row justify-content-center '>
        <div className='col-md-5 card p-5' style={{marginTop:'150px'}}>
            <div className='div'>
                <h2>Update</h2>
                {loading &&<Loader/>}
                {error&&<Error error={'something went wrong'}/>}
                {success && <Success success={'updated Successfully'}/>}
                <form onSubmit={update}>
                <input type='text' placeholder='enter the name' className='form-control' required value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <input type='email' placeholder='enter the email' className='form-control' required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type='password' placeholder='enter the password' className='form-control' required value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <input type='password' placeholder='confirm the password' className='form-control' required value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
                <button type='submit'
                 className='btn mt-3' >Update</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

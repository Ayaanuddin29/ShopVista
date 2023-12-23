import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getAllUsers } from './actions/userActions';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { deleteUser } from './actions/userActions';
export default function Userslist() {
  const getallusersstate=useSelector(state=>state.getAllUsersReducer)
  const {users,loading,error}=getallusersstate
  const dispatch=useDispatch();
 
  useEffect(()=>{
    dispatch(getAllUsers())
  },[])
  return (
    <div className='table-responsive'>
      <table className='table table-bordered table-responsive table-hover'>
        <h2 className='text-center'>Users List</h2>
        <tr>
          <th>UserId</th>
          <th>Name</th>
          <th>Email</th>
          <th>Delete</th>
        </tr>
        <tbody>
          {loading && <Loader/>}
          {error && <Error error={'something went wrong'}/>}
          {users && (users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><i className='far fa-trash-alt' onClick={()=>{dispatch(deleteUser(user._id))}}></i></td>
            </tr>
          }))}
        </tbody>
      </table>
    </div>
  )
}

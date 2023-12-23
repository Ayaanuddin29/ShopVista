import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import Error from '../components/Error';
import {Link} from 'react-router-dom'
import { getAllProducts,deleteProduct } from './actions/productActions';
export default function Productlist() {
  const getallproductsstate=useSelector(state=>state.getAllProductsReducers)
  const {loading,error,products}=getallproductsstate;
  const dispatch=useDispatch();
  useEffect(()=>{
     dispatch(getAllProducts())
  },[])
  return (
    <div>
    <h2>Productlist</h2>
    <div className='table-responsive'>
     <table className='table table-bordere table-responsive'>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Id</th>
        <th>Actions</th>
      </tr>
      <tbody>
      {loading &&<Loader/>}
     {error &&<Error error={'something went wrong'}/>}
     {products && (products.map(product=>{
      return <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.countInStock}</td>
        <td>{product._id}</td>
        <td><i className='far fa-trash-alt' style={{'marginRight':'10px'}} onClick={()=>{dispatch(deleteProduct(product._id))}}/>
        <Link  to={`/admin/editproduct/${product._id}`}><i className='fas fa-edit'></i></Link>
        </td>
      </tr>
     }))}
      </tbody>
     </table>
     </div>
    </div>
  )
}

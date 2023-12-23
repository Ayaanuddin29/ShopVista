import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Product from '../components/Product';
import {useDispatch} from 'react-redux'
import {  useSelector } from 'react-redux'
import { getAllProducts } from './actions/productActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Filter from '../components/Filter';
export default function Homescreen() {
  const getallproductsstate=useSelector((state)=>state.getAllProductsReducers)
  
  const {loading,products,error}=getallproductsstate||{};

  const dispatch=useDispatch()
  useEffect(()=>{
  
    dispatch(getAllProducts());
},[])
  return (
    <div>
    <Filter/>
      <div className='row justify-content-center ms-2 mx-2'>
       {loading?(
        <Loader/>
        ):error?(
          <Error error='something went wrong....'/>
          ):
          (
           products.map(product=>{
            return <div className='col-md-3 m-2 p-2 shadow mb-5 bg-white rounded shadow p-1 mb-5 bg-white rounded card'>
              <Product product={product}/>
            </div>
           })
          )}
      </div>
    </div>
  )
}

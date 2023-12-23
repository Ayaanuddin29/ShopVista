import React, { useEffect,useState } from 'react'
import { getProductById, updateProduct } from './actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

export default function Editproduct({match}) {
  const [name,setname]=useState('');
  const [price,setprice]=useState();
  const [countinstock,setcountinstock]=useState();
  const [imgurl,setimgurl]=useState('');
  const [category,setcategory]=useState('');
  const [description,setdescription]=useState('')
  const dispatch=useDispatch();
  function editproduct(e){
    e.preventDefault();
       const updatedproduct={
        name:name,
        price:price,
        description:description,
        countInStock:countinstock,
        image:imgurl,
        category:category
       }
       dispatch(updateProduct(match.params.productid,updatedproduct))
  }
    const productstate=useSelector((state)=>state.getProductByIdReducer)
    const {product,error,loading}=productstate||{};
    const updatedproductstate=useSelector(state=>state.updateProductReducer)
    const {success,updateerror,updateloading}=updatedproductstate
    useEffect(()=>{
      if(product){
        if(product._id==match.params.productid){
          setname(product.name);
          setprice(product.price);
          setdescription(product.description);
          setimgurl(product.image);
          setcategory(product.category);
          setcountinstock(product.countinstock);
           }
           else{
           dispatch(getProductById(match.params.productid)) 
           }
        }
      else{
        dispatch(getProductById(match.params.productid))
      }
      },[dispatch,product])
  return (
    <div>
       <h2>Edit Product</h2>
       {loading&&<Loader/>}
       {updateloading && <Loader/> }
       {updateerror && <Error error={'something went wrong'}/> }
       {success && <Success success={'product updated successfully'}/>}
       {error &&<Error error='something went wrong'/> }
       {product&&(<div>
         
        <form onSubmit={editproduct}>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the name of the product' required value={name} onChange={(e)=>setname(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the price of the product' required value={price} onChange={(e)=>setprice(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the description of the product' required value={description} onChange={(e)=>setdescription(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='Drop the image URL' required value={imgurl} onChange={(e)=>setimgurl(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the category of the product' required value={category} onChange={(e)=>setcategory(e.target.value)}/>
            <input type='text' className='form-control mb-2 mr-sn-2' placeholder='enter the countinstock of the product' required value={countinstock} onChange={(e)=>setcountinstock(e.target.value)}/>
           
           <button className='btn mt-5' type='submit' style={{float:'left'}}>
          Edit Product
           </button></form>

       </div>)}
      </div>
  )
}

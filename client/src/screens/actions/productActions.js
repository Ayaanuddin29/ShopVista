import axios from "axios";
export const getAllProducts=()=>dispatch=>{
   
    dispatch({type:"GET_PRODUCTS_REQUEST"})

    axios.get('/api/product/getallproduct').then(res=>{
        console.log(res);
       dispatch({type:'GET_PRODUCTS_SUCCESS',payload:res.data})
    })
       .catch(err=>{
        console.log(err);
        dispatch({type:"GET_PRODUCTS_FAILED",payload:err})
      })
}

export const getProductById=(productid)=>(dispatch)=>{
   
  dispatch({type:"GET_PRODUCTBYID_REQUEST"})

  axios.post('/api/product/getproductbyid',{productid}).then(res=>{
      console.log(res);
     dispatch({type:'GET_PRODUCTBYID_SUCCESS',payload:res.data})
  })
     .catch(err=>{
      console.log(err);
      dispatch({type:"GET_PRODUCTBYID_FAILED",payload:err})
    })
}

export const filterProducts=(searchkey,sort,category)=>dispatch=>{
  var filterproducts ;
  dispatch({type:'GET_PRODUCTS_REQUEST'});
   axios.get('/api/product/getallproduct').then(res=>{
    filterproducts=res.data
        if(searchkey){
            filterproducts=res.data.filter(product=>{
              return product.name.toLowerCase().includes(searchkey)
            })
            if(sort!='popular'){
              if(sort==='htl'){
                filterproducts=res.data.sort((a,b)=>{
                  return -a.price + b.price
                })
              }
                else{
                  filterproducts=res.data.sort((a,b)=>{
                    return +a.price - b.price;
                  })
                
              }
            }
        }
        if(category!='all'){
          filterproducts=res.data.filter(product=>{
            return product.category.toLowerCase().includes(category);
          })
        }
        dispatch({type:"GET_PRODUCTS_SUCCESS",payload:filterproducts})
   }).catch(err=>{
    dispatch({type:"GET_PRODUCTS_FAILED"})
   })
}

export const addProductReview=(review,productid)=>(dispatch,getState)=>{
  dispatch({type:'ADD_PRODUCT_REVIEW_REQUEST'})
  const currentUser=getState().loginReducer.currentUser
  axios.post('/api/product/addreview',{review,productid,currentUser}).then(res=>{
    console.log(res);
    dispatch({type:"ADD_PRODUCT_REVIEW_SUCCESS"})
    alert('your review added successfully');
    window.location.href='/'
  }).catch(err=>{
    dispatch({type:"ADD_PRODUCT_REVIEW_FAILED"})
  })
}

export const deleteProduct=(productid)=>dispatch=>{
  dispatch({type:"DELETE_PRODUCT_REQUEST"});
  axios.post('/api/product/deleteproduct',{productid}).then(res=>{
   dispatch({type:"DELETE_PRODUCT_SUCCESS",payload:res.data})
   alert('PRODUCT Deleted Successfully');
   window.location.reload();
  }).catch(err=>{
   dispatch({type:"DELETE_PRODUCT_FAILED",payload:err})
  })
}

export const addProduct=(product)=>dispatch=>{
  dispatch({type:'ADD_PRODUCT_REQUEST'});
  axios.post('/api/product/addproduct',{product}).then(res=>{
    console.log(res)
    dispatch({type:"ADD_PRODUCT_SUCCESS"})
    window.location.reload();
  }).catch(err=>{
    dispatch({type:'ADD_PRODUCT_FAILED'})
  })
  
}

export const updateProduct=(productid,updatedproduct)=>dispatch=>{
  dispatch({type:'UPDATE_PRODUCT_REQUEST'});
  axios.post('/api/product/updateproduct',{productid,updatedproduct}).then(res=>{
    console.log(res)
    dispatch({type:"UPDATE_PRODUCT_SUCCESS"})
    window.location.href='/admin/productslist'
  }).catch(err=>{
    dispatch({type:'UPDATE_PRODUCT_FAILED'})
  })
  
}
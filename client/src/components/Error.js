import React from 'react'

export default function Error({error}) {
  return (
    <div>
      <div class="alert alert-danger text-center m-auto m-5" style={{width:'450px',height:'100px'}} role="alert">
 {error}
</div>
    </div>
  )
}

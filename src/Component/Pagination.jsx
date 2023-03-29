import React from 'react';

const Paginatiion = ({pagenation,paginate}) => {

  const pageNumber = [];

  for(let i =1; i<= Math.ceil(pagenation/10); i++){
    pageNumber.push(i)
  }

    const prevPage = () =>{
        console.log('PrevPage')
    }

    const nextPage = ()=>{
        console.log('next')
    }

  return (
    <>
    <ul className='paginatiion'>
      
    </ul>
    </>
  )
}

export default Paginatiion

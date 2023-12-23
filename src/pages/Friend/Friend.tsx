import React from 'react'
import { useState } from 'react';

const Friend = () => {
  const [mount,setMount] = useState(0);
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
    <div className="w-[800px]  h-[500px] ml-[200px] rounded-xl  overflow-y-auto" style={{ border:"1px solid #eeeeee"}}>
      <div className='w-full h-[30px]  flex ' style={{ borderBottom:"1px solid #eeeeee", position:"sticky", top:"0px"}}>
      <div
    className={`w-[50%]  font-bold cursor-pointer rounded-tl-xl ${mount === 0 ? 'bg-[#e5e5e5] text-white' : 'bg-white'}`}
    style={{ borderRight: "1px solid #eeeeee" }}
    onClick={() => setMount(0)}
  >
    <p>Danh sách bạn bè</p>
  </div>
  <div
    className={`w-[50%] font-bold cursor-pointer rounded-tr-xl ${mount === 1 ? 'bg-[#e5e5e5] text-white' : 'bg-white'}`}
    onClick={() => setMount(1)}
  >
    <p>Danh sách người gửi lời mời</p>
  </div>
      </div>
      {mount === 0 ? <div>
        <div className='w-full h-[50px]  flex ' style={{ borderBottom:"1px solid #eeeeee"}}>
       
       <div className='w-[100%]  cursor-pointer text-center'>  <p>Danh sách người gửi lời mời</p></div> 
       
    </div>
  
    
      </div> : <div className='w-full h-[30px]  flex ' style={{ borderBottom:"1px solid #eeeeee"}}>
       
       <div className='w-[100%]  cursor-pointer text-center'>  <p>Danh sách người gửi lời mời 1</p></div> 
    </div>}
    </div>
  </div>
  )
}

export default Friend

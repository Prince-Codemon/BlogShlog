import React, { useEffect, useState } from 'react'
import { IoCloudOfflineOutline, IoReload } from "react-icons/io5";

const OfflineMode = ({children}) => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        if(navigator.onLine) {
            setIsOffline(false);
        } else {
            setIsOffline(true);
        }
    },[])
  return (
    <>
      {!isOffline && children}
      {isOffline && (
        <div className="w-full min-h-[80vh] text-center  flex items-center justify-center bg-indigo-100 ">
          <div className="flex min-w-[300px]  justify-center items-center flex-col gap-4 rounded-md bg-white p-4 border-1 border-indigo-400">
            <IoCloudOfflineOutline className="text-9xl font-bold text-indigo-600" />
            <h1 className="text-3xl text-indigo-600">You are offline</h1>
            <p className="text-indigo-400">Please check your internet connection</p>

            <button onClick={() =>      {
                if(navigator.onLine) {
                    setIsOffline(false);
                }
                
            }} className='bg-indigo-600 text-white px-4 py-2 flex gap-2 rounded-md justify-between items-center '>
              <IoReload className="text-lg text-white" />
              Retry
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default OfflineMode
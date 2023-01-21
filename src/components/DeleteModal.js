import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";

import { BiErrorCircle } from "react-icons/bi";




export default function Modal({id, deleteBlog}) {

    
  
    


     

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        type="button"
        data-modal-target="editUserModal"
        data-modal-show="editUserModal"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 md:px-5 md:py-2.5  text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 gap-2
                    "
        onClick={() => setShowModal(true)}
      >
        <AiOutlineDelete /> Delete
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <AiOutlineCloseCircle />
                </button>

                <div className="relative p-6 flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-col items-center justify-center">
                    <BiErrorCircle className="text-5xl text-red-500" />
                  </div>
                  <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                    Delete Blog
                  </h3>
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure you want to delete this blog?
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    data-modal-target="editUserModal"
                    data-modal-show="editUserModal"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 md:px-5 md:py-2.5  text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 gap-2
                    "
                    onClick={() => {
                      deleteBlog(id);
                      setShowModal(false);
                    }}
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

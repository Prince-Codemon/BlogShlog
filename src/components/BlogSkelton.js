import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const BlogSkelton = () => {
  return (
    <div className=" flex flex-col px-5 py-20 justify-center items-center mx-auto">
      <Skeleton height={150} width={300} />
      <Skeleton width={300} height={20} className="mb-3" />
      <Skeleton width={300} height={20} className="mb-3" />
      <Skeleton width={300} height={40} className="mb-3" />
    </div>
  );
}

export default BlogSkelton
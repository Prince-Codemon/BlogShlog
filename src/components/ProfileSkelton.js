import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProfileSkelton = () => {
  return (
    <div className='flex flex-col gap-3 py-10'>
        <Skeleton width={100} height={100} className="rounded-full mb-2"/>
        <Skeleton width={200} height={40} className=" mb-2"/>
        <Skeleton width={200} height={40} className=" mb-2"/>
        <Skeleton width={200} height={40} className=" mb-2"/>
    </div>
  );
}

export default ProfileSkelton
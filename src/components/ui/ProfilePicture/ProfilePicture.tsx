import React from "react";

import Image, { ImageProps } from 'next/image'
import css from "./ProfilePicture.module.css"
import ProfilePlaceholder from './assets/profile-placeholder.png'

const ProfilePicture = ({ ...rest }: ImageProps) => {
   const src = rest.src || ProfilePlaceholder
   
   return (
      <div className={css.profilePicture} >
         <Image  {...rest} height={54} width={54} src={src} alt="Profile Picture" />
      </div>
   )
}

export default ProfilePicture
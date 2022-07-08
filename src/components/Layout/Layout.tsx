import React from "react";

import css from "./Layout.module.css"
interface PropTypes {
  children: JSX.Element
}
const Layout = ({children}: PropTypes) => {
  const year = new Date().getFullYear()

  return (
    <>
      <div className={css.container}>
      {children}
      </div>
      <footer className={css.footer}>
        &copy; leboncoin - {year}
      </footer>    
    </>
  )
} 

export default Layout

import React from "react";

import css from "./Message.module.css"

interface PropTypes{
  content: string
  date: string
  isSender: boolean
}
const Message = ({ content, date, isSender }: PropTypes) => {
  return (
    <div className={css.root} style={isSender ? {marginLeft: "auto"} : {marginRight:"auto"}}>
      <p className={`${css.content} ${isSender ? css.contentSender : css.contentRecipient}`}>
        {content}
      </p>
      <p className={css.date}>
        {date}
      </p>
    </div>
  )
} 

export default Message

import React, { useEffect } from "react";
import Image from 'next/image'

import css from "./InputMessage.module.css"
import { useCreateMessage } from "../../hooks/api/useCreateMessage";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import sendArrow from './assets/send-arrow.svg'

interface PropTypes{
  conversationId: number
}

const InputMessage = ({ conversationId, ...rest }: PropTypes) => {
  const [message, setMessage] = React.useState("")  

  const loggedUserId = getLoggedUserId()

  const { mutate: sendMessage, isSuccess, isError } = useCreateMessage({key: "messages", id: conversationId})
  
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    sendMessage({ body: message, timestamp: Date.now(), conversationId: conversationId, authorId: loggedUserId })
  }

  useEffect(() => {
    if (isSuccess) {
      setMessage("")
    }
  }, [isSuccess])

   return (
     <div className={css.root}>
     <p className={css.safetyGuard}>
       Please, be careful about the information you send
     </p>
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" placeholder="Ecrivez un message..." value={message} onChange={e => setMessage(e.target.value)} className={css.input}/>
        <button type="submit" className={css.submitMobileIcon}>
          <Image src={sendArrow} alt="Send message" height={30} width={30} />
        </button>
        <button type="submit" className={css.submitDesktopButton}>
          Send messages
          <Image src={sendArrow} alt="Send message" height={20} width={20} />
        </button>
      </form>
      {
        isError && (
          <div className={css.error}>
            <p>
              An error occured while sending the message.
            </p>
          </div>
        )
      }
     </div>
   )
} 

export default InputMessage

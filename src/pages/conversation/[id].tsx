import { FC, useEffect, useRef } from 'react'
import styles from '../../styles/Conversation.module.css'
import { useRouter } from 'next/router'
import useGetMessages from '../../hooks/api/useGetMessages'
import Link from 'next/link'
import InputMessage from '../../components/InputMessage/InputMessage'
import Message from '../../components/Message/Message'
import { getLoggedUserId } from '../../utils/getLoggedUserId'
import { getUSDateFromTimeStamp } from '../../utils/date'
import React from 'react'
import Head from 'next/head'

const Conversation: FC = () => {
  const router = useRouter()
  const { id } = router.query
  const loggedUserId = getLoggedUserId()

  const lastMessageRef = useRef<HTMLDivElement>(null)
  
  const parseInt = Number(id)

  const {data: messages, isSuccess, isError } = useGetMessages(parseInt)

  useEffect(() => {
   if (lastMessageRef.current) {
     lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
   }
  }, [messages])

  return (
    <div className={styles.conversationPage}>
      <Head>        
        <title>Conversation</title>
        <meta name="description" content="Your conversation"></meta>
      </Head>
      <header className={styles.header}>
      <Link href="/">
        <a>
          {"←"}&nbsp;&nbsp;Back to conversations
        </a>
      </Link>
      </header>
      <section className={styles.messages}>
        {messages?.map((message, index) => 
          {
            return (
              <div className={styles.message} key={message.id} ref={index === messages.length - 1 ? lastMessageRef : undefined}>
                <Message 
                  content={message.body} 
                  date={getUSDateFromTimeStamp(message.timestamp)} 
                  isSender={message.authorId === loggedUserId} 
                />
              </div>
            )
          }
        )}
        {isSuccess && messages.length === 0 && (
          <div className={styles.noResults}>
            <p>
              No message <br/>
              Use the form below to send a message
            </p>
          </div>
        )}
        {isError && (
          <div className={styles.error}>
            <p>
              Oops ! It looks like there was a problem<br/>
              Please try again later.
            </p>
          </div>
        )}
      </section>
      {isSuccess && (
        <section className={styles.input} >
          <InputMessage conversationId={parseInt}/>
        </section>
      )}
    </div>
  )
}

export default Conversation
import { FC, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../assets/lbc-logo.webp'
import styles from '../styles/Home.module.css'
import useGetConversations from '../hooks/api/useGetConversations'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import ConversationListItem from '../components/ConversationListItem/ConversationListItem'
import NewConversationModal from '../components/NewConversationModal/NewConversationModal'

const Home: FC = () => {
  const loggedUserId = getLoggedUserId()

  const [openNewConversationModal, setOpenNewConversationModal] = useState(false)

  const { data: conversations } = useGetConversations(loggedUserId)

  const reachedUsers = conversations?.map(conversation => conversation.recipientId !== loggedUserId ? conversation.recipientId : conversation.senderId)

  return (
    <div className={styles.indexPage}>
      <Head>        
        <title>Conversations</title>
        <meta name="description" content="Your list of conversations"></meta>
      </Head>

      <div className={styles.header}>
        <Image src={Logo} alt="Leboncoin Frontend Team" width={175} height={54} layout="fixed" />
        <h1 className={styles.title}>
          Your messages
        </h1>
      </div>

      <main className={styles.main}>
        {conversations?.map((conversation) => {
          const nickname = conversation.recipientId === loggedUserId ? conversation.senderNickname : conversation.recipientNickname

          return <ConversationListItem
            key={conversation.id}
            nickname={nickname}
            lastMessageTimestamp={conversation.lastMessageTimestamp}
            conversationId={conversation.id}
          />
        })}
      </main>

      <button className={styles.newConversationButton} onClick={() => setOpenNewConversationModal(true)}>
          +
      </button>
      <NewConversationModal isOpen={openNewConversationModal} closeModal={() => setOpenNewConversationModal(false)} reachedUsers={reachedUsers} />    
      </div>
  )
}

export default Home
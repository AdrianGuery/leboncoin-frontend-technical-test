import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useCreateConversation } from "../../hooks/api/useCreateConversation";
import useGetUsers from "../../hooks/api/useGetUsers";
import { getLoggedUserId } from "../../utils/getLoggedUserId";
import ProfilePicture from "../ui/ProfilePicture/ProfilePicture";

import css from "./NewConversationModal.module.css"

interface PropTypes{
  isOpen: boolean
  closeModal: () => void
  reachedUsers: number[]
}
const NewConversationModal = ({ isOpen, closeModal, reachedUsers }: PropTypes) => {
  const [isMounted, setIsMounted] = React.useState(false)
  const router = useRouter();

  const loggedUserId = getLoggedUserId()
  
  const {data: users, isSuccess} = useGetUsers()

  const { mutateAsync: createConversation } = useCreateConversation({key: "messages"})

  const usersUnreached = users?.filter(user => reachedUsers?.indexOf(user.id) === -1 && user.id !== loggedUserId)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleClick = async (userId: number) => {
    const newConversation = await createConversation({
      recipientId: userId,
      recipientNickname: users?.find(user => user.id === userId)?.nickname,
      senderId: loggedUserId,
      senderNickname: users?.find(user => user.id === loggedUserId)?.nickname,
      lastMessageTimestamp: Date.now(),
    })
    router.push(`/conversation/${newConversation.data.id}`)
  }
  
  return (
    isOpen && isMounted && document ? 
    ReactDOM.createPortal(
    <div className={css.root}>
      <div className={css.overlay} onClick={closeModal}/>
      <div className={css.newConversationForm}>
      <div>
        <div onClick={closeModal} className={css.closeIcon}>X</div>
          <h2 className={css.title}>Create a new conversation</h2>
        </div>
        <hr/>
        {usersUnreached?.map((user, index) => (
        <>
          <div key={index} className={css.user} onClick={() => handleClick(user.id)}>
            <ProfilePicture src={undefined}/>
            <div>{user.nickname}</div>
          </div>
          <hr/>
        </>
        ))}
        {
        usersUnreached?.length === 0 && isSuccess &&
        <div className={css.noUsers}>
          You have already contacted all users 
        </div>
        }
      </div>
    </div>
    ,document.body
    )
    : null)
} 

export default NewConversationModal

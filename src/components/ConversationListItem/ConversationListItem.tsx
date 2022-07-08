import Link from "next/link";
import React from "react";
import { getUSDateFromTimeStamp } from "../../utils/date";
import ProfilePicture from "../ui/ProfilePicture/ProfilePicture";

import css from "./ConversationListItem.module.css"

interface PropTypes{
  nickname: string,
  lastMessageTimestamp: number,
  conversationId: number,
  url?: string
}
const ConversationListItem = ({ nickname, lastMessageTimestamp, conversationId, url }: PropTypes) => {
  const usDate = getUSDateFromTimeStamp(lastMessageTimestamp)

  return (
    <>
     <Link href={`/conversation/${conversationId}`}>
      <a className={css.conversationInList}>
        <ProfilePicture src={url}/>
        <p>
          <b>
            {nickname}
          </b>
        </p>
        <p className={css.date}>
          {usDate}
        </p>
      </a>
     </Link>
      <hr className={css.separator}/>
    </>
  )
} 

export default ConversationListItem

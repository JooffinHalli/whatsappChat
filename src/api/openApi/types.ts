/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

export type Docs = {
  'getStateInstance': {
    path: `getStateInstance`
    get: {
      res: {
        stateInstance: string
      }
    }
  }
  'getSettings': {
    path: `getSettings`
    get: {
      res: {
        wid: string
        countryInstance?: string
        typeAccount?: string
        webhookUrl?: string
        webhookUrlToken?: string
        delaySendMessagesMilliseconds?: number
        markIncomingMessagesReaded?: string
        markIncomingMessagesReadedOnReply?: string
        outgoingWebhook?: string
        outgoingMessageWebhook?: string
        stateWebhook?: string
        incomingWebhook?: string
        deviceWebhook?: string
        statusInstanceWebhook?: string
        sendFromUTC?: string
        sendToUTC?: string
        sharedSession?: string
        proxyInstance?: string
        outgoingAPIMessageWebhook?: string
        enableMessagesHistory?: string
        keepOnlineStatus?: string
      }
    }
  }
  'sendMessage': {
    path: `sendMessage`
    post: {
      body: {
        chatId: string
        message: string
        quotedMessageId?: string
        archiveChat?: string
        linkPreview?: string
      }
      res: {
        idMessage: string
      }
    }
  }
  'receiveNotification': {
    path: `receiveNotification`
    get: {
      res: {
        receiptId: number
        body: {
          typeWebhook?: string
          sendByApi?: boolean
          status?: string
          instanceData?: {
            idInstance: number
            wid: string
            typeInstance: string
          }
          timestamp?: number
          idMessage?: string
          senderData?: {
            chatId: string
            sender: string
            senderName: string
            chatName: string
          }
          messageData?: {
            typeMessage: string
            textMessageData?: {
              textMessage: string
            }
            fileMessageData?: {
              caption?: string
              downloadUrl?: string
              fileName?: string
              jpegThumbnail?: string
              mimeType?: string
            }
          }
        }
      }
    }
  }
  'deleteNotification': {
    path: `deleteNotification/${string}`
    delete: {
      res: {
        result: boolean
      }
    }
  }
};
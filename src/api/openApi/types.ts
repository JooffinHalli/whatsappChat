/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

export type Docs = {
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
          typeWebhook: string
          instanceData: {
            idInstance: number
            wid: string
            typeInstance: string
          }
          timestamp: number
          idMessage: string
          senderData: {
            chatId: string
            sender: string
            senderName: string
          }
          messageData: {
            typeMessage: string
            textMessageData: {
              textMessage: string
            }
          }
        }
      }
    }
  }
  'getStateInstance': {
    path: `getStateInstance`
    get: {
      res: {
        stateInstance: string
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
  'getChatHistory': {
    path: `getChatHistory`
    post: {
      body: {
        chatId: string
        count: number
      }
      res: Array<
        {
          type: string
          timestamp: number
          idMessage: string
          typeMessage: string
          chatId: string
          senderId?: string
          senderName: string
          textMessage: string
        }
      >
    }
  }
};
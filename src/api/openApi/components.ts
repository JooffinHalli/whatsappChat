/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

import { schemas } from './schemas';

export const components = {
  parameters: {
    receiptId: {
      name: 'receiptId',
      in: 'path',
      required: true,
      schema: {
        type: 'integer'
      }
    }
  },
  responses: {
    getStateInstance: {
      content: {
        'application/json': {
          schema: schemas.getStateInstanceRes
        }
      }
    },
    sendMessage: {
      content: {
        'application/json': {
          schema: schemas.sendMessageRes
        }
      }
    },
    receiveNotification: {
      content: {
        'application/json': {
          schema: schemas.receiveNotificationRes
        }
      }
    },
    deleteNotification: {
      content: {
        'application/json': {
          schema: schemas.deleteNotificationRes
        }
      }
    },
    getChatHistory: {
      content: {
        'application/json': {
          schema: schemas.getChatHistoryRes
        }
      }
    },
    Error400: {
      content: {
        'application/json': {
          schema: schemas.ErrorModel
        }
      }
    },
    Error429: {
      content: {
        'application/json': {
          schema: schemas.ErrorModel
        }
      }
    },
    Error466: {
      content: {
        'application/json': {
          schema: schemas.ErrorModel
        }
      }
    },
    Error500: {
      content: {
        'application/json': {
          schema: schemas.ErrorModel
        }
      }
    }
  },
  schemas: {
    sendMessageDto: schemas.sendMessageDto,
    getChatHistoryDto: schemas.getChatHistoryDto,
    getStateInstanceRes: schemas.getStateInstanceRes,
    sendMessageRes: schemas.sendMessageRes,
    receiveNotificationRes: schemas.receiveNotificationRes,
    deleteNotificationRes: schemas.deleteNotificationRes,
    getChatHistoryRes: schemas.getChatHistoryRes,
    ErrorModel: schemas.ErrorModel
  }
} as const;
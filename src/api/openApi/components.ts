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
  responses: {
    receiveNotification: {
      content: {
        'application/json': {
          schema: schemas.receiveNotificationRes
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
    receiveNotificationRes: schemas.receiveNotificationRes,
    sendMessageRes: schemas.sendMessageRes,
    ErrorModel: schemas.ErrorModel
  }
} as const;
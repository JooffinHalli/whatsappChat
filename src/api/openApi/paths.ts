/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

import { components } from './components';

export const paths = {
  'sendMessage': {
    post: {
      operationId: 'sendMessage',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: components.schemas.sendMessageDto
          }
        }
      },
      responses: {
        200: components.responses.sendMessage,
        400: components.responses.Error400,
        429: components.responses.Error429,
        466: components.responses.Error466,
        500: components.responses.Error500
      }
    }
  },
  'receiveNotification': {
    get: {
      operationId: 'receiveNotification',
      responses: {
        200: components.responses.receiveNotification,
        400: components.responses.Error400,
        429: components.responses.Error429,
        466: components.responses.Error466,
        500: components.responses.Error500
      }
    }
  },
  'getStateInstance': {
    get: {
      operationId: 'getStateInstance',
      responses: {
        200: components.responses.getStateInstance,
        400: components.responses.Error400,
        429: components.responses.Error429,
        466: components.responses.Error466,
        500: components.responses.Error500
      }
    }
  },
  'deleteNotification': {
    delete: {
      operationId: 'deleteNotification',
      parameters: [
        components.parameters.receiptId
      ],
      responses: {
        200: components.responses.deleteNotification,
        400: components.responses.Error400,
        429: components.responses.Error429,
        466: components.responses.Error466,
        500: components.responses.Error500
      }
    }
  },
  'getChatHistory': {
    post: {
      operationId: 'getChatHistory',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: components.schemas.getChatHistoryDto
          }
        }
      },
      responses: {
        200: components.responses.getChatHistory,
        400: components.responses.Error400,
        429: components.responses.Error429,
        466: components.responses.Error466,
        500: components.responses.Error500
      }
    }
  }
} as const;
/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

import * as T from 'mst/utils/types';

export const sendMessageDto = {
  chatId: T.str(''),
  message: T.str(''),
  quotedMessageId: T.str_undf(),
  archiveChat: T.str_undf(),
  linkPreview: T.str_undf()
} as const;
/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

import * as T from 'mst/utils/types';

export const getSettingsRes = {
  wid: T.str(''),
  countryInstance: T.str_undf(),
  typeAccount: T.str_undf(),
  webhookUrl: T.str_undf(),
  webhookUrlToken: T.str_undf(),
  delaySendMessagesMilliseconds: T.num_undf(),
  markIncomingMessagesReaded: T.str_undf(),
  markIncomingMessagesReadedOnReply: T.str_undf(),
  outgoingWebhook: T.str_undf(),
  outgoingMessageWebhook: T.str_undf(),
  stateWebhook: T.str_undf(),
  incomingWebhook: T.str_undf(),
  deviceWebhook: T.str_undf(),
  statusInstanceWebhook: T.str_undf(),
  sendFromUTC: T.str_undf(),
  sendToUTC: T.str_undf(),
  sharedSession: T.str_undf(),
  proxyInstance: T.str_undf(),
  outgoingAPIMessageWebhook: T.str_undf(),
  enableMessagesHistory: T.str_undf(),
  keepOnlineStatus: T.str_undf()
} as const;
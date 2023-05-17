/**
*  ...................................................................................
*  . этот файл сгенерирован автоматически при помощи скрипта "npm run api"           
*  . код сгенерирован на основе api.yaml файла, лежащего на удаленном репозитории
*  . репозиторий: https://github.com/JooffinHalli/whatsappChat.git
*  . ветка: main
*  ...................................................................................
*/

export const schemas = {
  sendMessageDto: {
    type: 'object',
    required: [
      'chatId',
      'message'
    ],
    properties: {
      chatId: {
        type: 'string'
      },
      message: {
        type: 'string'
      },
      quotedMessageId: {
        type: 'string'
      },
      archiveChat: {
        type: 'string'
      },
      linkPreview: {
        type: 'string'
      }
    }
  },
  getChatHistoryDto: {
    type: 'object',
    required: [
      'chatId',
      'count'
    ],
    properties: {
      chatId: {
        type: 'string'
      },
      count: {
        type: 'integer'
      }
    }
  },
  getStateInstanceRes: {
    type: 'object',
    required: [
      'stateInstance'
    ],
    properties: {
      stateInstance: {
        type: 'string',
        enum: [
          'notAuthorized',
          'authorized',
          'blocked',
          'sleepMode',
          'starting'
        ]
      }
    }
  },
  getSettingsRes: {
    type: 'object',
    required: [
      'wid'
    ],
    properties: {
      wid: {
        type: 'string'
      },
      countryInstance: {
        type: 'string'
      },
      typeAccount: {
        type: 'string'
      },
      webhookUrl: {
        type: 'string'
      },
      webhookUrlToken: {
        type: 'string'
      },
      delaySendMessagesMilliseconds: {
        type: 'integer'
      },
      markIncomingMessagesReaded: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      markIncomingMessagesReadedOnReply: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      outgoingWebhook: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      outgoingMessageWebhook: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      stateWebhook: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      incomingWebhook: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      deviceWebhook: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      statusInstanceWebhook: {
        type: 'string',
        enum: [
          'yes',
          'no'
        ]
      },
      sendFromUTC: {
        type: 'string'
      },
      sendToUTC: {
        type: 'string'
      },
      sharedSession: {
        type: 'string'
      },
      proxyInstance: {
        type: 'string'
      },
      outgoingAPIMessageWebhook: {
        type: 'string'
      },
      enableMessagesHistory: {
        type: 'string'
      },
      keepOnlineStatus: {
        type: 'string'
      }
    }
  },
  sendMessageRes: {
    type: 'object',
    required: [
      'idMessage'
    ],
    properties: {
      idMessage: {
        type: 'string'
      }
    }
  },
  receiveNotificationRes: {
    type: 'object',
    required: [
      'receiptId',
      'body'
    ],
    properties: {
      receiptId: {
        type: 'integer'
      },
      body: {
        type: 'object',
        properties: {
          typeWebhook: {
            type: 'string'
          },
          sendByApi: {
            type: 'boolean'
          },
          status: {
            type: 'string'
          },
          instanceData: {
            type: 'object',
            required: [
              'idInstance',
              'wid',
              'typeInstance'
            ],
            properties: {
              idInstance: {
                type: 'integer'
              },
              wid: {
                type: 'string'
              },
              typeInstance: {
                type: 'string'
              }
            }
          },
          timestamp: {
            type: 'integer'
          },
          idMessage: {
            type: 'string'
          },
          senderData: {
            type: 'object',
            required: [
              'chatId',
              'sender',
              'senderName',
              'chatName'
            ],
            properties: {
              chatId: {
                type: 'string'
              },
              sender: {
                type: 'string'
              },
              senderName: {
                type: 'string'
              },
              chatName: {
                type: 'string'
              }
            }
          },
          messageData: {
            type: 'object',
            required: [
              'typeMessage'
            ],
            properties: {
              typeMessage: {
                type: 'string'
              },
              textMessageData: {
                type: 'object',
                required: [
                  'textMessage'
                ],
                properties: {
                  textMessage: {
                    type: 'string'
                  }
                }
              },
              fileMessageData: {
                type: 'object',
                properties: {
                  caption: {
                    type: 'string'
                  },
                  downloadUrl: {
                    type: 'string'
                  },
                  fileName: {
                    type: 'string'
                  },
                  jpegThumbnail: {
                    type: 'string'
                  },
                  mimeType: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  deleteNotificationRes: {
    type: 'object',
    required: [
      'result'
    ],
    properties: {
      result: {
        type: 'boolean'
      }
    }
  },
  ErrorModel: {
    type: 'object',
    required: [
      'number',
      'timestamp',
      'path',
      'message'
    ],
    properties: {
      statusCode: {
        type: 'number'
      },
      timestamp: {
        type: 'string'
      },
      path: {
        type: 'string'
      },
      message: {
        type: 'string'
      }
    }
  }
} as const;
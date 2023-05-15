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
        required: [
          'typeWebhook',
          'instanceData',
          'timestamp',
          'idMessage',
          'senderData',
          'messageData'
        ],
        properties: {
          typeWebhook: {
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
              'senderName'
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
              }
            }
          },
          messageData: {
            type: 'object',
            required: [
              'typeMessage',
              'textMessageData'
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
  getChatHistoryRes: {
    type: 'array',
    items: {
      required: [
        'type',
        'timestamp',
        'idMessage',
        'typeMessage',
        'chatId',
        'senderName',
        'textMessage'
      ],
      properties: {
        type: {
          type: 'string'
        },
        timestamp: {
          type: 'integer'
        },
        idMessage: {
          type: 'string'
        },
        typeMessage: {
          type: 'string'
        },
        chatId: {
          type: 'string'
        },
        senderId: {
          type: 'string'
        },
        senderName: {
          type: 'string'
        },
        textMessage: {
          type: 'string'
        }
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
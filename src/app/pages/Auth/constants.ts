export const form = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  style: { maxWidth: 600 },
  initialValues: { remember: true },
  item1: {
    rules: [
      {
        required: true,
        message: "Please input your IdInstance!"
      }
    ]
  },
  item2: {
    rules: [
      {
        required: true,
        message: "Please input your ApiTokenInstance!"
      }
    ]
  },
  item3: {
    wrapperCol: { offset: 8, span: 16 }
  },
  item4: {
    wrapperCol: { offset: 8, span: 16 }
  }
};
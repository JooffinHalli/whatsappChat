export const form = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  style: { maxWidth: 600, color: "#DFF3ED", backGround: "#111B21" },
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
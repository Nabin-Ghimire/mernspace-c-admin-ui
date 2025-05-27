import { Form, message, Space, Typography, Upload, UploadProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useState } from "react";


const ProductImage = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploadConfig: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        messageApi.error('You can only upload JPG/PNG file!');
        return false
      }

      setImageUrl(URL.createObjectURL(file));

      return false
    }
  }
  return (
    <Form.Item name='image' label=''
      rules={[
        {
          required: true,
          message: 'Please upload a product image'
        },
      ]}>
      <Upload listType="picture-card" {...uploadConfig}>
        {contextHolder}
        {
          imageUrl ? (
            <img
              src={imageUrl}
              alt='avatar'
              style={{ width: '100%' }} />
          ) : (
            <Space direction="vertical">
              <PlusOutlined />
              <Typography.Text>Upload</Typography.Text>
            </Space>
          )
        }

      </Upload>
    </Form.Item>
  )
}

export default ProductImage;
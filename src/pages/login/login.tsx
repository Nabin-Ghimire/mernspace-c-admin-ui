import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"
import { LockFilled, LockOutlined, UserOutlined } from '@ant-design/icons'
import Logo from "../../components/icons/Logo"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Credentials } from "../../types"
import { login, logout, self } from "../../http/api"
import { userAuthStore } from "../../store"
import { usePermission } from "../../hooks/usePermission"

const loginUser = async (credentials: Credentials) => {
  //server logic here
  const { data } = await login(credentials);
  return data
}

const getSelf = async () => {
  const { data } = await self();
  return data;
}

const LoginPage = () => {

  const { isAllowed } = usePermission();

  const { setUser, logout: logoutFromStore } = userAuthStore();

  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false,
  });

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
      return;
    }
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      //getself call for user data
      const selfData = await refetch();
      //logout or redirect to client UI
      //window.location.href="http://clientui/url"
      //"admin","manager" roles are allowed to access the admin UI
      if (!isAllowed(selfData.data)) {
        logoutMutate();
        return
      }
      setUser(selfData.data);

    }
  }
  )

  return <>

    <Layout style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>

      <Space direction="vertical" align="center" size='large'>

        <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Logo />
        </Layout.Content>

        <Card
          variant="outlined"
          style={{ width: 300 }}
          title={
            <Space style={{ width: '100%', fontSize: 16, justifyContent: 'center' }}>
              <LockFilled />
              Sign in
            </Space>
          }>

          <Form initialValues={{ remember: true }} onFinish={(values) => {
            mutate({ email: values.username, password: values.password });
          }}>

            {isError && <Alert style={{ marginBottom: 24 }} type="error" message={error?.message} />}

            <Form.Item name='username' rules={[
              {
                required: true,
                message: "Please input you username"
              },
              {
                type: 'email',
                message: "Please input a valid email"
              }
            ]}>
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item name='password'
              rules={
                [
                  {
                    required: true,
                    message: "Please input you password"
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters"
                  }
                ]
              }>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Flex justify="space-between">
              <Form.Item name='remember' valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#" id="login-form-forgot">Forgot password</a>
            </Flex>

            <Form.Item >
              <Button type='primary' htmlType="submit" style={{ width: '100%' }} loading={isPending}>
                Log in
              </Button>
            </Form.Item>


          </Form>
        </Card>

      </Space>

    </Layout>
  </>
}

export default LoginPage
import { Breadcrumb, Button, Flex, Form, Image, Space, Spin, Table, Tag, Typography } from "antd";
import { LoadingOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import { FieldData, Product } from "../../types";
import { useState } from "react";
import { PER_PAGE } from "../../constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../http/api";
import { format } from "date-fns";
import { debounce } from "lodash";
import React from "react";


const columns = [

  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    render: (_text: string, record: Product) => (
      <div>
        <Image width={60} src={record.image} />
        <Typography.Text>{record.name}</Typography.Text>

      </div>
    )
  },

  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Status',
    dataIndex: 'isPublish',
    key: 'isPublish',
    render: (_: string, record: Product) => {
      return (
        record.isPublish ? <Tag color="green">Published</Tag> : <Tag color="red">Draft</Tag>
      )
    }
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      return (
        <Typography.Text>{format(new Date(text), 'dd/MM/yyy  HH:mm')}</Typography.Text>
      )
    }
  },

]

const Products = () => {
  const [filterForm] = Form.useForm();
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1,

  })


  const { data: products, isFetching, isError, error } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(Object.entries(queryParams).filter((item) => !!item[1]));
      const queryString = new URLSearchParams(filteredParams as unknown as Record<string, string>).toString();
      return getProducts(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData, //isLoading will be disabled so we need to use isFetching instead of isLoading, because it is keeping previous data there while it is fetching, keepPreviousData will be used. 

  })
  console.logs('Products', products);

  const debouncedQUpdate = React.useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev) => ({ ...prev, q: value, currentPage: 1 }));
    }, 500)
  }, [])

  const onFilterChange = (changedFields: FieldData[]) => {
    const changedFilterFields = changedFields.map((item) => ({ [item.name[0]]: item.value })).reduce((acc, item) => ({ ...acc, ...item }), {});

    //for debouncing (it will wait for some time before sending the request to the server, applying to the search filter not in role)


    if ('q' in changedFilterFields) {
      debouncedQUpdate(changedFilterFields.q);
    } else {
      setQueryParams((prev) => ({ ...prev, ...changedFilterFields, currentPage: 1 }));
    }
  }

  return <>

    <Space direction="vertical" size="large" style={{ width: '100%' }}>


      <Flex justify="space-between">
        <Breadcrumb separator={<RightOutlined />} items={[
          {
            title: <Link to="/"> Dashboard</Link>

          },
          {
            title: "Products"
          },

        ]} />

        {isFetching && (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)}
        {isError && <Typography.Text type="danger">{error.message}</Typography.Text>}

      </Flex>

      <Form form={filterForm} onFieldsChange={onFilterChange} >

        <ProductFilter>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => { }}>Add Products</Button>
        </ProductFilter>

      </Form>


      <Table columns={[...columns, {
        title: 'Actions',
        render: () => {
          return (
            <Button onClick={() => {

            }}
              type='link'>Edit</Button>
          )
        }
      }]} dataSource={products?.data.data} rowKey={'id'} pagination={
        {
          total: products?.total,
          pageSize: queryParams.perPage,
          current: queryParams.currentPage,
          onChange: (page,) => {
            setQueryParams((prev) => {
              return {
                ...prev,
                currentPage: page,
              }
            })
          },
          showTotal: (total: number, range: number[]) => {
            return `Showing ${range[0]} - ${range[1]} of ${total} items`;//range is an array of two numbers, the first number is the first item of the current page and the second number is the last item of the current page.
          }
        }
      } />

    </Space>

  </>
}
export default Products;
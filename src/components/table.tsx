import React from 'react'
import { Empty, Table, EmptyProps, ConfigProvider } from 'antd'
import { ColumnGroupType, ColumnType, TableProps } from 'antd/es/table'

interface IProps extends TableProps<any> {}

const AgTable: React.FC<IProps> = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: ''
        }
      }}
    >
        <Table
    showHeader
    tableLayout="fixed"
    {...props}
    locale={{
      emptyText: (
         <Empties 
         className="py-10"
         />
      )
    }}
  />
    </ConfigProvider>
  )
}

export default AgTable



interface IEmptyProps extends EmptyProps {}
const Empties: React.FC<IEmptyProps> = (emptyprops) => {
  return (
    <ConfigProvider
    theme={{
      token: {
        fontFamily: ''
      }
    }}
  >
    <Empty
          {...emptyprops}
      />
  </ConfigProvider>
  )
}
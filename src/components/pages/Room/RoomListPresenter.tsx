import { Button, Col, Row, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { RoomListPresenterProps } from './types';

const columns = [
  {
    title: 'Floor',
    dataIndex: 'floor',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Is active',
    dataIndex: 'is_active',
  },
];

export const RoomListPresenter = ({ handleClick, rooms }: RoomListPresenterProps): JSX.Element => {
  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Title level={2}>Room List</Title>
        </Col>
        <Col span={6}>
          <Button onClick={handleClick} block>
            Add User
          </Button>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          {rooms && rooms.length > 0 && <Table columns={columns} dataSource={rooms} rowKey="id" />}
        </Col>
      </Row>
    </div>
  );
};

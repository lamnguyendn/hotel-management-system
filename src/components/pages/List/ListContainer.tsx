import { Button, Col, Row, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  actions as roomActions,
  selectors as roomSelector,
} from '../../../states/room';

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

export const ListContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector(roomSelector.roomsSelector);

  useEffect(() => {
    dispatch(roomActions.fetchRoom(''));
  }, []);

  const handleClick = () => {
    history.push('/form');
  };

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
          {rooms && rooms.length > 0 && (
            <Table columns={columns} dataSource={rooms} rowKey="id" />
          )}
        </Col>
      </Row>
    </div>
  );
};

import React from 'react';
import { Form, Button, Table, Divider, Drawer, Popconfirm } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import TableHoc from 'components/Hoc/tableHoc';
import Edit from './edit';
import 'public/css/defaultTable.less';
import dimLabelContentApi from 'api/system/dimLabelContent';

const searchFields = [{ name: 'labelName', title: '标签名称', showType: 'input' }];

@TableHoc
class DimLabelContent3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false,
      addVisible: false,
      pkInfo: {}
    };
    this.formRef = React.createRef();
    this.props.init(dimLabelContentApi);
    this.props.setFormRef(this.formRef);
  }

  closeAddPage = (isReloadTable) => {
    this.setState({ addVisible: false });
    if (isReloadTable) {
      this.props.handleSearch('add');
    }
  };

  closeEditPage = (isReloadTable) => {
    this.setState({ editVisible: false });
    if (isReloadTable) {
      this.props.handleSearch('update');
    }
  };

  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'rownum',
        key: 'rownum',
        width: 100,
        render: (text, record, index) => index + 1
      },
      {
        title: '标签名称2',
        dataIndex: 'labelName',
        key: 'labelName',
        width: 200
      },
      {
        title: '添加时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200
      },
      {
        title: '编辑时间',
        dataIndex: 'editTime',
        key: 'editTime',
        width: 200
      },
      {
        title: '编辑用户',
        dataIndex: 'editUser',
        key: 'editUser',
        width: 200
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <span>
            <a onClick={() => this.setState({ editVisible: true, pkInfo: record })}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              placement="left"
              icon={<ExclamationCircleFilled style={{ color: '#F63A43' }} />}
              title={`确定要删除吗?`}
              onConfirm={() => this.props.handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];

    const { page, pageSize, pageSizeOptions, total, dataSource } = this.props.tableInfo;

    const { addVisible, editVisible, pkInfo } = this.state;

    const scrollY = window.innerHeight - 270;

    return (
      <div className="default-table">
        <div className="content">
          <div className="table-container">
            <div className="query-panel">
              <Form layout="inline" ref={this.formRef}>
                {this.props.getFields(searchFields)}
                <Form.Item>
                  <Button type="primary" ghost onClick={() => this.props.handleSearch('search')}>
                    查询
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => {
                      this.formRef.current.resetFields();
                      this.props.handleSearch();
                    }}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Form>
              <span>
                <Button
                  type="primary"
                  onClick={() => this.setState({ addVisible: true, pkInfo: {} })}
                >
                  添加
                </Button>
              </span>
            </div>
            <div className="table-pagination">
              <Table
                dataSource={dataSource}
                columns={columns}
                rowKey="labelId"
                scroll={{ y: scrollY }}
                pagination={{
                  current: page,
                  pageSize: pageSize,
                  total: total,
                  pageSizeOptions: pageSizeOptions,
                  showSizeChanger: true,
                  showTotal: (total) => `共${total}条`,
                  showQuickJumper: true,
                  onChange: this.props.pageRowsChange
                }}
                onRow={(record) => {
                  //表格行点击事件
                  return {
                    onClick: () => this.props.setRowSelectedId(record.labelId)
                  };
                }}
                rowClassName={(record) => this.props.getRowClassName(record.labelId)}
              />
            </div>
          </div>
        </div>
        {addVisible ? (
          <Drawer
            title="添加"
            onClose={() => this.closeAddPage(false)}
            visible={addVisible}
            width={'60%'}
            bodyStyle={{ paddingBottom: 77 }}
            maskClosable={false}
          >
            <Edit handleClose={this.closeAddPage} />
          </Drawer>
        ) : null}
        {editVisible ? (
          <Drawer
            title="修改"
            onClose={() => this.closeEditPage(false)}
            visible={editVisible}
            width={'60%'}
            bodyStyle={{ paddingBottom: 77 }}
            maskClosable={false}
          >
            <Edit pkInfo={pkInfo} handleClose={this.closeEditPage} />
          </Drawer>
        ) : null}
      </div>
    );
  }
}
export default DimLabelContent3;

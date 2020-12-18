
import MockData from '../mock/order';
import React from 'react';
import 'antd/dist/antd.css';
import './css/list.css';
import { List, Descriptions } from 'antd';


class Complete extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return (
            <div className="mylist">
                <List
                    itemLayout="horizontal"
                    dataSource={MockData}
                    renderItem={item => (
                    <List.Item
                        key={item._orderId} 
                        extra={
                            <div className="order-detail" onClick={()=>{this.props.onclick(item)}}>
                                <Descriptions title="">
                                <Descriptions.Item label="订单号">{item._orderId}</Descriptions.Item>
                                <Descriptions.Item label="订单地址">{item._address}</Descriptions.Item>
                                <Descriptions.Item label="联系人">{item._people}</Descriptions.Item>
                                <Descriptions.Item label="联系电话">{item._tel}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        }>
                        
                    </List.Item>
                    )}
                />
            </div>
        );
    }
};


export default Complete





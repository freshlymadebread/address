import React from 'react';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl'

import './css/mapPoint.css';
import { Drawer, Button, Radio, Space } from 'antd';
import MyList from '../components/list'

import 'antd/dist/antd.css';
import './css/mapPoint.css';
import axios from "axios"

import MockData from '../mock/order';


export default class myMap extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            visible: false,
            showInfoFlag: false,
            lng: undefined,
            lat: undefined,
            showInfo: undefined,
            loadings: false,
        }
        this.showOrder = this.showOrder.bind(this)
    }
    onClose = () => {
        this.setState({
          visible: false,
        });
    };
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    showLine= () => {
        let origin =  MockData[0].lat + "," +  MockData[0].lag
        let destination =  MockData[MockData.length-1].lat + "," +  MockData[MockData.length-1].lag
        let waypoints = ""
        for(let i = 1; i < MockData.length-1 ; i++){
            waypoints += MockData[i].lat + "," +  MockData[i].lag + "|"
        }
        waypoints = waypoints.slice(0,-1)
        axios.get(
            `/directionlite/v1/driving?origin=${origin}&destination=${destination}&waypoints=${waypoints}&ak=qBK4NRB8ji1GZbElu6p9gnePCkAxizL2`
        ).then(data=>{
            console.log(data)
        }).finally(_=>{
        })
    }
    showOrder(order){
        console.log("点击了订单")
        console.log(order)
        this.setState({
            showInfo: order,
            visible: false,
            showInfoFlag: false,
        })
        this.getPoint(order._address)
    }
    closeInfoWindow = () => {
        this.setState({
            showInfoFlag: false,
        });
    };
    getPoint(address){
        if(!address){
            return
        }
        console.log(this.state)
        this.setState({
            loadings: true
        })
        axios.get(
            `/place/v2/search?query=${address}&region=全国&output=json&ak=qBK4NRB8ji1GZbElu6p9gnePCkAxizL2`
        ).then(data=>{
            console.log(data)
            let res  = data.data
            if(res.message == "ok"){
                this.setState({
                    lng: res.results[0].location.lng,
                    lat: res.results[0].location.lat,
                    showInfoFlag: true,
                })
            }
        }).finally(_=>{
            this.setState({
                loadings: false
            })
        })
    }

    render() {
        return (
            <div>
                <div className="search-bar">
                    <Button type="primary"onClick={() => this.showDrawer()} loading={this.state.loadings}>
                        订单详情
                    </Button>
                    <Button type="primary"onClick={() => this.showLine()} loading={this.state.loadings}>
                        展示路线
                    </Button>
                </div>
                <Map center={{lng: 116.402544, lat: 39.928216}} zoom="15" enableScrollWheelZoom>
                    <Marker position={{lng: 116.402544, lat: 39.928216}} />
                    <NavigationControl /> 
                    {this.state.showInfoFlag &&  <InfoWindow onClickclose={this.closeInfoWindow} position={{lng: this.state.lng, lat: this.state.lat}} text="内容" title="订单详情"  width={350} height={150}>
                        <div className="pop-up">
                            订单号：{this.state.showInfo._oderId}
                            <br/>
                            订单地址：{this.state.showInfo._address}
                            <br/>
                            联系人：{this.state.showInfo._people}
                            <br/>
                            联系电话：{this.state.showInfo._tel}
                        </div>
                    </InfoWindow>}
                </Map>
                <Drawer height={400}	 title="订单详情" placement="bottom" closable={true} onClose={this.onClose} visible={this.state.visible} key="bottom">
                    <MyList onclick={this.showOrder}></MyList>
                </Drawer>
            </div>
        );
      }
}
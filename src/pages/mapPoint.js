import React from 'react';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

import index from 'react-bmapgl/Map/index'
import AutoComplete from '../components/autocomplete'
// import AutoComplete from 'react-bmapgl/Services/AutoComplete'
import axios from "axios"

import 'antd/dist/antd.css';
import './css/mapPoint.css';
import { Button } from 'antd';

export default class mapPoint extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            showInfoFlag: false,
            lng: undefined,
            lat: undefined,
            searchInput: undefined,
            loadings: false,
            showInfo: undefined,
        }
        this.handClick = this.handClick.bind(this)
        this.getPoint = this.getPoint.bind(this)
        this.changeSearchInput = this.changeSearchInput.bind(this)
    }
    changeSearchInput(value){
        console.log(value)
        this.setState({
            searchInput: value
        })
    }
    handClick(e){
        console.log("点击事件")
        console.log(e)
    }
    onConfirm(e){
        console.log("onConfirm")
        console.log(e)
    }
    getPoint(){
        if(!this.state.searchInput){
            return
        }
        console.log(this.state)
        this.setState({
            loadings: true
        })
        axios.get(
            `/place/v2/search?query=${this.state.searchInput}&region=全国&output=json&ak=qBK4NRB8ji1GZbElu6p9gnePCkAxizL2`
        ).then(data=>{
            console.log(data)
            let res  = data.data
            if(res.message == "ok"){
                this.setState({
                    lng: res.results[0].location.lng,
                    lat: res.results[0].location.lat,
                    showInfoFlag: true,
                    showInfo: res.results[0].name
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
                {/* <AutoComplete onHighlight={e => {console.log(e)}} onConfirm={e => {this.onConfirm(e)}} onSearchComplete={e => {console.log(e)}}/> */}
                <AutoComplete value={this.state.searchInput} onChange={this.changeSearchInput}></AutoComplete>
                <Button type="primary" loading={this.state.loadings} onClick={() => this.getPoint()}>
                    搜索
                </Button>
            </div>
            <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11" onClick={ e => this.handClick(e) } enableScrollWheelZoom>
                <NavigationControl /> 
                {this.state.showInfoFlag && 
                <InfoWindow position={{lng: this.state.lng, lat: this.state.lat,}} text={this.state.showInfo} width={350} height={150} title="订单信息">
                    <div className="pop-up">
                        订单号：123123
                        <br/>
                        订单地址：{this.state.showInfo}
                        <br/>
                        联系人：王先生
                        <br/>
                        联系电话：15605465998
                    </div>
                </InfoWindow>
                }
            </Map>
        </div>
        );
      }
}




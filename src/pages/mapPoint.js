import React from 'react';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

import index from 'react-bmapgl/Map/index'
import AutoComplete from '../components/autocomplete'

export default class mapPoint extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            showInfoFlag: false,
            lng: undefined,
            lat: undefined,
            searchInput: undefined,
        }
        this.handClick = this.handClick.bind(this)
    }
    changeSearchInput(value){
        console.log(value)
        this.setState({
            searchInput: value
        })
    }
    handClick(e){
        console.log(e)
        this.setState((state)=>({
            showInfoFlag: !state.showInfoFlag,
            lng: e.latlng.lng,
            lat: e.latlng.lat,
        }))
    }
    render() {
        return (
        <div>
            <AutoComplete value={this.state.searchInput} onChang={this.changeSearchInput}></AutoComplete>
            <Map center={{lng: 116.402544, lat: 39.928216}} zoom="11" onClick={ e => this.handClick(e) } enableScrollWheelZoom>
                <Marker position={{lng: 116.402544, lat: 39.928216}} />
                <NavigationControl /> 
                {this.state.showInfoFlag && <InfoWindow position={{lng: this.state.lng, lat: this.state.lat,}} text="你吗炸了" title="标题"/>}
            </Map>
        </div>
        );
      }
}
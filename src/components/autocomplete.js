import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AutoComplete } from 'antd';

import MockData from '../mock/search';

const { Option } = AutoComplete;

class Complete extends React.Component {
    constructor(props){
        super(props)
        this.state={
            result: []
        }
    }
    setResult(res){
        this.setState({
            result: res
        })
    }
    render(){
        let timer = undefined
        const handleSearch = (value) => {
          clearTimeout(timer)
          timer = setTimeout(()=>{
              console.log("搜索")
              let res = [];
              if (!value ) {
                res = [];
              } else {
                res = MockData.filter(item =>{
                    return item.value.indexOf(value) !== -1
                });
              }
              this.setResult(res);
          },500)
        };
      
        return (
          <AutoComplete
            style={{
              width: 200,
            }}
            value={this.props.value}
            onChange={this.props.onChange}
            onSearch={handleSearch}
            onFocus={handleSearch}
            placeholder="input here"
          >
            {this.state.result.map((item, index) => (
              <Option key={item.index} value={item.value}>
                {item.value}
              </Option>
            ))}
          </AutoComplete>
        );
    }
};


export default Complete
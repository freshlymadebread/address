import React from 'react';
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
        this.changeValue = this.changeValue.bind(this)
    }
    setResult(res){
        this.setState({
            result: res
        })
    }
    changeValue(e){
      console.log("改变")
      console.log(e)
      this.props.onChange(e)
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
            onChange={this.changeValue}
            onSearch={handleSearch}
            onFocus={handleSearch}
            placeholder="输入搜索信息"
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
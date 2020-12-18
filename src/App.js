
import './App.css';
import Mymap from  './pages/mymap';
import React from 'react'
import { Button, Menu } from 'antd';
import { HomeOutlined, SearchOutlined, SendOutlined, WarningOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'


import Home from './pages/home';
import Topics from './pages/topics';
import NoMatch from './pages/404';
import MapPoint from './pages/mapPoint';


class BasicExample extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      path: 'home'
    }
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({ path: e.key });
  };

  render(){
    const { path } = this.state;
    return (
      <Router>
        <div>
          <Menu mode="horizontal" selectedKeys={[path]} onClick={this.handleClick}  theme="dark">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">主页</Link>
            </Menu.Item>
            <Menu.Item key="mapPoint" icon={<SendOutlined />}>
              <Link to="/mapPoint">位置搜索</Link>
            </Menu.Item>
            <Menu.Item key="map" icon={<SearchOutlined />}>
              <Link to="/map">订单展示和路线查询</Link>
            </Menu.Item>
            {/* <Menu.Item key="nothing" icon={<WarningOutlined />}>
              <Link to="/nothing">404</Link>
            </Menu.Item>
            <Menu.Item key="topics" icon={<SendOutlined />}>
              <Link to="/topics">嵌套路由</Link>
            </Menu.Item> */}
          </Menu>
    
          <hr/>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/map" component={Mymap}/>
              <Route path="/mapPoint" component={MapPoint}/>
              <Route path="/topics" component={Topics}/>
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

function App() {
  return <BasicExample></BasicExample>;
}

export default App;
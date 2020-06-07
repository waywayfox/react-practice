import React from 'react';
import { Col, Row, Input, Button, Space, Select } from 'antd';
import TestForm from './TestForm'

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      configMode: false,
      editIndex: 0
    }
  }

  enterConfigMode = () => {
    this.setState({
      configMode: true
    });
  }

  quitConfigMode = () => {
    this.setState({
      configMode: false
    });
  }

  finishTestform = (index) => {
    console.log(index)
    this.setState({
      configMode: false
    });
  }

  render() {
    const editModel = (
      <TestForm
        visible={this.state.configMode}
        onCancel={this.quitConfigMode.bind(this)}
        onFinish={this.finishTestform.bind(this)}
      />
    );

    return (
      <>
        <h1>{this.props.title}</h1>
        <Button type="primary" onClick={this.enterConfigMode.bind(this, 8)}>
          enter config mode
        </Button>
        {editModel}
      </>
    );
  }
}

export default Test;
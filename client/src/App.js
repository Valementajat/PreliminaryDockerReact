import React, { Component } from 'react';
import './App.css';
import { Button, Container, Row } from 'react-bootstrap';
import { fetchData, insertData, deleteData, updateData } from './Api';
import CardComponent from './CardComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setBookName: '',
      setReview: '',
      fetchData: [],
      reviewUpdate: '',
    };
  }

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
  };

  handleChange2 = (event) => {
    this.setState({
      reviewUpdate: event.target.value,
    });
  };

  componentDidMount() {
    fetchData()
      .then((response) => {
        this.setState({
          fetchData: response.data,
        });
      });
  }

  submit = () => {
    insertData(this.state)
      .then(() => { alert('success post') });
    console.log(this.state);
    document.location.reload();
  }

  remove = (id) => {
    if (window.confirm("Do you want to delete? ")) {
      deleteData(id);
      document.location.reload();
    }
  }

  edit = (id) => {
    updateData(id, this.state);
    document.location.reload();
  }

  render() {
    if (!Array.isArray(this.state.fetchData)) {
      return <div>Loading...</div>;
    }

    return (
      <div className='App'>
        <div className='form'>
          <input name='setBookName' placeholder='Enter Book Name' onChange={this.handleChange} />
          <input name='setReview' placeholder='Enter Review!!' onChange={this.handleChange} />
        </div>
        <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> <br /><br />
        <Container>
          <Row>
            <CardComponent
              data={this.state.fetchData}
              handleChange2={this.handleChange2}
              edit={this.edit}
              remove={this.remove}
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>안녕 세상!</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}

const funStyle = 'color: powderblue';
let funId = 0;

function FuncComp(props) {
  const numberState = useState(props.initNumber);
  const number = numberState[0];
  const setNumber = numberState[1];

  const [date, setDate] = useState(new Date().toString());

  //side effect (react에서 화면에 view를 그리는 것 이외에 발생되는 효과들. ex)여기서처럼 document의 title을 바꾸는 일이라던지)
  // clean up: useEffect 내에서 return형식으로 표기한다. useEffect가 이미 실행되고, 다시 한 번 실행되기 전에 전의 실행으로 발생한 것을 정리해주는 역할
  // 두번째인자로 전달한 배열의 값이 바뀔 때만 useEffect 함수가 실행이 된다. [] 빈배열을 전달하면 컴포넌트가 최초로 생성될 때, 1회는 실행되지만, 그 이후에는 실행되지 않는다.(componentDidMount에서와 유사)
  useEffect(
    function () {
      console.log(
        '%cuseEffct => componentDidMount & componentDidUpdate' + ++funId,
        funStyle
      );
      document.title = number;
      return function () {
        console.log(
          '%cuseEffct return => componentDidMount & componentDidUpdate' +
            ++funId,
          funStyle
        );
      };
    },
    [number]
  );

  console.log('%cfunc => render' + ++funId, funStyle);
  return (
    <div className="container">
      <h2>나는 Function Component</h2>
      <b>Number : {number}</b>
      <p>Date : {date}</p>
      <input
        type="button"
        value="random"
        onClick={function () {
          setNumber(Math.random());
        }}
      ></input>
      <input
        type="button"
        value="date"
        onClick={function () {
          setDate(new Date().toString());
        }}
      ></input>
    </div>
  );
}

const classStyle = 'color: green';
class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: new Date().toString()
  };
  componentWillMount() {
    console.log('%cclass=> componentWillMount', classStyle);
  }
  componentDidMount() {
    console.log('%cclass=> componentDidMount', classStyle);
  }
  render() {
    console.log('%cclass => render', classStyle);
    return (
      <div className="container">
        <h2>나는 Class Component</h2>
        <b>Number : {this.state.number}</b>
        <p>Date: {this.state.date}</p>
        <input
          type="button"
          value="random"
          onClick={function () {
            this.setState({ number: Math.random() });
          }.bind(this)}
        ></input>
        <input
          type="button"
          value="date"
          onClick={function () {
            this.setState({ date: new Date().toString() });
          }.bind(this)}
        ></input>
      </div>
    );
  }
}
export default App;

import './App.css';
import React, { Component } from 'react';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    this.todoItems = [
      {title: 'Đi ăn bánh', isComplete: true},
      {title: 'Đi bắn bi', isComplete: true},
      {title: 'Đi đá banh', isComplete: false}
    ];
  }
  render() {
    return (
    <div className="App"> 
      {this.todoItems.length > 0 && this.todoItems.map((item, index) => 
          <TodoItem key={index} item={item} />
        )}
      {this.todoItems.length === 0 && 'Nothing here'}
    </div>
    );
  }  
}

export default App;

import './App.css';
import './components/footer.css';
import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import checkAll from './img/down-arrow.png';
var classNames = require('classnames');

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentFilter: 'all',
      todoItems: [
        {title: 'Đi ăn bánh', isComplete: true},
        {title: 'Đi bắn bi', isComplete: true},
        {title: 'Đi đá banh', isComplete: false}
      ]
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkAllItem = this.checkAllItem.bind(this);
    this.filterItem = this.filterItem.bind(this);
  }

  onItemClick(item) {
    return (event) => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      const isComplete = item.isComplete;
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {...item, isComplete: !isComplete},
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  deleteItem(item) {
    return (event) => {
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          ...todoItems.slice(index + 1)
        ]
      });
    };
  }

  onKeyUp(event) {
    const { todoItems } = this.state;
    let text = event.target.value;
    if(!text || text.trim() === '')
      return;
    
    if(event.keyCode === 13){
      this.setState({
        todoItems: [
          {title: text, isComplete: false},
          ...todoItems
        ],
        newItem: ''
      });
    }
  }

  onChange(event) {
    this.setState({
        newItem: event.target.value
      });
  }

  checkAllItem() {
    let todoItems = this.state.todoItems;
    let completedCount = 0;

    for(let item of todoItems) {
      if(item.isComplete) completedCount++;
    }

    this.setState(prevState => ({
          todoItems: prevState.todoItems.map(
            item => completedCount === todoItems.length ? 
            { ...item, isComplete: false } : { ...item, isComplete: true }
          )           
        }));

  }

  filterItem(event) {
    this.setState({
      currentFilter: event.target.className.split(' ')[0]
    });
  }

  render() {
    const { todoItems, newItem, currentFilter } = this.state;
    let items = todoItems;
    if(currentFilter === 'active')
      items = todoItems.filter(item => !item.isComplete);
    if(currentFilter === 'completed')
      items = todoItems.filter(item => item.isComplete);

    return (
    <div className="App"> 
      <div className="Header">
        <img src={checkAll} onClick={this.checkAllItem} />
        <input type="text" 
          placeholder="Add an item" 
          onKeyUp={this.onKeyUp} 
          onChange={this.onChange}
          value={newItem}>
        </input>
      </div>
      {items.length > 0 && items.map((item, index) =>     
        <TodoItem key={index} 
                  item={item} 
                  onClick={this.onItemClick(item)} 
                  deleteItem={this.deleteItem(item)} />
        )}

      {items.length === 0 && 'Nothing here'}
      <div className="footer">
        <ul className="filter">
          <li className={ classNames('all', {'selected': currentFilter==='all'}) } onClick={this.filterItem}>All</li>
          <li className={ classNames('active', {'selected': currentFilter==='active'}) } onClick={this.filterItem}>Active</li>
          <li className={ classNames('completed', {'selected': currentFilter==='completed'}) } onClick={this.filterItem}>Completed</li>
        </ul>
      </div>
    </div>
    );
  }  
}

export default App;

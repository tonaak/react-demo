import React, { Component } from 'react';
import './TodoItem.css';
var classNames = require('classnames');

class TodoItem extends Component {
    render() {
        // let className = 'TodoItem';
        // const { item } = this.props;
        // if (item.isComplete)
        //     className += ' TodoItem-complete';
        var completeClass = classNames({
            'TodoItem': true,
            'TodoItem-complete': this.props.item.isComplete
        });
        return (
            <div className={ completeClass }>
                <p>{this.props.item.title}</p>
            </div>
        );
    };
}

export default TodoItem;
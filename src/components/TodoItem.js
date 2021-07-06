import React, { Component } from 'react';
import './TodoItem.css';
import checkImg from '../img/check.png';
import delImg from '../img/cancel.png';
import checkCompleteImg from '../img/check-complete.png';
var classNames = require('classnames');


class TodoItem extends Component {  
    render() {
        const { item, onClick, deleteItem } = this.props;
        let url = checkImg;
        if (item.isComplete)
            url = checkCompleteImg;
        return (
            <div className={ classNames('TodoItem', {
                'TodoItem-complete': item.isComplete
            }) }>
                <img onClick={onClick} src={url} />
                <p>{item.title}</p>
                <img onClick={deleteItem} src={delImg} className={'delImg'} />
            </div>
        );
    };
}

export default TodoItem;
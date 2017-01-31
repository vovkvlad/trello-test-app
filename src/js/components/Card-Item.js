import React from 'react';
import RenameDeleteItem from './Rename-Delete-Item';

const CardItem = ({title, id, parentID, onRemoveClick, onRenameClick, onMoveList}) => {
    let input;

    return (
        <div className="card-item">
            {/*<div className="rename-list">
                <input
                    className="rename-list__input"
                    type="text"
                    placeholder="Enter name"
                    value={title}
                    ref={node => {
                        input = node;
                    }}
                    onChange={() => {
                        onRenameClick(id, input.value);
                    }}
                />
                <span
                    className="rename-list__remove"
                    onClick={() => {
                        onRemoveClick(id);
                    }}>
                    <i className="fa fa-times remove-icon"></i>
                </span>
            </div>*/}

            <RenameDeleteItem
                title={title}
                id={id}
                onRemoveClick={onRemoveClick}
                onRenameClick={onRenameClick}
            />
        </div>
    );
};

export default CardItem;
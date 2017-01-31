import React from 'react';

const RenameDeleteItem = ({ title, id, onRemoveClick, onRenameClick }) => {
    let input;

    return (
        <div className="rename-list">
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
        </div>
    );
};

export default RenameDeleteItem;
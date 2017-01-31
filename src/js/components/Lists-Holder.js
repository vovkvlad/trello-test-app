import React from 'react';
import ListItem from './List-Item';
import AddList from '../containers/AddList'


const ListHolder = ({lists, onRenameClick, onRemoveClick, onMoveList}) => (
    <div className="app-container">
        {lists.map(list =>
            <ListItem
                key={list.id}
                id={list.id}
                index={list.index}
                title={list.title}
                onRenameClick={onRenameClick}
                onRemoveClick={onRemoveClick}
                onMoveList={onMoveList}
            />
        )}
        <AddList></AddList>
    </div>
);

export default ListHolder;
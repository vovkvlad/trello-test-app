import React from 'react';
import AddCard from '../containers/AddCard';
import AvailableCards from '../containers/AvailableCards';
import RenameDeleteItem from './Rename-Delete-Item';

const ListItem = ({ title, id, onRenameClick, onRemoveClick }) => {
    let input;

    return (
        <div className="app-container__item list-item">
            <RenameDeleteItem
                title={title}
                id={id}
                onRemoveClick={onRemoveClick}
                onRenameClick={onRenameClick}
            />

            <AvailableCards
                listID={id}
            />

            <AddCard
                parrentId={id}
            >
            </AddCard>
        </div>
    )
};

export default ListItem;
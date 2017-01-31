import React from 'react';
import CardItem from './Card-Item';

const CardsHolder = ({ cards, onRemoveClick, onRenameClick, onMoveList }) => {
    let input;

    return (
        <div className="cards-holder">
            {cards.map(card =>
                <CardItem
                    key={card.id}
                    id={card.id}
                    title={card.title}
                    parentID={card.parentID}
                    onRemoveClick={onRemoveClick}
                    onRenameClick={onRenameClick}
                    onMoveList={onMoveList}
                />
            )}
        </div>
    );
};

export default CardsHolder;
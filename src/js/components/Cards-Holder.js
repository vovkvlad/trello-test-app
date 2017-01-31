import React from 'react';
import CardItem from './Card-Item';

const CardsHolder = ({ cards, onRemoveClick, onRenameClick, onMoveCard }) => {
    let input;

    return (
        <div className="cards-holder">
            {cards.map(card =>
                <CardItem
                    key={card.id}
                    id={card.id}
                    index={card.index}
                    title={card.title}
                    parentID={card.parentID}
                    onRemoveClick={onRemoveClick}
                    onRenameClick={onRenameClick}
                    onMoveCard={onMoveCard}
                />
            )}
        </div>
    );
};

export default CardsHolder;
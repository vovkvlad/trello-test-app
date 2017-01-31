import React from 'react';
import CardItem from './Card-Item';

const CardsHolder = ({ cards, onRemoveClick, onRenameClick, onMoveCard, onChangeCardColor }) => {
    let input;

    return (
        <div className="cards-holder">
            {cards.map(card =>
                <CardItem
                    key={card.id}
                    id={card.id}
                    index={card.index}
                    title={card.title}
                    cardColor={card.cardColor}
                    parentID={card.parentID}
                    onRemoveClick={onRemoveClick}
                    onRenameClick={onRenameClick}
                    onMoveCard={onMoveCard}
                    onChangeCardColor={onChangeCardColor}
                />
            )}
        </div>
    );
};

export default CardsHolder;
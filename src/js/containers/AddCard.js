import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions';

let AddCard = ({ dispatch, parrentId }) => {
    let input;

    return (
        <div className="add-card">
            <form
                className="add-card__form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    if (!input.value.trim()){
                        return
                    }

                    dispatch(addCard(input.value, parrentId));
                    input.value = '';
                }}
            >
                <input
                    type="text"
                    className="add-card__input"
                    placeholder="Add new card"
                    ref={node => {
                        input = node;
                    }}
                />
            </form>
        </div>
    );
};

AddCard = connect()(AddCard);

export default AddCard;
import React from 'react';
import { connect } from 'react-redux';
import { addList } from '../actions';

let AddList = ({ dispatch }) => {
    let input;

    return (
        <div className="app-container__item list-item add-list-item">
            <form>
                <input
                    className="add-list-item__input"
                    type="text"
                    placeholder="Add new List"
                    ref={node => {
                        input = node;
                    }}
                />
                <button
                    className="add-list-item__button"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!input.value.trim()) {
                            return
                        }
                        dispatch(addList(input.value));
                        input.value = '';
                    }}
                >
                    Add List
                </button>
            </form>
        </div>
    );
};

AddList = connect()(AddList);

export default AddList;

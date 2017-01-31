import React from 'react';


const ChangeCardColor = ({parentID, color, onChangeCardColor}) => {
    return (
        <div
            className="change-color-control__item"
            style={{backgroundColor: color}}
            onClick={() => {
                onChangeCardColor(parentID, color);
            }}
        ></div>
    );
};

export default ChangeCardColor;
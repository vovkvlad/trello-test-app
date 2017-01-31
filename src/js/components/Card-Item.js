import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd'
import dndTypes from '../dragAndDropTypes';
import RenameDeleteItem from './Rename-Delete-Item';
import flow from 'lodash/flow'

const cardSourceSpec = {
    beginDrag(props, monitor, component) {
        const item = {
            id: props.id,
            index: props.index,
            parentID: props.parentID
        };
        return item;
    }
};

const cardTargetSpec = {
    hover(props, monitor, component){
        const draggedItem = monitor.getItem();
        //console.log('hover called upon - ' + props.id);
        const draggedItemIndex = draggedItem.index;
        const hoveredItemIndex = props.index;

        //determine whether we are moving card to another list
        const isMovedToAnotherList = draggedItem.parentID !== props.parentID;

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Don't replace items with themselves
        if (draggedItem.id === props.id) {
            return;
        }

        if (!isMovedToAnotherList) {

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (draggedItemIndex < hoveredItemIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (draggedItemIndex > hoveredItemIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            props.onMoveCard(draggedItem.id, draggedItem.parentID, props.id, draggedItemIndex, hoveredItemIndex, isMovedToAnotherList);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoveredItemIndex;
        } else {
            // basically we add 0.5 as a workaround to determine where card should go,
            // either upon the hovered card, or below it
            if (hoverClientY < hoverMiddleY) {
                props.onMoveCard(draggedItem.id, draggedItem.parentID, props.id, hoveredItemIndex + 0.5, hoveredItemIndex, isMovedToAnotherList);
                draggedItem.parentID = props.parentID;
                monitor.getItem().index = hoveredItemIndex;
            } else {
                props.onMoveCard(draggedItem.id, draggedItem.parentID, props.id, hoveredItemIndex - 0.5, hoveredItemIndex, isMovedToAnotherList);
                draggedItem.parentID = props.parentID;
                monitor.getItem().index = hoveredItemIndex;
            }
        }
    }
};

const cardSourceConnector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const cardTargetConnector = (connect) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

class CardItem extends Component {
    render () {
        const {
            title,
            id,
            index,
            parentID,
            onRemoveClick,
            onRenameClick,
            onMoveCard,
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div
                className="card-item"
                style={{ opacity }}
            >
                <RenameDeleteItem
                    title={title}
                    id={id}
                    onRemoveClick={onRemoveClick}
                    onRenameClick={onRenameClick}
                />
                <div style={{ height: '15px' }}>{index}</div>
            </div>
        ));
    }
}

export default flow([
    DragSource(dndTypes.card, cardSourceSpec, cardSourceConnector),
    DropTarget(dndTypes.card, cardTargetSpec, cardTargetConnector)
])(CardItem);

/*
 const CardItem = ({title, id, parentID, onRemoveClick, onRenameClick, onMoveCard}) => {
 let input;

 return (
 <div className="card-item">
 <RenameDeleteItem
 title={title}
 id={id}
 onRemoveClick={onRemoveClick}
 onRenameClick={onRenameClick}
 />
 </div>
 );
 };

 export default CardItem;*/

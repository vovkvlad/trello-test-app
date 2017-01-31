import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd'
import dndTypes from '../dragAndDropTypes';
import flow from 'lodash/flow'
import AddCard from '../containers/AddCard';
import AvailableCards from '../containers/AvailableCards';
import RenameDeleteItem from './Rename-Delete-Item';

const listSourceSpec = {
    beginDrag(props) {
        const item = {
            id: props.id,
            index: props.index
        };
        return item;
    }
};

const listTargetSpec = {
    hover(props, monitor, component){
        const draggedItem = monitor.getItem();
        const draggedItemIndex = draggedItem.index;
        const hoveredItemIndex = props.index;

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        // Get horizontal middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;
        // Don't replace items with themselves
        if (draggedItem.id === props.id) {
            return;
        }

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (draggedItemIndex < hoveredItemIndex && hoverClientX < hoverMiddleX) {
            return;
        }

        // Dragging upwards
        if (draggedItemIndex > hoveredItemIndex && hoverClientX > hoverMiddleX) {
            return;
        }

        props.onMoveList(draggedItem.id, props.id, draggedItemIndex, hoveredItemIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoveredItemIndex;
    }
};

const listSourceConnector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const listTargetConnector = (connect) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

class ListItem extends Component {
    render () {
        const {
            title,
            id,
            index,
            onRemoveClick,
            onRenameClick,
            onMoveList,
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;

        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <div
                className="app-container__item list-item"
                style={{ opacity }}
            >
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
        ));
    }
}

export default flow([
    DragSource(dndTypes.list, listSourceSpec, listSourceConnector),
    DropTarget(dndTypes.list, listTargetSpec, listTargetConnector)
])(ListItem);

/*
const ListItem = ({ title, id, onRenameClick, onRemoveClick }) => {
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

export default ListItem;*/

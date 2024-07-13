import React from 'react';

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside style={{padding: '10px', width: '200px'}}>
            <div style={{marginBottom: '10px', fontSize: '1.2em'}}>Choose a weight and drag a node to the pane on the left.
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable
                 style={{marginBottom: '5px', fontSize: '1.1em', height:'45px'}}>
                Node
            </div>
        </aside>
    );
};

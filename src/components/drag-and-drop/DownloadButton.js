//code extracted from https://reactflow.dev/examples/misc/download-image
import React from 'react';
import {useReactFlow, getRectOfNodes, getTransformForBounds} from 'reactflow';
import {toPng} from 'html-to-image';
import {Button} from "react-bootstrap";

export function downloadImage(dataUrl) {
    const a = document.createElement('a');

    a.setAttribute('download', 'graph.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
    const {getNodes} = useReactFlow();
    const onClick = () => {
        // we calculate a transform for the nodes so that all nodes are visible
        // we then overwrite the transform of the `.react-flow__viewport` element
        // with the style option of the html-to-image library
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

        toPng(document.querySelector('.react-flow__viewport'), {
            width: imageWidth, height: imageHeight, style: {
                width: imageWidth,
                height: imageHeight,
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }).then(downloadImage);
    };

    return (
        <Button style={{ margin: 0, background: 'none', color: 'black', border: 'none'}} onClick={onClick}>
            Download Image
        </Button>
    );
}

export default DownloadButton;

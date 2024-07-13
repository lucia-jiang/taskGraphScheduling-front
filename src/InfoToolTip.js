import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

const InfoTooltip = ({ tooltipText }) => {
    const tooltip = <Tooltip id="tooltip">{tooltipText}</Tooltip>;

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={tooltip}
            style={{ display: 'inline-block', marginRight: '5px' }} // Adjust as needed
        >
            <Button
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    margin: '0',
                    padding: '0',
                    cursor: 'pointer',
                    color: "black"
                }}
            >
                <BsFillQuestionCircleFill style={{ fontSize: '1.5em' }} />
            </Button>
        </OverlayTrigger>
    );
};

export default InfoTooltip;

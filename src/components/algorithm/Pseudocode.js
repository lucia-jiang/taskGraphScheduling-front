// src/components/algorithm/Pseudocode.js
import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import "./AccordionComponents.css"

const Pseudocode = ({steps}) => {
    return (
        <div>
            <Accordion className={"mb-3 custom-accordion"}>
                <Accordion.Item>
                    <Accordion.Header className={"accordion-header"}>
                        <h4>Pseudocode</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div dangerouslySetInnerHTML={{__html: steps}}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
};

export default Pseudocode;

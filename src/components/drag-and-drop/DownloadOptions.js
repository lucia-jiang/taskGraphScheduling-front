import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import {Panel} from 'reactflow';
import TransformToJsonButton from "./TransformToJsonButton";
import DownloadButton from "./DownloadButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload} from '@fortawesome/free-solid-svg-icons';

const DownloadOptions = ({nodes, edges, numProcessors}) => {
    return (
        <Panel>
            <DropdownButton
                className="download-btn"
                variant="primary"
                title={<FontAwesomeIcon icon={faDownload}/>}
                id="dropdown-download"
            >
                <Dropdown.Item>
                    <TransformToJsonButton nodes={nodes} edges={edges} numProcessors={numProcessors}/>
                </Dropdown.Item>
                <Dropdown.Item>
                    <DownloadButton nodes={nodes} edges={edges}/>
                </Dropdown.Item>
            </DropdownButton>
        </Panel>
    );
};

export default DownloadOptions;

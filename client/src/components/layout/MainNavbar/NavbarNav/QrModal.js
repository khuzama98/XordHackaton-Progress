import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";

export default function QrModal(props) {

    const [toggle, setToggle] = useState(false)
    
    return (
        <div>
            <Button onClick={() => setToggle(!toggle)}>Click Me!</Button>
            <Modal open={true} toggle={toggle}>
                <ModalHeader>Header</ModalHeader>
                <ModalBody>👋 Hello there!</ModalBody>
            </Modal>
        </div>
    );
}

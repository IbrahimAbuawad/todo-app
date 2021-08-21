import React from 'react'
import { Button } from '@blueprintjs/core';

function Footer(props) {
    return (
        <>
            <Button intent='warning' large={true} style={{ marginLeft: '40%' }} onClick={props.previous}>Previous</Button>
            <Button intent='primary' large={true} style={{ marginLeft: '10px' }} onClick={props.next}>Next</Button>
        </>
    )
}

export default Footer

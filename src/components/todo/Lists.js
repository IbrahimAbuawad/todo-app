import React from 'react'
import { ProgressBar } from '@blueprintjs/core';
function Lists(props) {

    return (
        <>
            {props.list.map((item,idx) => (
                <div key={idx}>
                    {!item.complete &&
                        <div id={item.id}>
                            <p>{item.text}</p>
                            <p><small>Assigned to: {item.assignee}</small></p>
                            <p><small>Difficulty: {item.difficulty}</small></p>
                        </div>
                    }
                    <div onClick={() => props.toggleComplete(idx)}>Complete: {item.complete.toString()}</div>
                    <button onClick={() => props.deleteItem(idx)}>X</button>
                    <ProgressBar intent='primary' animate={true} value={3} />

                </div>

            ))}
        </>
    )
}

export default Lists

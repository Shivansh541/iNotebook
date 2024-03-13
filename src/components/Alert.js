import React from 'react'

export const Alert = (props) => {
    const capitalize=(word)=>{
        const lower=word.toLowerCase()
        return lower.charAt(0).toUpperCase()+lower.slice(1)
    }
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.type}` }role="alert">
                <strong>{capitalize(props.type)}</strong> : {props.message}
            </div>}
        </div>
    )
}

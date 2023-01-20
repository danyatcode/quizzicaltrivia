import React from 'react'

export default function(props){


    return (
        <div className='question-blank'>
                    <div className='question' 
                        dangerouslySetInnerHTML={{__html:props.question}}
                    >
                    </div>
        </div>
    )
}
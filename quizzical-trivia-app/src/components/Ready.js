function Ready(props){
    return(
        <div className="ready-content">
            <h1 className="ready-title">Quizzical</h1>

            <h5 className="ready-descr">Some description if needed</h5>

            <button className="ready-btn" onClick={() => props.onClick()}>Start quiz</button>
        </div>
    )
}

export default Ready
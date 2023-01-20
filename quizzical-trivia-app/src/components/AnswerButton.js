export default function(props){
    const defaultStyle = {
        backgroundColor: 'transparent', color : '#293264'
    }

    const chosenAnswerStyle = props.isChosen?{
        backgroundColor : "#D6DBF5", color : '#293264', border : '1px solid transparent'
    }
    :defaultStyle;

    const shownIncorrectAnswerStyle = {
        backgroundColor: '#F8BCBC',
        border : '1px solid transparent',
        opacity: '0.85'
    }

    const shownCorrectAnswerStyle = {
        backgroundColor: '#94D7A2',
        border : '1px solid transparent',
    }

    const shownOtherAnswersStyle = {
        opacity: '0.3'
    }
    return(
        
        <button 
        dangerouslySetInnerHTML={{__html:props.value}}
        onClick={props.onClick} 
        style={props.isShownClicked && props.isCorrect? shownCorrectAnswerStyle:
            props.isShownClicked && !props.isChosen? shownOtherAnswersStyle:
            props.isShownClicked && !props.isCorrect? shownIncorrectAnswerStyle:
            !props.isShownClicked && props.isChosen? chosenAnswerStyle:
            props.defaultStyle
        }
        >
    </button>
        
    )
}
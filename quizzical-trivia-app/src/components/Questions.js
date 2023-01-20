import React from 'react'
import Question from './Question'
import Answer from './AnswerButton'


function Questions(){

    const [questionArray, setQuestionArray] = React.useState({
        question : '',
        correct_answer : '',
        incorrect_answers : '',
    })

    const [data, setData] = React.useState();


    const [isChosen, setIsChosen] = React.useState(false);

    const [isShownClicked, setIsShownClicked] = React.useState(false);

    const [filled, setIsFilled] = React.useState({isFilled : false, value : 0})

    React.useEffect(() => {
        async function getQuestions(){
            const res = await fetch('https://opentdb.com/api.php?amount=7&category=25')
            const data = await res.json()
            return setData(data)
        }
        getQuestions();
    }, [])
    
   React.useEffect(() => {

    if(data !== undefined){

        setQuestionArray(data.results.map( element => {
        return {
            question : element.question,
            correct_answer : element.correct_answer,
            incorrect_answers : element.incorrect_answers,
            id : (Math.random() + 1).toString(36).substring(7),
            key : (Math.random() + 1).toString(36).substring(7)
        }
        }))
        setallQuestionsBlanks(allNewBlanks());
   }}, [data])

    const [allQuestionsBlanks, setallQuestionsBlanks] = React.useState();

    function generateNewBlank(value){
        
        const booleanAnswer = [];
        if(value.correct_answer.includes('True')){
            booleanAnswer.push(value.correct_answer);
            booleanAnswer.push(...value.incorrect_answers);
            return {
                incorrect: value.incorrect_answers,
                correct: value.correct_answer,
                answers : booleanAnswer.map( element => {
                   return{
                    isChosen : isChosen,
                    id : (Math.random() + 1).toString(36).substring(7),
                    value : element
                   }
                }),
                question: value.question,
           }
        }
        if(value.incorrect_answers.includes('True')){
            booleanAnswer.push(...value.incorrect_answers);
            booleanAnswer.push(value.correct_answer);
            return {
                incorrect: value.incorrect_answers,
                correct: value.correct_answer,
                answers : booleanAnswer.map( element => {
                   return{
                    isChosen : isChosen,
                    id : (Math.random() + 1).toString(36).substring(7),
                    value : element
                   }
                }),
                question: value.question,
           }
        }
        else{
            const newArray = [...value.incorrect_answers];
            newArray.splice(Math.floor(Math.random() * value.incorrect_answers.length), 0, value.correct_answer);
            return {
                incorrect: value.incorrect_answers,
                correct: value.correct_answer,
                answers : newArray.map( element => {
                   return{
                    isChosen : isChosen,
                    id : (Math.random() + 1).toString(36).substring(7),
                    value : element
                   }
                }),
                question: value.question,
           }
        }
        
      }
    
      function allNewBlanks(){

        const newAnswersArray = []; 
        for(let i = 0; i < questionArray.length; i++){
            newAnswersArray.push(generateNewBlank(questionArray[i]))
        }
        return newAnswersArray

      }

      if(allQuestionsBlanks !== undefined && allQuestionsBlanks.length > 1){

        function chooseAnswer(id, index){

            setallQuestionsBlanks(prevAllQuestionsBlanks => prevAllQuestionsBlanks.map( blank => {
                return {...blank, answers: blank.answers.map( el => {
                if(prevAllQuestionsBlanks.indexOf(blank) === index){
                    if(el.id === id){
                        return {...el, isChosen : !el.isChosen}
                    }
                    else{
                        return {...el, isChosen : isChosen}
                    }
                }
                else{
                    return el
                }
           })
        }}))
        }

        const questionsBlank = allQuestionsBlanks.map( blank => {
            const answerElements = blank.answers.map(el => {
                return <Answer 
                id={el.id}
                key={el.id}
                isChosen={el.isChosen}
                isShownClicked={isShownClicked}
                value={el.value}
                onClick={() => chooseAnswer(el.id, allQuestionsBlanks.indexOf(blank))}
                isCorrect={el.value === blank.correct}
            />
            });

            return <div>
                <Question 
                question={blank.question}
                />
                
                <div className='answers' >
                    <div>
                        {answerElements}
                        <hr />
                    </div>
                </div>
                
            </div>

            }
            
       )

       function showAlert(num){
        const alertElem = document.getElementsByClassName('alert');
        const alertTxt = document.getElementsByClassName('alert-txt');
        alertTxt[0].innerHTML = `Please, choose answer in the blank #${num}`;

        alertElem[0].classList.add('show');
        setTimeout( function(){
            alertElem[0].classList.remove('show')
        } 
        , 1000)
       }

       function checkAnswers(){

        let alertCounter = 0;
        const array = [];

        const filledBlanks = [];

        questionsBlank.forEach( element => {

            const getChosenAnswers = element.props.children[1].props.children.props.children[0].filter( el => el.props.isChosen === true);
            
            if(getChosenAnswers.length === 0){
                array.push(questionsBlank.indexOf(element)+1);
                showAlert(array[0])
            }

            if(getChosenAnswers.length > 1){
                if(alertCounter < 2){
                    array.push(questionsBlank.indexOf(element)+1);
                    showAlert(array[0]);
                }
                alertCounter += 1;
            }

            if(getChosenAnswers.length === 1){
                filledBlanks.push(getChosenAnswers)
            }
        })
        
    
        if(filledBlanks.length === questionsBlank.length){
            setIsShownClicked(prevIsShown => !prevIsShown)

            const correctArray = [];

            filledBlanks.forEach( blank => {
                const getCorrectAnswers = blank.filter( el => el.props.isCorrect === true);

                
                if(getCorrectAnswers.length > 0){
                    correctArray.push(getCorrectAnswers)
                }
            })

            if(questionsBlank.length === filledBlanks.length){
                setIsFilled(prevIsFilled => {
                    return  {...prevIsFilled,
                        isFilled : true,
                        value: `${correctArray.length}/${filledBlanks.length}`
                    }
                })
            }
        }
        
       }
       function playAgain(){
            setallQuestionsBlanks(allNewBlanks());
            setIsFilled(prevIsFilled => {return {...prevIsFilled, isFilled: false, value : 0}});
            setIsShownClicked(false);
       }
       
        return(
            <div className='question-section'>
                <div className='question-blanks-list'>{questionsBlank}</div>
                <div className='finishQuestion'>
                    {filled.isFilled && <div>You scored {filled.value} correct answers</div>}
                    {!filled.isFilled &&<button className='check-btn' onClick={() => checkAnswers()}>Check answers</button>}
                    {filled.isFilled && <button className='check-btn' 
                    onClick={() => playAgain()}
                    >Play Again</button>}
                </div>
                <div className="alert">
                    <span>!</span>
                    <span className='alert-txt'></span>
                </div>
            </div>
        )
      }
   } //If length of data is more then > 1
    

export default Questions
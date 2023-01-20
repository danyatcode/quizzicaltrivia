import React from 'react'
import Questions from './components/Questions'
import Ready from './components/Ready'
import blopcream from './blopcream.png'
import blops from './blobs.png'


function App() {

  const [ready, SetIsReady] = React.useState(false);

  function getReady(){
    SetIsReady(true)
  }

  return (
    <div className="App">
      <main>
        {!ready && <Ready onClick={() => getReady()}/>}
         <Questions />
        <img className='blop-blue' src={blops} alt="#"/>
        <img className='blop-yellow' src={blopcream} alt="#"/>
      </main>
    </div>
  );
}

export default App;

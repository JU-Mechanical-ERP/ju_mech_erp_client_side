import { useState } from 'react'
import StudentPortfolio from './student-portfolio'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
        <StudentPortfolio />
    </>
  )
}

export default App

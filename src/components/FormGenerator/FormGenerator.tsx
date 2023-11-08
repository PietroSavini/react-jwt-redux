import { useState } from 'react'
import './style.scss'



interface Args {
    url: string,
    method: string,
}



export const FormGenerator = () => {
    const [one, setOne] = useState('')
    const[two,setTwo] = useState('')

    const[three,setThree] = useState('')    
    const[four,setFour] = useState('')

    const handleClick = (e: any)=>{
        e.preventDefault()

    }

  return (
    <>

        <h2>form unico</h2>
        <form onSubmit={handleClick}>
            
            <div id='one'>
            <h4>sottoform 1</h4>
                <input 
                    type="text" 
                    value={one}
                    onChange={(e)=>setOne(e.target.value)}
                />

                <input 
                    type="text" 
                    value={two} 
                    onChange={(e)=>setTwo(e.target.value)}
                />
            </div>
            <br />
            <br />
            <div id="two">
                <h4>sottoform 2</h4>
                <input 
                    type="text" 
                    value={three}
                    onChange={(e)=>setThree(e.target.value)}
                />

                <input 
                    type="text" 
                    value={four}
                    onChange={(e)=>setFour(e.target.value)}
                />
            </div>
            <button type="submit" >submit</button>
        </form>
    </>
  )
}

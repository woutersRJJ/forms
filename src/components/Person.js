import {useState} from "react";

export function Person({p}) {
    const [person, setPerson] = useState(p)
    const [old, setOld] = useState(p)

    const [mode, setMode] = useState('R')

    return <div className='form'>
        <label htmlFor="name">Name</label>
        <input id="name" className="input-field" type="text" disabled={mode === 'R'} value={person.name}
               onChange={e => setPerson({...person, name: e.target.value})}/>

        <label htmlFor="age">Age</label>
        <input id="age" className="input-field" type="number" disabled={mode === 'R'} value={person.age}
               onChange={e => setPerson({...person, age: e.target.value})}/>

        <button className="form-button" disabled={mode === 'W'}
                onClick={() => setMode('W')}>Update
        </button>

        <button className="form-button" disabled={mode === 'R'}
                onClick={() =>  {setPerson(old); setMode('R')}}>Cancel
        </button>

        <button className="form-button" disabled={mode === 'R'}
                onClick={() => {setMode('R'); setOld(person)} }>Save
        </button>
    </div>
}



import './App.css';
import {Person} from "./components/Person";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Effectenrekening</h1>
                <h2>Titularis</h2>
                <Person p={{name : 'Ronny' ,age : 57}}/>
            </header>
        </div>
    );
}

export default App;

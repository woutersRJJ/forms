import './App.css';
import {Person} from "./components/Person";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Person p={{name : 'Ronny' ,age : 57}}/>
            </header>
        </div>
    );
}

export default App;

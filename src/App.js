import './App.css';
import Acteurs from "./components/Acteurs";
import Bvs from "./components/Bvs";

function App() {
    return (
        <div className="App">
            <header>
                <Acteurs/>
                <Bvs/>
            </header>
        </div>
    );
}

export default App;

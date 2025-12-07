import React, {useState} from "react";

function Acteurs() {
    // Initial data
    const [acteurs, setActeurs] = useState([
        {id: 1, name: "Waldek", age: 62},
        {id: 2, name: "Frank", age: 68},
        {id: 3, name: "Marjan", age: 76}
    ]);

    const [newActeur, setNewActeur] = useState({name: "", age: ""});
    const [editingId, setEditingId] = useState(null);
    const [editActeur, setEditActeur] = useState({name: "", age: ""});

    function nextValue() {
        if (acteurs.length === 0)
            return 1
        return acteurs.find(obj => obj.id === Math.max(...acteurs.map(obj => obj.id))).id + 1
    }

    // CREATE
    const addActeur = () => {
        if (!newActeur.name || !newActeur.age) return;
        const nv = nextValue();
        console.log(nv);
        setActeurs([
            ...acteurs,
            {id: nextValue(), name: newActeur.name, age: Number(newActeur.age)},
        ]);
        setNewActeur({name: "", age: ""});
    };

    // DELETE
    const deleteActeur = (id) => {
        setActeurs(acteurs.filter((a) => a.id !== id));
    };

    // UPDATE
    const startEdit = (acteur) => {
        setEditingId(acteur.id);
        setEditActeur({name: acteur.name, age: acteur.age});
    };

    const saveEdit = () => {
        setActeurs(
            acteurs.map((a) =>
                a.id === editingId ? {...a, ...editActeur} : a
            )
        );
        setEditingId(null);
        setEditActeur({name: "", age: ""});
    };

    return (
        <div>
            <h2>Thuis acteurs</h2>

            {/* CREATE FORM */}
            <div>
                <input
                    placeholder="Naam"
                    value={newActeur.name}
                    onChange={(e) => setNewActeur({...newActeur, name: e.target.value})}
                />
                <input
                    placeholder="Leeftijd"
                    type="number"
                    value={newActeur.age}
                    onChange={(e) => setNewActeur({...newActeur, age: e.target.value})}
                />
                <button onClick={addActeur}>Acteur toevoegen</button>
            </div>

            {/* TABLE */}
            <table border="1" style={{marginTop: "20px", width: "100%"}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Naam</th>
                    <th>Leeftijd</th>
                    <th>Acties</th>
                </tr>
                </thead>
                <tbody>
                {acteurs.map((a) => (
                    <tr key={a.id}>
                        <td>{a.id}</td>
                        <td>
                            {editingId === a.id ? (
                                <input
                                    value={editActeur.name}
                                    onChange={(e) =>
                                        setEditActeur({...editActeur, name: e.target.value})
                                    }
                                />
                            ) : (
                                a.name
                            )}
                        </td>
                        <td>
                            {editingId === a.id ? (
                                <input
                                    type="number"
                                    value={editActeur.age}
                                    onChange={(e) =>
                                        setEditActeur({...editActeur, age: e.target.value})
                                    }
                                />
                            ) : (
                                a.age
                            )}
                        </td>
                        <td>
                            {editingId === a.id ? (
                                <button onClick={saveEdit}>Bewaar</button>
                            ) : (
                                <button onClick={() => startEdit(a)}>Wijzig</button>
                            )}
                            <button onClick={() => deleteActeur(a.id)}>Verwijder</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Acteurs;

import React, {useState} from "react";
import {FaSave,FaPlus, FaEdit, FaTrash} from "react-icons/fa";

function Bvs() {
    // Initial data
    const [bvs, setBvs] = useState([
        {id: 1, name: "Gert Verhulst", age: 57},
        {id: 2, name: "James", age: 37},
        {id: 3, name: "Tom Waes", age: 57}
    ]);

    const [newBv, setNewBv] = useState({name: "", age: ""});
    const [editingId, setEditingId] = useState(null);
    const [editBv, setEditBv] = useState({name: "", age: ""});

    function nextValue() {
        if (bvs.length === 0)
            return 1
        return bvs.find(obj => obj.id === Math.max(...bvs.map(obj => obj.id))).id + 1
    }

    // CREATE
    const addBv = () => {
        if (!newBv.name || !newBv.age) return;
        const nv = nextValue();
        console.log(nv);
        setBvs([
            ...bvs,
            {id: nextValue(), name: newBv.name, age: Number(newBv.age)},
        ]);
        setNewBv({name: "", age: ""});
    };

    // DELETE
    const deleteActeur = (id) => {
        setBvs(bvs.filter((b) => b.id !== id));
    };

    // UPDATE
    const startEdit = (bv) => {
        setEditingId(bv.id);
        setEditBv({name: bv.name, age: bv.age});
    };

    const saveEdit = () => {
        setBvs(
            bvs.map((b) =>
                b.id === editingId ? {...b, ...editBv} : b
            )
        );
        setEditingId(null);
        setEditBv({name: "", age: ""});
    };

    return (
        <div>
            <h2>Bv's</h2>

            {/* CREATE FORM */}
            <div>
                <input
                    placeholder="Naam"
                    value={newBv.name}
                    onChange={(e) => setNewBv({...newBv, name: e.target.value})}
                />
                <input
                    placeholder="Leeftijd"
                    type="number"
                    value={newBv.age}
                    onChange={(e) => setNewBv({...newBv, age: e.target.value})}
                />
                <FaPlus onClick={addBv}></FaPlus>
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
                {bvs.map((b) => (
                    <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>
                            {editingId === b.id ? (
                                <input
                                    value={editBv.name}
                                    onChange={(e) =>
                                        setEditBv({...editBv, name: e.target.value})
                                    }
                                />
                            ) : (
                                b.name
                            )}
                        </td>
                        <td>
                            {editingId === b.id ? (
                                <input
                                    type="number"
                                    value={editBv.age}
                                    onChange={(e) =>
                                        setEditBv({...editBv, age: e.target.value})
                                    }
                                />
                            ) : (
                                b.age
                            )}
                        </td>
                        <td>
                            {editingId === b.id ? (
                                <FaSave onClick={saveEdit}></FaSave>
                            ) : (
                                <FaEdit onClick={() => startEdit(b)}></FaEdit>
                            )}
                            <FaTrash onClick={() => deleteActeur(b.id)}></FaTrash>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Bvs;

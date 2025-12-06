import React, { useState } from "react";

function CrudTable() {
    // Initial data
    const [users, setUsers] = useState([
        { id: 1, name: "Els", age: 23 },
        { id: 2, name: "Elke", age: 28 },
        { id: 3, name: "Iris", age: 20 }
    ]);

    const [newUser, setNewUser] = useState({ name: "", age: "" });
    const [editingId, setEditingId] = useState(null);
    const [editUser, setEditUser] = useState({ name: "", age: "" });

    function nextValue(){
        return users.find(obj => obj.id === Math.max(...users.map(obj => obj.id))).id + 1
    }

    // CREATE
    const addUser = () => {
        if (!newUser.name || !newUser.age) return;
        const nv=nextValue();
        console.log(nv);
        setUsers([
            ...users,
            { id: nextValue(), name: newUser.name, age: Number(newUser.age) },
        ]);
        setNewUser({ name: "", age: "" });
    };

    // DELETE
    const deleteUser = (id) => {
        setUsers(users.filter((u) => u.id !== id));
    };

    // UPDATE
    const startEdit = (user) => {
        setEditingId(user.id);
        setEditUser({ name: user.name, age: user.age });
    };

    const saveEdit = () => {
        setUsers(
            users.map((u) =>
                u.id === editingId ? { ...u, ...editUser } : u
            )
        );
        setEditingId(null);
        setEditUser({ name: "", age: "" });
    };

    return (
        <div>
            <h2>Users Table (CRUD)</h2>

            {/* CREATE FORM */}
            <div>
                <input
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    placeholder="Age"
                    type="number"
                    value={newUser.age}
                    onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                />
                <button onClick={addUser}>Add User</button>
            </div>

            {/* TABLE */}
            <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                <thead>
                <tr>
                    <th>ID</th><th>Name</th><th>Age</th><th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((u) => (
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>
                            {editingId === u.id ? (
                                <input
                                    value={editUser.name}
                                    onChange={(e) =>
                                        setEditUser({ ...editUser, name: e.target.value })
                                    }
                                />
                            ) : (
                                u.name
                            )}
                        </td>
                        <td>
                            {editingId === u.id ? (
                                <input
                                    type="number"
                                    value={editUser.age}
                                    onChange={(e) =>
                                        setEditUser({ ...editUser, age: e.target.value })
                                    }
                                />
                            ) : (
                                u.age
                            )}
                        </td>
                        <td>
                            {editingId === u.id ? (
                                <button onClick={saveEdit}>Save</button>
                            ) : (
                                <button onClick={() => startEdit(u)}>Edit</button>
                            )}
                            <button onClick={() => deleteUser(u.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CrudTable;

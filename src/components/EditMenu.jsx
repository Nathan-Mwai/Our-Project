import React, { useState, useEffect } from 'react';

const EditMenu = ({ restaurantId }) => {
    // const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '' });
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingItem, setEditingItem] = useState({ name: '', price: '' });

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`/restaurant/${restaurantId}/menu`);
            const data = await response.json();
            setMenuItems(data.menu_items);
        };
        fetchMenu();
    }, [restaurantId]);

    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        const response = await fetch(`/menu/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });

        if (response.ok) {
            const updatedMenu = await response.json();
            setMenuItems([...menuItems, updatedMenu]);
            setNewItem({ name: '', price: '' });
        }
    };

    const handleUpdateMenuItem = async (e) => {
        e.preventDefault();
        const response = await fetch(`/menu/item/${editingItemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingItem),
        });

        if (response.ok) {
            const updatedItem = await response.json();
            setMenuItems(menuItems.map(item => (item.id === editingItemId ? updatedItem : item)));
            setEditingItemId(null);
            setEditingItem({ name: '', price: '' });
        }
    };

    const handleDeleteMenuItem = async (itemId) => {
        const response = await fetch(`/menu/item/${itemId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setMenuItems(menuItems.filter(item => item.id !== itemId));
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-lg mb-4">Edit Menu</h2>
            <form onSubmit={handleAddMenuItem} className="mb-4">
                <input
                    type="text"
                    placeholder="Menu Item"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Menu Item</button>
            </form>

            <h3 className="text-md mb-2">Current Menu Items</h3>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id} className="border p-2 mb-2">
                        {editingItemId === item.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingItem.name}
                                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                />
                                <input
                                    type="number"
                                    value={editingItem.price}
                                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                />
                                <button onClick={handleUpdateMenuItem}>Save</button>
                            </div>
                        ) : (
                            <div>
                                {item.name} - ${item.price}
                                <button onClick={() => { setEditingItemId(item.id); setEditingItem({ name: item.name, price: item.price }); }}>Edit</button>
                                <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditMenu;

import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import UpdateForm from "./components/UpdateForm";

import itemService, { Item } from "./services/item-service";
import useItems from "./hooks/useItems";
import InsertForm from "./components/InsertFrom";

function App() {
  const { items, error, isLoading, setItems, setError } = useItems();

  const deleteItem = (item: Item) => {
    const originalItems = [...items];
    setItems(items.filter((x) => x.id !== item.id));

    itemService.delete(item.id).catch((err) => {
      setError(err.message);
      setItems(originalItems);
    });
  };

  const addItem = (newName: string) => {
    const originalItems = [...items];

    let max: number = items[0].id;
    for (let i = 0; i < items.length; i++) {
      if (max < items[i].id) max = items[i].id;
    }

    const newItem = { id: max + 1, name: newName };
    setItems([...items, newItem]);

    itemService
      .create(newItem)
      .then(() => {
        setItems([...items, newItem]);
      })
      .catch((err) => {
        setError(err.message);
        setItems([...originalItems]);
      });
  };

  const updateItem = (item: Item) => {
    const originalItems = [...items];
    const updatedItem = { ...item, name: item.name };
    setItems(items.map((u) => (u.id === item.id ? updatedItem : u)));

    itemService.update(updatedItem).catch((err) => {
      setError(err.message);
      setItems([...originalItems]);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}

      {/*Here we render the items in a list*/}
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
          >
            {item.name}
            {/*Delete Button*/}
            <div>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteItem(item)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <br />

      <InsertForm onSubmit={(data) => addItem(data.name)}></InsertForm>
      <br />

      <UpdateForm onSubmit={(data) => updateItem(data)} />
    </>
  );
}

export default App;

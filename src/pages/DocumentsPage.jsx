import React, { useState, useEffect } from "react";
import { Button } from "@blueprintjs/core";

export const DocumentsPage = () => {
  const [things, setThings] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleCreateThing = async () => {
    const thing = { hello: "world", foo: "bar" };
    await window.ipcRenderer.invoke("things.insert", thing);
    setRefresh(true);
  };

  const handleUpdateThing = async (id) => {
    await window.ipcRenderer.invoke("things.update", id, { hello: "Bob" });
    setRefresh(true);
  };

  const handleDeleteThing = async (id) => {
    await window.ipcRenderer.invoke("things.remove", id);
    setRefresh(true);
  };

  useEffect(() => {
    setRefresh(false);
    window.ipcRenderer.invoke("things.find", {}).then((results) => {
      setThings(results);
    });
  }, [refresh]);

  return (
    <>
      <Button text="Create thing" onClick={handleCreateThing} />
      {things.length > 0 && (
        <div>
          <ul>
            {things.map((thing) => (
              <li key={thing.id}>
                {JSON.stringify(thing)} <Button text="update" onClick={() => handleUpdateThing(thing.id)} />{" "}
                <Button text="x" onClick={() => handleDeleteThing(thing.id)} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

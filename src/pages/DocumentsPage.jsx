import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, HTMLTable } from "@blueprintjs/core";
import { insertThing, updateThing, deleteThingById, getAllThings } from "../api/things";

const DocumentsTable = styled(HTMLTable)`
  width: 100%;
  margin-top: 1rem;
`;

export const DocumentsPage = () => {
  const [things, setThings] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleCreateThing = async () => {
    const thing = { hello: "world", foo: "bar" };
    await insertThing(thing);
    setRefresh(true);
  };

  const handleUpdateThing = async (id) => {
    updateThing(id, { hello: "Bob" });
    setRefresh(true);
  };

  const handleDeleteThing = async (id) => {
    await deleteThingById(id);
    setRefresh(true);
  };

  useEffect(() => {
    setRefresh(false);
    getAllThings().then((results) => {
      setThings(results);
    });
  }, [refresh]);

  return (
    <>
      <Button text="Create thing" onClick={handleCreateThing} />
      {things.length > 0 && (
        <div>
          <DocumentsTable condensed striped>
            <tbody>
              {things.map((thing) => (
                <tr key={thing.id}>
                  <td>{JSON.stringify(thing)}</td>
                  <td>
                    <Button icon="refresh" onClick={() => handleUpdateThing(thing.id)} />{" "}
                    <Button icon="delete" onClick={() => handleDeleteThing(thing.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </DocumentsTable>
        </div>
      )}
    </>
  );
};

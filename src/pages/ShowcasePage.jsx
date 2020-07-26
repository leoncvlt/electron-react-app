import React, { useState } from "react";
import { Button } from "@blueprintjs/core";

export const ShowcasePage = () => {
  const [files, setFiles] = useState([]);

  const handleDialogButton = async () => {
    const dialog = await window.ipcRenderer.invoke("open-dialog");
    if (!dialog.canceled) {
      setFiles(dialog.filePaths);
    }
  };

  return (
    <>
      <Button text="Open files" onClick={handleDialogButton} />
      {files.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

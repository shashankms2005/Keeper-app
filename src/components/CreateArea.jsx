import React, { useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import CreateNote from "./createNote";
function CreateArea() {
  const [isBool, setIsBool] = useState(false);

  const [mainTitle, setMainTitle] = useState("");
  const [mainNote, setMainNote] = useState("");
  const [nodes, setNodes] = useState([{ t: " ", n: " " }]);

  const tRef = useRef();
  const nRef = useRef();

  function handleTitleChange(event) {
    tRef.current.style.color = "red";
    setMainTitle(event.target.value);
  }

  function handleNoteChange(event) {
    setMainNote(event.target.value);
  }

  function handleClick(event) {
    event.preventDefault();
    const newdata = { t: mainTitle, n: mainNote };
    setNodes((prevValue) => [...prevValue, newdata]);
    setMainTitle("");
    setMainNote("");
    setIsBool(false);
  }

  function handleDel(event) {
    setNodes(nodes.filter((n, i) => i != event));
  }

  function handleNoteClick() {
    setIsBool(true);
  }

  return (
    <div>
      <form className="create-note">
        {isBool ? (
          <input
            ref={tRef}
            value={mainTitle}
            name="title"
            placeholder="Title"
            onChange={handleTitleChange}
          />
        ) : null}

        <textarea
          ref={nRef}
          onClick={() => {
            handleNoteClick();
            {
              isBool
                ? (nRef.current.style.border = "1px solid black")
                : (nRef.current.style.border = "none");
            }
          }}
          value={mainNote}
          name="content"
          placeholder="Take a note..."
          onChange={handleNoteChange}
          rows={isBool ? "3" : "1"}
        />
        {isBool ? (
          <Zoom in={true}>
            <Fab onClick={handleClick}>
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}
      </form>

      {nodes.map((node, index) =>
        node.t === " " && node.n === " " ? null : (
          <CreateNote
            id={index}
            key={index}
            title={node.t}
            content={node.n}
            Clicked={handleDel}
          />
        )
      )}
    </div>
  );
}

export default CreateArea;

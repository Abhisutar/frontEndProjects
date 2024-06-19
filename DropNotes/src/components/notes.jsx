import React, { createRef, useEffect, useRef } from "react";
import Note from "./Note";

export default function Notes({ notes = [], setNotes = () => {} }) {
  const determineNewPosition = () => {
    const maxX = window.innerHeight - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  useEffect(() => {
    console.log(notes, "notes___");

    const savedNotes = [];
    const updatedNotes = notes?.map((note) => {
      console.log(note, "insideMao");
      const savedNotesValue = savedNotes?.find((ele) => ele.id === note.id);
      console.log(savedNotesValue, "savtedNotes___");
      if (savedNotesValue) {
        return { ...note, position: savedNotesValue?.position };
      } else {
        console.log("called");
        const position = determineNewPosition();
        console.log(position, "mainPosition");
        return { ...note, position };
      }
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const notesRefs = useRef([]);

  const handleDragStart = (note, e) => {
    const noteRef = notesRefs.current[note.id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const startPosition = note;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = {
        x: finalRect.left,
        y: finalRect.top,
      };

      console.log(newPosition, "newPostionds__");

      if (false) {
      } else {
        updateNotePositions(note.id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    console.log(e.clientX, rect.left, "Rect__");
  };

  // const checkForOverLap = (id) => {
  //   const currentNotRef = noteRef.current[id].current;
  //   const rect = currentNotRef.getBoundingClientRect();

  //   return notes.some((note) => {
  //     if (note.id === id) return false;
  //     const otherNoteRef = noteRef.current[note.id].current
  //     const otherRect = otherNoteRef.getBoundingClientRect()

  //     const overlap = curen

  //   });
  // };

  const updateNotePositions = (id, newPosition) => {
    console.log(id, newPosition, "bothPositon__");
    const updateNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            position: newPosition,
          }
        : note
    );
    console.log(updateNotes, "updateNotesd___");
    setNotes(updateNotes);
  };

  return (
    <>
      {notes?.map((note) => {
        return (
          <div key={note.id}>
            <Note
              ref={
                notesRefs.current[note.id]
                  ? notesRefs.current[note.id]
                  : (notesRefs.current[note.id] = createRef())
              }
              key={note.id}
              initialPosition={note.position}
              context={note.text}
              onMouseDown={(e) => handleDragStart(note, e)}
            />
          </div>
        );
      })}
    </>
  );
}

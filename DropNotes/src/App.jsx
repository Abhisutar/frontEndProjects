import { useState } from "react";

import "./App.css";
import Notes from "./components/notes";

export const IntialNotes = [
  {
    id: 1,
    text: "React learning",
  },
  {
    id: 2,
    text: "Back End Learning",
  },
];

function App() {
  const [notes, setNotes] = useState(IntialNotes);

  return (
    <>
      <Notes notes={notes} setNotes={setNotes} />
      <>Abhishek</>
    </>
  );
}

export default App;

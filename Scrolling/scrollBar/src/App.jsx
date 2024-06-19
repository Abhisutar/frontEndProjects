import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setCount((preCount) => preCount + 10);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(<div id="card">{i + 1}</div>);
  }

  return (
    <>
      <div className="App">{elements}</div>
    </>
  );
}

export default App;

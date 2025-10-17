import { useState } from "react";
import "./App.css";

interface ApiResponse {
  message: string;
}

function App() {
  const [responseMessage, setResponseMessage] = useState<string>("");

  async function helloworld(): Promise<void> {
    const url = "http://localhost:8000/hello";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log(data);

      setResponseMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setResponseMessage(`Erreur : ${error.message}`);
      } else {
        console.error("Erreur inconnue", error);
        setResponseMessage("Erreur inconnue");
      }
    }
  }

  return (
    <>
      <div className="card">
        <button onClick={helloworld}>Appeler le backend</button>

        {responseMessage && (
          <pre style={{ textAlign: "left", marginTop: "1em" }}>
            {responseMessage}
          </pre>
        )}
      </div>
    </>
  );
}

export default App;

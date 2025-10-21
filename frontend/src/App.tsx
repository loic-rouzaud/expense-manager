import { useState } from "react";
import "./App.css";

interface UserResponse {
  id?: number;
  name?: string;
  email?: string;
  created_at?: string;
  message?: string;
}

function App() {
  const [responseMessage, setResponseMessage] = useState<string>("");

  async function getUser(): Promise<void> {
    const url = "http://localhost:8000/user";

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      const data: UserResponse = await response.json();
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
        <button onClick={getUser}>Get users</button>

        {responseMessage && (
          <pre style={{ textAlign: "center", marginTop: "1em" }}>
            {responseMessage}
          </pre>
        )}
      </div>
    </>
  );
}

export default App;

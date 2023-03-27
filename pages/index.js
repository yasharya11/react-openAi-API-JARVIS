import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [requestQueryInput, setRequestQueryInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestQuery: requestQueryInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data);
      setResult(data.result);
      setRequestQueryInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Say Hello To J.A.R.V.I.S</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="requestQuery"
            placeholder="Enter an request"
            value={requestQueryInput}
            onChange={(e) => setRequestQueryInput(e.target.value)}
          />
          <input type="submit" value="Generate response" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

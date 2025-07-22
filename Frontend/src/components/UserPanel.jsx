import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const GENERATE_TEXT = gql`
  mutation GenerateText(
    $prompt: String!, 
    $tone: String, 
    $language: String, 
    $length: String
  ) {
    generateText(
      prompt: $prompt, 
      tone: $tone, 
      language: $language, 
      length: $length
    ) {
      result
    }
  }
`;

const GENERATE_IMAGE = gql`
  mutation GenerateImage($prompt: String!) {
    generateImage(prompt: $prompt) {
      imageBase64
    }
  }
`;

export default function UserPanel() {
  const [type, setType] = useState("text");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("neutre");
  const [language, setLanguage] = useState("fr");
  const [length, setLength] = useState("moyen");
  const [result, setResult] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);

  const [generateText, { loading: loadingText }] = useMutation(GENERATE_TEXT);
  const [generateImage, { loading: loadingImage }] = useMutation(GENERATE_IMAGE);

  const handleGenerate = async () => {
    setError(null);
    setResult("");
    setImageBase64(null);

    if (!prompt.trim()) {
      alert("Veuillez entrer un prompt.");
      return;
    }

    if (type === "text") {
      try {
        const { data } = await generateText({
          variables: { prompt, tone, language, length },
        });
        setResult(data.generateText.result);
      } catch (err) {
        setError("Erreur lors de la génération : " + err.message);
      }
    } else if (type === "image") {
      try {
        const { data } = await generateImage({ variables: { prompt } });
        setImageBase64(data.generateImage.imageBase64);
      } catch (err) {
        setError("Erreur lors de la génération d'image : " + err.message);
      }
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Générateur IA</h2>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Texte</option>
        <option value="image">Image</option>
      </select>

      <textarea
        placeholder="Entrez un prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: 10 }}
      />

      {type === "text" && (
        <>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="neutre">Neutre</option>
            <option value="convivial">Convivial</option>
            <option value="formel">Formel</option>
          </select>

          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
          </select>

          <select value={length} onChange={(e) => setLength(e.target.value)}>
            <option value="court">Court</option>
            <option value="moyen">Moyen</option>
            <option value="long">Long</option>
          </select>
        </>
      )}

      <button
        onClick={handleGenerate}
        disabled={loadingText || loadingImage}
        style={{ marginTop: 10, padding: "10px 20px" }}
      >
        {loadingText || loadingImage ? "Génération en cours..." : "Générer"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {type === "text" && result && (
        <textarea
          readOnly
          value={result}
          rows={10}
          style={{ width: "100%", marginTop: 10 }}
        />
      )}

      {type === "image" && imageBase64 && (
        <img
          src={`data:image/png;base64,${imageBase64}`}
          alt="Image générée"
          style={{ marginTop: 10, width: "100%" }}
        />
      )}
    </div>
  );
}

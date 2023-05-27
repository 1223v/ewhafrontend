import React, { useEffect } from "react";
import useScript from "../../../../hooks/useScript";

const TextAEEditor = () => {
  const [loading, error] = useScript(
    "https://textae.pubannotation.org/lib/textae.min.js"
  );
  if (error) return <p>Error!</p>;
  if (loading) return <p>Loading...</p>;
  return <div id="textae" className="textae-editor" mode="edit"></div>;
};

export default TextAEEditor;

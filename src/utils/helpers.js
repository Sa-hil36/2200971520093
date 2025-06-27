// import React, { useState } from "react";
// import { TextField, Button, Card, Typography } from "@mui/material";
// import { isValidURL, generateShortcode } from "../utils/helpers";
// import { logger } from "../utils/logger";

// function Home() {
//   const [inputs, setInputs] = useState([{ url: "", shortcode: "", validity: "" }]);
//   const [results, setResults] = useState([]);

//   const handleInputChange = (index, field, value) => {
//     const newInputs = [...inputs];
//     newInputs[index][field] = value;
//     setInputs(newInputs);
//   };

//   const addInputField = () => {
//     if (inputs.length < 5) {
//       setInputs([...inputs, { url: "", shortcode: "", validity: "" }]);
//     }
//   };

//   const shortenURLs = () => {
//     const newResults = [];

//     for (let input of inputs) {
//       if (!isValidURL(input.url)) {
//         alert("Invalid URL");
//         return;
//       }

//       const code = input.shortcode || generateShortcode();
//       const validity = input.validity ? parseInt(input.validity) : 30;
//       const expiry = new Date(Date.now() + validity * 60 * 1000);

//       const entry = {
//         longURL: input.url,
//         shortURL: `http://localhost:3000/${code}`,
//         code,
//         expiry: expiry.toISOString(),
//         createdAt: new Date().toISOString(),
//         clicks: [],
//       };

//       // Save in localStorage
//       let stored = JSON.parse(localStorage.getItem("urlData") || "{}");
//       if (stored[code]) {
//         alert(`Shortcode '${code}' already exists`);
//         return;
//       }
//       stored[code] = entry;
//       localStorage.setItem("urlData", JSON.stringify(stored));

//       logger("SHORTEN_URL", entry);
//       newResults.push(entry);
//     }

//     setResults(newResults);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h4" gutterBottom>URL Shortener</Typography>
//       {inputs.map((input, idx) => (
//         <Card key={idx} style={{ marginBottom: 10, padding: 10 }}>
//           <TextField fullWidth label="Long URL" value={input.url} onChange={(e) => handleInputChange(idx, "url", e.target.value)} />
//           <TextField fullWidth label="Custom Shortcode (optional)" value={input.shortcode} onChange={(e) => handleInputChange(idx, "shortcode", e.target.value)} />
//           <TextField fullWidth label="Validity in minutes (optional)" value={input.validity} onChange={(e) => handleInputChange(idx, "validity", e.target.value)} />
//         </Card>
//       ))}
//       <Button variant="contained" onClick={addInputField} disabled={inputs.length >= 5}>Add More</Button>
//       <Button variant="contained" color="primary" onClick={shortenURLs} style={{ marginLeft: 10 }}>Shorten</Button>

//       <div style={{ marginTop: 20 }}>
//         {results.map((res, idx) => (
//           <Card key={idx} style={{ marginTop: 10, padding: 10 }}>
//             <Typography><strong>Short URL:</strong> {res.shortURL}</Typography>
//             <Typography><strong>Expires At:</strong> {res.expiry}</Typography>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

// ✅ URL validator
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// ✅ Shortcode generator (6-character alphanumeric)
export const generateShortcode = () => {
  return Math.random().toString(36).substring(2, 8);
};

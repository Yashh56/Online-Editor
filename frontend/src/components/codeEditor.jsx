import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const submitCode = async () => {
    try {
      const res = await axios.post("http://localhost:3000/compile/Py", { code });
      console.log(res.data);
      setOutput(res.data.output);
    } catch (error) {
      console.error(error);
    }
  };

 
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 h-screen bg-[#1E1E1E]">
      <div className="flex flex-col p-4">
        <Editor
          height="70vh"
          defaultLanguage="python"
          defaultValue="# Write your Python code here"
          value={code}
          onChange={(value) => setCode(value)}
          theme="vs-dark"
        />
        <button
          onClick={submitCode}
          className="h-10 px-5 mt-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Run
        </button>
      </div>
      <div className="flex flex-col justify-start items-center p-4 bg-[#1E1E1E] text-white overflow-auto">
        <h2 className="text-xl font-bold mb-4">Output</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
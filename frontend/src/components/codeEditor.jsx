import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const languages = [
  { name: "Python", value: "python", endpoint: "compile/Py" },
  { name: "C++", value: "cpp", endpoint: "compile/C" },
  { name: "Java", value: "java", endpoint: "compile/Java" },
];

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState(languages[0].value);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('code', code);
  }, [code]);

  const submitCode = async () => {
    try {
      const selectedLanguage = languages.find(
        (lang) => lang.value === language
      );
      const res = await axios.post(
        `http://localhost:3000/${selectedLanguage.endpoint}`,
        { code }
      );
      console.log(res.data);
      setOutput(res.data.output);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-screen bg-[#1E1E1E]">
      <div
        className={`fixed lg:relative z-20 ${
          drawerOpen ? "block" : "hidden"
        } lg:block bg-[#1E1E1E] text-white w-64 p-4`}
      >
        <h2 className="text-xl font-bold mb-4">Choose Language</h2>
        <ul>
          {languages.map((lang) => (
            <li key={lang.value} className="mb-2">
              <button
                className={`w-full text-left p-2 rounded ${
                  language === lang.value ? "bg-indigo-700" : "bg-gray-700"
                } hover:bg-indigo-600`}
                onClick={() => {
                  setLanguage(lang.value);
                  setDrawerOpen(false);
                }}
              >
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 flex-grow">
        <button
          className="lg:hidden p-2 m-2 bg-indigo-700 text-white rounded"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? "Close Drawer" : "Open Drawer"}
        </button>

        <div className="flex flex-col p-4">
          <Editor
            height="70vh"
            defaultLanguage={language}
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
    </div>
  );
};

export default CodeEditor;

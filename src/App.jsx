import React, { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  // A reference to the password input field to help with copying.
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSpecial) chars += "!@#$%^&*()-_=+[]{};:,.<>?/";

    let newPass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPass += chars.charAt(randomIndex);
    }
    setPassword(newPass);
  }, [length, includeNumbers, includeSpecial]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSpecial, generatePassword]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      // For mobile device compatibility
      passwordRef.current.setSelectionRange(0, 99999);
      try {
        document.execCommand("copy");
        setCopySuccess("Copied!");
        // Reset the message after 2 seconds.
        setTimeout(() => setCopySuccess(""), 2000);
      } catch (err) {
        setCopySuccess("Failed to copy!");
        setTimeout(() => setCopySuccess(""), 2000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Password Generator
        </h1>

        {/* Display for the password and the copy button */}
        <div className="flex mb-6 relative">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your password"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-r-lg transition duration-200"
          >
            Copy
          </button>
          {/* Display copy success message */}
          {copySuccess && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm py-1 px-3 rounded-md transition-opacity duration-300">
              {copySuccess}
            </div>
          )}
        </div>

        {/* Controls for password generation */}
        <div className="space-y-6">
          {/* Length slider */}
          <div className="text-left">
            <label htmlFor="length" className="text-lg text-gray-300">
              Length: {length}
            </label>
            <input
              id="length"
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
            />
          </div>

          {/* Checkboxes for character types */}
          <div className="flex justify-around text-lg">
            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
                className="w-5 h-5 accent-blue-600"
              />
              Numbers
            </label>

            <label className="flex items-center gap-3 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSpecial}
                onChange={() => setIncludeSpecial((prev) => !prev)}
                className="w-5 h-5 accent-blue-600"
              />
              Symbols
            </label>
          </div>
        </div>

        {/* Generate new password button */}
        <button
          onClick={generatePassword}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 mt-8 rounded-lg transition duration-200 text-lg"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

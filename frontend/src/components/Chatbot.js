import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("vi");

  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/translate", {
        text: inputText,
        target_lang: targetLang,
      });
      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.error("Lỗi khi dịch:", error);
    }
  };

  return (
    <div>
      <h2>Chatbot Dịch Văn Bản</h2>
      <textarea
        placeholder="Nhập văn bản..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <select
        onChange={(e) => setTargetLang(e.target.value)}
        value={targetLang}
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
        <option value="fr">Tiếng Pháp</option>
      </select>
      <button onClick={handleTranslate}>Dịch</button>
      <h3>Kết quả dịch:</h3>
      <p>{translatedText}</p>
    </div>
  );
};

export default Chatbot;

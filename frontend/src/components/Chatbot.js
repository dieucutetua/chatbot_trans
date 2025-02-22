import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("vi");
  const [audioUrl, setAudioUrl] = useState("");

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

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/speak_from_text",
        {
          text: translatedText,
          lang: targetLang,
        },
        { responseType: "blob" } // Nhận file âm thanh dưới dạng blob
      );

      // Tạo URL từ blob
      const url = URL.createObjectURL(new Blob([response.data]));
      setAudioUrl(url);
    } catch (error) {
      console.error("Lỗi khi tạo giọng nói:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">Chatbot Dịch Văn Bản</h2>
      <textarea
        placeholder="Nhập văn bản..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="chatbot-textarea"
      />
      <select
        onChange={(e) => setTargetLang(e.target.value)}
        value={targetLang}
        className="chatbot-select"
      >
        <option value="vi">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
        <option value="fr">Tiếng Pháp</option>
      </select>
      <button onClick={handleTranslate} className="chatbot-button">
        Dịch
      </button>
      <h3 className="chatbot-result-title">Kết quả dịch:</h3>
      <p className="chatbot-result-text">{translatedText}</p>

      {/* Nút phát âm thanh */}
      {translatedText && (
        <button onClick={handleTextToSpeech} className="chatbot-button">
          Phát âm thanh
        </button>
      )}

      {/* Phát âm thanh nếu có */}
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mp3" />
          Trình duyệt của bạn không hỗ trợ phát âm thanh.
        </audio>
      )}
    </div>
  );
};

export default Chatbot;

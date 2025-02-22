from fastapi import FastAPI
from pydantic import  BaseModel
from fastapi.middleware.cors import CORSMiddleware
from translator import translate_text
from fastapi.responses import FileResponse
from gtts import gTTS
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)
class TranslationRequest(BaseModel):
    text: str
    target_lang: str #"vi", "en", "fr"
@app.post("/translate")
async def translate(request: TranslationRequest):
    translated_text = translate_text(request.text, request.target_lang)
    return{"translated_text": translated_text}
@app.post("/speak_from_text")
async def speak_from_text(request : TranslationRequest):
    audio_file = "out.mp3"
    try:
        translated_text = translate_text(request.text, request.target_lang)

        tts = gTTS(text = translated_text , lang=request.target_lang)

        
        tts.save(audio_file)

        return FileResponse(audio_file, media_type="audio/mp3", filename=audio_file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi tạo giọng nói: {str(e)}")
    finally:
        # Xóa file âm thanh sau khi trả về
        if os.path.exists(audio_file):
            os.remove(audio_file)
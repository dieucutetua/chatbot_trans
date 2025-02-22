from fastapi import FastAPI
from pydantic import  BaseModel
from fastapi.middleware.cors import CORSMiddleware
from translator import translate_text

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả nguồn (có thể giới hạn lại)
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả phương thức (GET, POST, PUT, DELETE,...)
    allow_headers=["*"],  # Cho phép tất cả headers
)
class TranslationRequest(BaseModel):
    text: str
    target_lang: str #"vi", "en", "fr"
@app.post("/translate")
async def translate(request: TranslationRequest):
    translated_text = translate_text(request.text, request.target_lang)
    return{"translated_text": translated_text}
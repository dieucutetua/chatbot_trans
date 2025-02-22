from googletrans import Translator

def translate_text(text: str, target_lang: str)->str:
    translator = Translator()
    result = translator.translate(text, dest = target_lang)
    return result.text
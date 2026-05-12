from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io
import math

app = FastAPI()

# Загрузите модель YOLOv8
model = YOLO('best.pt')

def calculate_score(trash_before, trash_after):
    """
    Рассчитывает оценку от 1 до 5 на основе процента убранного мусора
    
    Args:
        trash_before: количество мусора до уборки
        trash_after: количество мусора после уборки
    
    Returns:
        dict: оценка и процент убранного мусора
    """
    if trash_before == 0:
        # Если изначально мусора не было, то оценка 5
        return {
            "score": 5,
            "percentage_cleaned": 100,
            "trash_removed": 0
        }
    
    trash_removed = trash_before - trash_after
    percentage_cleaned = (trash_removed / trash_before) * 100
    
    # Рассчет оценки от 1 до 5 на основе процента убранного мусора
    if percentage_cleaned >= 90:
        score = 5
    elif percentage_cleaned >= 70:
        score = 4
    elif percentage_cleaned >= 50:
        score = 3
    elif percentage_cleaned >= 30:
        score = 2
    elif percentage_cleaned >= 0:
        score = 1
    else:
        # Если мусора стало больше (отрицательный процент)
        score = 1
    
    return {
        "score": score,
        "percentage_cleaned": round(percentage_cleaned, 2),
        "trash_removed": trash_removed
    }

@app.post("/evaluate")
async def evaluate(before: UploadFile = File(...), after: UploadFile = File(...)):
    """
    Оценивает эффективность уборки мусора
    
    Parameters:
    - before: фото до уборки
    - after: фото после уборки
    
    Returns:
    - trash_before: количество мусора до уборки
    - trash_after: количество мусора после уборки
    - trash_removed: количество убранного мусора
    - percentage_cleaned: процент убранного мусора
    - score: оценка от 1 до 5 (5 - отлично, 1 - плохо)
    """
    try:
        # Загрузите фото "до" и "после"
        before_image = Image.open(io.BytesIO(await before.read()))
        after_image = Image.open(io.BytesIO(await after.read()))

        # Преобразуйте в формат OpenCV
        before_img = cv2.cvtColor(np.array(before_image), cv2.COLOR_RGB2BGR)
        after_img = cv2.cvtColor(np.array(after_image), cv2.COLOR_RGB2BGR)

        # Обработайте фото "до"
        results_before = model(before_img)
        trash_count_before = len(results_before[0].boxes)

        # Обработайте фото "после"
        results_after = model(after_img)
        trash_count_after = len(results_after[0].boxes)

        # Рассчитайте оценку
        evaluation = calculate_score(trash_count_before, trash_count_after)
        
        # Визуализируйте результаты (опционально, если нужно вернуть изображения)
        visualized_before = results_before[0].plot()
        visualized_after = results_after[0].plot()
        
        # Преобразуем визуализации в base64 для возврата
        _, buffer_before = cv2.imencode('.jpg', visualized_before)
        _, buffer_after = cv2.imencode('.jpg', visualized_after)
        
        import base64
        before_base64 = base64.b64encode(buffer_before).decode('utf-8')
        after_base64 = base64.b64encode(buffer_after).decode('utf-8')

        # Верните результат
        return JSONResponse(
            content={
                "trash_before": trash_count_before,
                "trash_after": trash_count_after,
                "trash_removed": evaluation["trash_removed"],
                "percentage_cleaned": evaluation["percentage_cleaned"],
                "score": evaluation["score"],
                "visualized_before": before_base64,
                "visualized_after": after_base64
            }
        )

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/")
async def root():
    """
    Проверка работоспособности API
    """
    return {
        "message": "API для оценки уборки мусора",
        "version": "1.0",
        "endpoints": {
            "POST /evaluate": "Оценить эффективность уборки",
            "GET /": "Информация об API"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001)
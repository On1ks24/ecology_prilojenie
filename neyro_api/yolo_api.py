from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse, Response
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Загрузите модель YOLOv8
model = YOLO('best.pt')

@app.post("/evaluate")
async def evaluate(before: UploadFile = File(...), after: UploadFile = File(...)):
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
        score = trash_count_before - trash_count_after

        # Визуализируйте результаты
        visualized_before = results_before[0].plot()
        visualized_after = results_after[0].plot()

        # Сохраните визуализации во временные файлы
        cv2.imwrite("visualized_before.jpg", visualized_before)
        cv2.imwrite("visualized_after.jpg", visualized_after)

        # Верните оценку и пути к визуализациям
        return JSONResponse(
            content={
                "score": score,
                "trash_count_before": trash_count_before,
                "trash_count_after": trash_count_after,
                "visualized_before_path": "visualized_before.jpg",
                "visualized_after_path": "visualized_after.jpg"
            }
        )

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)

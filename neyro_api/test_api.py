import requests

url = 'http://localhost:5000/evaluate'

# Укажите пути к фотографиям
before_photo_path = 'istockphoto-2145395704-612x612.jpg'
after_photo_path = 'Screenshot_6.png'

with open(before_photo_path, 'rb') as before_file, open(after_photo_path, 'rb') as after_file:
    files = {
        'before': before_file,
        'after': after_file
    }

    response = requests.post(url, files=files)
    result = response.json()

    print(f"Оценка: {result['score']}")
    print(f"Мусор до: {result['trash_count_before']}")
    print(f"Мусор после: {result['trash_count_after']}")
    print(f"Визуализация до: {result['visualized_before_path']}")
    print(f"Визуализация после: {result['visualized_after_path']}")

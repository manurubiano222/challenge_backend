Esta API permite subir y procesar archivos Excel, almacenando los datos y errores de validación en MongoDB. Utiliza Node.js, Express, Bull (Redis) para manejar tareas en segundo plano y Multer para la carga de archivos.

Instalación y Configuración

🔹 Requisitos

Node.js (v14+ recomendado)

MongoDB (local o en la nube)

Redis (para la cola de tareas)

npm (o yarn si prefieres)

🔹 Instalación

Clonar el repositorio

git clone https://github.com/manurubiano222/challenge_backend.git

Instalar dependencias

npm install

Configurar variables de entornoCrea un archivo .env en la raíz con:

MONGO_URI=mongodb://localhost:27017/challenge_backend
API_KEY=secreto
PORT=3000

🔹 Ejecutar la API

🖥️ Windows (CMD o PowerShell)

mongod --dbpath "C:\data\db"  # Iniciar MongoDB si es local
redis-server                   # Iniciar Redis si está instalado
docker run --name redis -p 6379:6379 -d redis # Iniciar Redis con docker
npm start                       # Iniciar la API

🖥️ Linux / Mac

sudo service mongod start  # Iniciar MongoDB
redis-server &             # Iniciar Redis en segundo plano
npm start                  # Iniciar la API

📌 Endpoints y Pruebas

🔹  Subir un archivo

Endpoint:

POST /upload

Autenticación: Header API_KEY: secreto

Formato: multipart/form-data

Parámetros:

file: Archivo Excel (.xlsx)

🖥️ Ejemplo de uso en Windows (CMD o PowerShell)

curl.exe -X POST -H "x-api-key: secreto" -F "file=@C:\ruta\archivo.xlsx" http://localhost:3000/api/upload

🖥️ Ejemplo de uso en Linux / Mac

curl -X POST "http://localhost:3000/upload" -H "API_KEY: secreto" -F "file=@/ruta/archivo.xlsx"

✅ Respuesta esperada

{
  "taskId": "65e8b2f9d1a2...",
  "message": "Archivo en proceso"
}

🔹  Consultar el estado de una tarea

Endpoint:

GET /tasks/:taskId

Autenticación: Header API_KEY: secreto

🖥️ Ejemplo de uso en Windows (CMD o PowerShell)

curl.exe -H "x-api-key: secreto" http://localhost:3000/api/task/{taskID} 

🖥️ Ejemplo de uso en Linux / Mac

curl -X GET "http://localhost:3000/tasks/{taskID}" -H "API_KEY: secreto"

✅ Respuesta esperada

{
  "status":"done",
  "errors":3
}

🔹  Consultar los errores de una tarea

Endpoint:

GET /tasks/:taskId/errors

Autenticación: Header API_KEY: secreto

🖥️ Ejemplo de uso en Windows (CMD o PowerShell)

curl.exe -H "x-api-key: secreto" http://localhost:3000/api/task/{taskID}/errors

🖥️ Ejemplo de uso en Linux / Mac

curl -X GET "http://localhost:3000/tasks/{taskID}/errors" -H "API_KEY: secreto"

✅ Respuesta esperada

{
  "errors":[{"row":3,"col":1},{"row":3,"col":2},{"row":5,"col":2}],
  "totalErrors":3
}

🔹  Consultar los datos de una tarea

Endpoint:

GET /tasks/:taskId/data

Autenticación: Header API_KEY: secreto

🖥️ Ejemplo de uso en Windows (CMD o PowerShell)

curl.exe -H "x-api-key: secreto" http://localhost:3000/api/task/{taskID}/data

🖥️ Ejemplo de uso en Linux / Mac

curl -X GET "http://localhost:3000/tasks/{taskID}/data" -H "API_KEY: secreto"

✅ Respuesta esperada

{
  "data":
  [{"nums":[1,3,8,9,12,32,34,78,97,100],"_id":"67c095b3f3d91a06f40114ad","name":"Esteban","age":30},
  {"nums":[5,10,15],"_id":"67c095b3f3d91a06f40114ae","name":"Ana","age":25}]
}
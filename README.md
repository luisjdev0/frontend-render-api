# Frontend Render API

Api sencilla la cual permite renderizar frontend a partir de HTML, JS, entre otros y revolver como texto plano el HTML final basado en Chromium.
El objetivo de esta API es poder renderizar contenido de una manera sencilla y rapida, en contextos de backend donde no se dispone de un navegador o se desea evitar la complejidad de manejar uno.

## Despliegue

1. Clonar el repositorio
```bash
git clone https://github.com/luisjdev0/frontend-render-api.git
```

2. Instalar las dependencias (puppeteer puede requerir configuraciones adicionales en tu entorno)
```bash
cd frontend-render-api
npm install
```

3. Compilar el proyecto de TypeScript a JavaScript con tu compilador preferico como `tsc`, `bun`, entre otros.
```bash
bun build app.ts --target=node --outdir dist --minify
```

4. Configurar las variables de entorno a partir del archivo `.env.example`, renombra el archivo `.env.example` a `.env` y modifica las variables según tus necesidades:

```env
SERVER_PORT=3000
API_ID="YOUR_API_ID"
JWT_SECRET_KEY="YOUR_SIGNATURE_KEY"
```

5. Iniciar la API

```bash
node app.js
```

## Uso
Puedes hacer peticiones a la API utilizando herramientas como `curl`, `Postman` o cualquier cliente HTTP. A continuación se muestra un ejemplo de cómo hacer una petición POST para renderizar HTML:

Cabeceras:
```http
Content-Type: text/plain
Authorization: Bearer YOUR_API_KEY
```

Petición POST:

```html
POST /

<!DOCTYPE html>
<html>
    <head>
        <title>Test Page</title>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                document.body.innerHTML = '<h1>Hello, World!</h1>';
            });
        </script>
    </head>
    <body></body>
<html>
```

Respuesta esperada:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Test Page</title>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                document.body.innerHTML = '<h1>Hello, World!</h1>';
            });
        </script>
    </head>
    <body>
        <h1>Hello, World!</h1>
    </body>
</html>
```
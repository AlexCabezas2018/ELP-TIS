# Trabajo de impacto social: Fake News

## Instalación en local
Es necesario tener instalado NodeJS y npm para poder empezar  
- [Node JS (descargar el 'recomendado para la mayoria')](https://nodejs.org/es/)  

**npm** viene instalado junto con Node.

Es necesario que instaleis las dependencias con npm (tanto si arrancais el proyecto desde el principio como si **ya lo teneis y habeis hecho pull y veis que el archivo package.json ha cambiado**). Dentro de la carpeta del proyecto (en la raiz) ponemos el siguiente comando:  
 
    npm install
**El comando es conveniente que lo ejecuteis siempre que hagais pull del repo.**

Para poder arrancar el servidor en local, basta con poner:  
    
    npm start

Saldrá algo del estilo:

    Listening on port 3000!
    [INFO] File readed
    [INFO] Data parsed

**Cada vez que hagamos cambios en el backend y guardemos, el server se reiniciará automaticamente**

Ahora, si vas a [http://localhost:3000](http://localhost:3000) deberás ver la página web del cliente.
Para parar el server, basta con pulsar CTRL+C en la terminal.
/*Aquí va toda la lógica del cliente: acciones al pulsar botones, fetch de los datos, etc....*/

//Ejemplo:
fetch('api/getNotice', { mode: 'no-cors' }).then(res => res.json()).then(res => document.write(res.Notice));
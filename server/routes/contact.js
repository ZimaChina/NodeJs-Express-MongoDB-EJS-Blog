const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Importa el modelo Message
const nodemailer = require('nodemailer');
const validator = require('validator');
require('dotenv').config();

// Ruta para mostrar la página de contacto
router.get('/contact', (req, res) => {
  // Inicializa la variable de mensaje de error como vacía
  let errorMessage = '';

  // Si se pasa un mensaje de error en la consulta, asigna ese mensaje
  if (req.query.error) {
    errorMessage = req.query.error;
  }

  res.render('contacts', {
    currentRoute: '/contact',
    errorMessage: errorMessage // Pasa el mensaje de error a la vista
  });
});

// Ruta para procesar el formulario de contacto
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!validator.isEmail(email)) {
    // Redirige de nuevo a la página de contacto con el mensaje de error en la URL
    return res.redirect('/contact?error=El+correo+electrónico+no+es+válido');
  }

  try {
    // Crea un nuevo mensaje en la base de datos
    await Message.create({ name, email, message });

    // Configura el transporte de correo con nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Puedes cambiarlo al servicio de correo que prefieras
      auth: {
        user: process.env.EMAIL, // Tu dirección de correo electrónico
        pass: process.env.PASSWORD // Tu contraseña
      }
    });

    // Configura los detalles del correo electrónico
    const mailOptions = {
      from: 'duartefernando1710@gmail.com', // Tu dirección de correo electrónico
      to: 'duartefernando1710@gmail.com', // Tu dirección de correo electrónico
      subject: 'Nuevo mensaje de contacto', // Asunto del correo
      text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}` // Cuerpo del correo
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        // Maneja el error aquí y redirige a la página de contacto con el mensaje de error en la URL
        res.redirect('/contact?error=Hubo+un+error+al+enviar+el+correo+electrónico');
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
        // Maneja el éxito aquí, por ejemplo, redirige a una página de agradecimiento
        res.redirect('/');
      }
    });
  } catch (error) {
    console.error(error);
    // Maneja el error aquí y redirige a la página de contacto con el mensaje de error en la URL
    res.redirect('/contact?error=Hubo+un+error+al+procesar+tu+solicitud');
  }
});

module.exports = router;



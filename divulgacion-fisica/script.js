document.addEventListener('DOMContentLoaded', () => {
  const preguntas = document.querySelectorAll('.pregunta');
  const resultado = document.getElementById('resultado-quiz');
  const respuestas = {};

  preguntas.forEach((pregunta, index) => {
    const correcta = pregunta.dataset.correcta;
    const botones = pregunta.querySelectorAll('.opciones button');

    botones.forEach(boton => {
      boton.addEventListener('click', () => {
        if (respuestas[index] !== undefined) return;

        const valor = boton.dataset.valor;
        respuestas[index] = valor === correcta;

        botones.forEach(b => {
          b.disabled = true;
          if (b.dataset.valor === correcta) {
            b.classList.add('correcta');
          } else if (b === boton) {
            b.classList.add('incorrecta');
          }
        });

        if (Object.keys(respuestas).length === preguntas.length) {
          const aciertos = Object.values(respuestas).filter(Boolean).length;
          resultado.textContent = `Obtuviste ${aciertos} de ${preguntas.length} correctas. ${
            aciertos === preguntas.length ? '¡Excelente, ahora sí entendiste! 🎉' : '¡Buen intento, sigue explorando! 💡'
          }`;
        }
      });
    });
  });
});

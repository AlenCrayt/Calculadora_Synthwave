const botones_calculadora = document.querySelectorAll("button");

botones_calculadora.forEach((boton) => {
  boton.addEventListener("click", clickeo_boton);
});

function clickeo_boton(evento: MouseEvent) {
  const objetivo = evento.target as HTMLButtonElement;
  let valor_boton = objetivo.textContent;
  console.log(valor_boton);
}

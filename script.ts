document.addEventListener("DOMContentLoaded", () => {
  //Cuando el contenido del DOM se carga, esta asegurado de que los elementos button existen con lo cual los accedemos mediante querySelectorAll
  const botones_calculadora = document.querySelectorAll("button");
  //Con la lista que obtenimos de los elementos button iteramos a traves de la lista y ejecutamos una callback function en cada uno con la cual le asignamos un eventlistener para clicks a cada boton
  botones_calculadora.forEach((boton) => {
    boton.addEventListener("click", clickeo_boton);
  });
});

let linea_valores: number[] = [];

//La funcion que se ejecuta cuando un boton de la calculadora es clickeado toma como parametro el evento del Mouse
function clickeo_boton(evento: MouseEvent) {
  //Accedemos a la "pantalla" de la calculadora
  const pantalla_calculadora = document.querySelector("#pantalla");
  //Usamos type casting para hacerle entender a Typescript que el target del evento del mouse es un elemento de tipo boton HTML
  const objetivo = evento.target as HTMLButtonElement;
  //Ahora que Typescript entiende que esta manejando un boton HTML podemos acceder a las propiedades del boton en este caso el contenido de texto del boton
  let valor_boton = objetivo.textContent;

  switch (valor_boton) {
    case "0":
      linea_valores.push(0);
      break;
    case "1":
      linea_valores.push(1);
      break;
    case "2":
      linea_valores.push(2);
      break;
    case "3":
      linea_valores.push(3);
      break;
    case "4":
      linea_valores.push(4);
      break;
    case "5":
      linea_valores.push(5);
      break;
    case "6":
      linea_valores.push(6);
      break;
    case "7":
      linea_valores.push(7);
      break;
    case "8":
      linea_valores.push(8);
      break;
    case "9":
      linea_valores.push(9);
      break;
    case "C":
      linea_valores = [];
  }
  pantalla_calculadora.textContent = linea_valores.join("");
}

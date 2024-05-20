document.addEventListener("DOMContentLoaded", () => {
  //Cuando el contenido del DOM se carga, esta asegurado de que los elementos button existen con lo cual los accedemos mediante querySelectorAll
  const botones_calculadora = document.querySelectorAll("button");
  //Con la lista que obtenimos de los elementos button iteramos a traves de la lista y ejecutamos una callback function en cada uno con la cual le asignamos un eventlistener para clicks a cada boton
  botones_calculadora.forEach((boton) => {
    boton.addEventListener("click", clickeo_boton);
  });
});

//Declaracion de variables
//Arreglo que contiene los conjuntos de numeros y los simbolos
let linea_conjuntos: any[] = [];
//Arreglo que contiene los numeros separados y que es utilizado como un almacenmiento temporal para los numeros ingresados por el usuario
let linea_numeros: number[] = [];
//Arreglo cuyo unico proposito es mostrar la linea de numeros y simbolos visibles al usuario
let linea_visible: any[] = [];

//Simple funcion hecha para reducir lineas de codigo en el switch de valor_boton
function push_a_lineas(valor: number): void {
  linea_numeros.push(valor);
  linea_visible.push(valor);
}

//Funcion que realiza la agrupacion de los numeros ingresados en linea_numeros en un conjunto y agrega ese conjunto al arreglo de conjuntos junto con el simbolo que se ingreso
function agregar_conjuntos(simbolo: string): void {
  let conjunto = linea_numeros.join("");
  let numeros_juntos = Number(conjunto);
  linea_conjuntos.push(numeros_juntos);
  linea_conjuntos.push(simbolo);
  linea_numeros = [];
}

//Funcion que se encarga de realizar las operaciones matematicas necesarias a traves del arreglo linea_conjuntos y modifica este arreglos mediante iteracion hasta que solo queda el resultado de la operacion y un elemento vacio en el arreglo
function calcular_resultado(): void {
  let resultado: number;
  for (let i = 0; i < linea_conjuntos.length; i++) {
    switch (linea_conjuntos[1]) {
      case "+":
        resultado = linea_conjuntos[0] + linea_conjuntos[2];
        break;
      case "-":
        resultado = linea_conjuntos[0] - linea_conjuntos[2];
        break;
      case "*":
        resultado = linea_conjuntos[0] * linea_conjuntos[2];
        break;
      case "/":
        resultado = linea_conjuntos[0] / linea_conjuntos[2];
        break;
    }
    linea_conjuntos.splice(0, 3);
    linea_conjuntos.unshift(resultado);
    console.log(linea_conjuntos);
  }
  if (linea_conjuntos.length <= 2) {
    linea_visible = [];
    linea_visible.push(resultado);
  }
}

//La funcion que se ejecuta cuando un boton de la calculadora es clickeado toma como parametro el evento del Mouse
function clickeo_boton(evento: MouseEvent) {
  //Usamos type casting para hacerle entender a Typescript que el target del evento del mouse es un elemento de tipo boton HTML
  const objetivo = evento.target as HTMLButtonElement;
  //Ahora que Typescript entiende que esta manejando un boton HTML podemos acceder a las propiedades del boton en este caso el contenido de texto del boton
  let valor_boton = objetivo.textContent;
  //Accedemos a la "pantalla" de la calculadora
  const pantalla_calculadora = document.querySelector("#pantalla");

  switch (valor_boton) {
    case "0":
      push_a_lineas(0);
      break;
    case "1":
      push_a_lineas(1);
      break;
    case "2":
      push_a_lineas(2);
      break;
    case "3":
      push_a_lineas(3);
      break;
    case "4":
      push_a_lineas(4);
      break;
    case "5":
      push_a_lineas(5);
      break;
    case "6":
      push_a_lineas(6);
      break;
    case "7":
      push_a_lineas(7);
      break;
    case "8":
      push_a_lineas(8);
      break;
    case "9":
      push_a_lineas(9);
      break;
    case "+":
      agregar_conjuntos("+");
      linea_visible.push("+");
      break;
    case "-":
      agregar_conjuntos("-");
      linea_visible.push("-");
      break;
    case "*":
      agregar_conjuntos("*");
      linea_visible.push("*");
      break;
    case "/":
      agregar_conjuntos("/");
      linea_visible.push("/");
      break;
    case "=":
      agregar_conjuntos("");
      linea_visible.push("=");
      calcular_resultado();
      break;
    case "C":
      linea_conjuntos = [];
      linea_visible = [];
      break;
  }
  pantalla_calculadora.textContent = linea_visible.join("");
  console.log(linea_conjuntos);
}

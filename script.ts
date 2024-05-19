document.addEventListener("DOMContentLoaded", () => {
  //Cuando el contenido del DOM se carga, esta asegurado de que los elementos button existen con lo cual los accedemos mediante querySelectorAll
  const botones_calculadora = document.querySelectorAll("button");
  //Con la lista que obtenimos de los elementos button iteramos a traves de la lista y ejecutamos una callback function en cada uno con la cual le asignamos un eventlistener para clicks a cada boton
  botones_calculadora.forEach((boton) => {
    boton.addEventListener("click", clickeo_boton);
  });
});

//Declaracion de variables
let linea_valores: any[] = [];
let linea_condensada: any[] = [];
let valor_condensado: any[];
let valor_unido: string;
let punto_de_partida = 0;

function agrupar_valores(principio: number, fin: number): void {
  valor_condensado = linea_valores.slice(principio, fin);
  valor_unido = valor_condensado.join("");
  linea_condensada.push(valor_unido);
}
//Necesito un sistema que automaticamente declare nuevas variables para almacenar diferentes partes del arreglo separados a base de simbolos
//Tiene que ser capaz de escalar dinamicamente en base del gran numero de operaciones que el usuario pueda ingresar
function calcular_resultado(): void {
  let comienzo: number;
  linea_valores.forEach((item) => {
    console.log("Comienzo de iteracion");
    //Quizas algo que pueda trabajar dinamicamente con arreglos a base de una operacion?
    //Actualmente el sistema basa el indexOf en el primer elemento encontrado de ese simbolo con lo cual siempre retorna el mismo valor de indice de la operacion, ej: si hay dos + en un calculo que el usuario ingreso indexOf siempre va a retornar el indice del primer + en el array y nunca del segundo
    //Una manera de resolverlo podria ser con un iterador que recorre el arreglo uno por uno y que calcula dinamicamente la cantidad de numeros entre simbolos
    if (
      item === "+" ||
      item === "-" ||
      item === "*" ||
      item === "/" ||
      item === "="
    ) {
      if (punto_de_partida === 0) {
        comienzo = linea_valores.indexOf(item);
      } else {
        comienzo = punto_de_partida;
      }
      let posicion_simbolo = linea_valores.findIndex(
        (simbolo, indice) => simbolo === item && indice > comienzo
      );
      //El problema actualmente es que estamos usando el valor de posicion_simbolo que salta hacia el proximo valor y con eso saltea la serie de numeros entre el primer y segundo operador
      //El iterador recorre enteramente su numero durante un solo ciclo de la iteracion superior
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          agrupar_valores(0, linea_valores.indexOf(item));
          console.log(linea_condensada);
          console.log(
            "El proximo simbolo esta en el indice: " +
              linea_valores.indexOf(item)
          );
        } else if (i === 1) {
          agrupar_valores(linea_valores.indexOf(item) + 1, posicion_simbolo);
          console.log(linea_condensada);
          console.log(
            "El proximo simbolo esta en el indice: " + posicion_simbolo
          );
        }
      }
      agrupar_valores(punto_de_partida, posicion_simbolo);
      console.log(linea_condensada);
      console.log("El proximo simbolo esta en el indice: " + posicion_simbolo);
      console.log("La serie actual de numeros empieza en: " + punto_de_partida);
      //Hay un problema en que el slice() necesita el simbolo inmediatemente proximo en su primer iteracion con lo cual posicion_simbolo no es un buen fin de posicion para usar el metodo
      //En la segunda pasada de la iteracion punto de partida salta a los numeros despues del segundo simbolo con lo cual valor_condensado se salta enteramente los numeros entre el primer y el segundo simbolo, tengo que averiguar como arreglarlo
      let distancia = posicion_simbolo - punto_de_partida;
      punto_de_partida = punto_de_partida + distancia + 1;
      console.log("La proxima serie de numeros empieza en:" + punto_de_partida);
      console.log("Fin de iteracion");
    }
    //Por cada simbolo de una operacion agregar uno a un contador y en base a ese contador iterar sobre el arreglo y realizar la logica necesaria?
  });
}

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
    case "+":
      linea_valores.push("+");
      break;
    case "-":
      linea_valores.push("-");
      break;
    case "*":
      linea_valores.push("*");
      break;
    case "/":
      linea_valores.push("/");
      break;
    case "=":
      linea_valores.push("=");
      calcular_resultado();
      break;
    case "C":
      linea_valores = [];
  }
  pantalla_calculadora.textContent = linea_valores.join("");
}

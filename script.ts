//Codigo escrito por Agustin Santisteban, Usuario de Github: AlenCrayt
//Ahora tiene una nueva raiz de desarollo
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

//Funcion que realiza la agrupacion de los numeros ingresados en linea_numeros en un conjunto y agrega ese conjunto al arreglo de conjuntos junto con el simbolo que se ingreso, toma como parametro el simbolo que el usario ingreso
function agregar_conjuntos(simbolo: string): void {
  //Se usa el metodo join para unir a todos los elementos numericos separados de linea_numeros en un solo conjunto de tipo string
  let conjunto = linea_numeros.join("");
  //Se convierte al conjunto de numeros de Tipo string en uno de Tipo Number para hacer mas facil las operaciones futuras
  let numeros_juntos = Number(conjunto);
  //Se agrega al final de linea_conjuntos el nuevo elemento numerico basado en numeros agrupados
  linea_conjuntos.push(numeros_juntos);
  //Se agrega despues de los numeros el simbolo de tipo string para la operacion
  linea_conjuntos.push(simbolo);
  //Se vacia linea_numeros para que este disponible por si hay una serie de numeros siguiente
  linea_numeros = [];
}

//Funcion que se encarga de realizar las operaciones matematicas necesarias a traves del arreglo linea_conjuntos y modifica este arreglos mediante iteracion hasta que solo queda el resultado de la operacion y un elemento vacio en el arreglo
function calcular_resultado(): void {
  //Creamos una simple variable numerica para tener los resultados de las operaciones
  let resultado: number;
  //Usamos un iterador for para recorer el arreglo hasta llegar al fin(longitud del arreglo)
  for (let i = 0; i < linea_conjuntos.length; i++) {
    //Sabemos que en el arreglo linea_conjuntos el indice 0 es un numero, el indice 1 es un simbolo y el indice 2 es otro numero con el cual se va realizar la operacion, en base a este conocimiento usamos switch para averiguar que tipo de simbolo hay en el indice 1 y dependiendo de lo que determine hacemos la operacion necesaria(suma, resta, division, multiplicacion)
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
    //Cuando la operacion se ha realizado y tenemos el resultado, eliminamos los primeros tres elementos del arreglo(o sea los indices 0, 1 y 2) e insertamos al resultado al principio de linea_conjuntos con lo cual cuando se realiza la proxima operacion la hacemos con el resultado de la previa
    linea_conjuntos.splice(0, 3);
    linea_conjuntos.unshift(resultado);
  }
  //Con un simple condicional averiguamos si la longitud del arreglo es 2 o menos(que significa que solo queda el resultado + un elemento vacio) y si es true entonces vaciamos el arreglo linea_visible y despues agregamos el resultado a este de esta manera mostrando al usario el resultado de la operacion que ingreso
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

  //Mediante switch determinamos cual es el valor del boton(en este caso es el contenido de texto en forma de string) y en base a eso se realiza la accion necesaria
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
      linea_numeros = [];
      linea_visible = [];
      break;
  }
  //EL contenido de la "pantalla" de la calculadora que es un elemento HTML h1 es asignado el valor mas actualizado de linea_visible despues de que el usuario presiona un boton de la calculadora
  pantalla_calculadora.textContent = linea_visible.join("");
}

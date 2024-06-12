### Calculadora simple escrita en Typescript

## Recibiendo valores

Los calculos se realizan a base de tres arreglos. El arreglo numerico linea_numeros recibe los numeros ingresados por el usuario(clickeando en los boton HTML) uno seguido por el otro, cuando el usario presiona el simbolo de una operacion como: +, -, / o \* el contenido de linea_numeros se agrega en un conjunto a el arreglo linea_conjuntos seguido del simbolo ingresado de esta manera el arreglo linea_conjuntos tiene un elemento representando a cada componente de un calculo. Despues de haber sido agregado se vacia el arreglo linea_numeros para que pueda recibir los nuevos numeros que el usuario ingresa. El arreglo linea_visible es insertado mediante el DOM en la "pantalla" de la calculadora y recibe solo los ingresos de los botones que el usario presiona para asi mostrar al usuario cual es su calculo actual.

## Haciendo Calculos

Cuando el usario presiona el boton de "=" el codigo itera a traves de linea_conjuntos y ya que se sabe que dado como se ingresaron los datos al arreglo el indice 0 tiene numeros el indice 1 tiene un simbolo y el indice 2 otro numero se realiza la operacion necesaria con esos tres elementos del arreglo, el resultado se guarda en una nueva variable y se eliminan del arreglo a los elementos de los indice 0, 1 y 2. Se procede a insertar al principio del arreglo el resultado y como hay un patron establecido en linea_conjuntos se realiza de nuevo la operacion de los indices 0, 1 y 2 mientras se cumpla la condicion de que el numero iterador sea menor que la longitud de linea_conjuntos.

## Mostrando los resultados al usuario

Cuando los calculos del iterador terminan linea_conjuntos queda con solo dos elementos. el resultado en el indice 0 y un elemento vacion en el indice 1. Con un condicional simple el programa averigua si linea_conjuntos esta en este estado y cuando esto se cumple se vacia linea_visible y se agrega el resultado del calculo a linea_visible para asi mostrar los resultados al usuario

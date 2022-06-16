// Calcular Retenciones en un pago a proveedores

//Pedirle al usuario que nos indique cuantas facturas tiene que pagar y asignando un máximo de 10
let cantFacturas = parseInt(prompt('Ingrese la cantidad de facturas a pagar. (Máximo 10)'))

//no permitimos que el usuario ingrese datos no validos
while(cantFacturas > 10 || cantFacturas < 1){
    alert('Ingresa una cantidad correcta (de 1 a 10)')
    cantFacturas = parseInt(prompt('Ingrese la cantidad de facturas a pagar. (Máximo 10)'))
}

//declaramos la variable de importe total
let importeTotal = 0

//Bucle para que nos pida el valor de cada factura
for (let i = 1; i <= cantFacturas; i++){
    let importe = parseFloat(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $${importeTotal}.
                                    \nIngrese el importe de la factura n° ${i}`))
    importeTotal = parseFloat(importeTotal + importe)
}

//Pedirle al usuario que nos indique que tipo de IVA manejan sus facturas
let tipoIva = 0
let seleccionIva = parseInt(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $${importeTotal}.
                                    \n------------
                                    \nSelecciona el tipo de IVA de tus facturas:
                                    \n1. Productos GENERAL (21%)
                                    \n2. Productos REDUCIDO (10.5%)
                                    \n3. Servicios (27%)`)
                                    )   

//no permitimos que el usuario ingrese datos no validos
while(seleccionIva > 3 || seleccionIva < 1){
    alert('Selecciona un tipo de iva correcto!')
    seleccionIva = parseInt(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $${importeTotal}.
                                    \n------------
                                    \nSelecciona el tipo de IVA de tus facturas:
                                    \n1. Productos GENERAL (21%)
                                    \n2. Productos REDUCIDO (10.5%)
                                    \n3. Servicios (27%)`)
                                )
}   
switch(seleccionIva){
    case 1:
        tipoIva = 0.21
        break
    case 2:
        tipoIva = 0.105
        break
    case 3:
        tipoIva = 0.27
        break
    default:
        alert('Error en el tipo de IVA ingresado, comience nuevamente.')
        break
}

//Calculo retenciones
//monto imponible de ingresos brutos = precio iva incluído x 0.7% y tiene que ser mayor a $280
//monto imponible de retencion a las ganancias = precio sin iva x 2% menos el minimo de $224000 , tiene que ser mayor a $500

const retBrutos = monto => monto * 0.007

function retGanancias(monto, iva){
    montoImponible = (monto / (1 + iva)) - 224000
    retencion = montoImponible * 0.02
    return retencion
}

//asignamos variables a los resultados de las retenciones
let iibb = retBrutos(importeTotal)
let gcias = retGanancias(importeTotal, tipoIva)

//decidimos mostrar 0 si la retencion no supera los valores minimos ($280 para iibb y $500 para ganancias)

function mostrar(ret, minimo){
    let retencion = 0
    if (ret >= minimo){
        retencion = ret
    }
    return retencion
}

//asignamos los valores que deberá pagar el cliente descontando las retenciones
let valores = importeTotal - mostrar(iibb, 280) - mostrar(gcias, 500)

//mostramos como el usuario debería formular su pago de acuerdo a las retenciones
alert(`La suma de sus ${cantFacturas} facturas es de $${importeTotal}. (IVA ${tipoIva * 100}%)
        \n-----
        \nDeberá Formular el pago de la siguiente manera:
        \nValores: $${valores}
        \nRetención IIBB: $${mostrar(iibb, 280)}
        \nRetención Ganancias: $${mostrar(gcias, 500)}
        \n-----
        \nGracias por su consulta.
`)

//fin
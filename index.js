// Calcular Retenciones en un pago a proveedores

let cantFacturas = parseInt(prompt('Ingrese la cantidad de facturas a pagar. (Máximo 10)'))

while(cantFacturas > 10 || cantFacturas < 1){
    alert('Ingresa una cantidad correcta (de 1 a 10)')
    cantFacturas = parseInt(prompt('Ingrese la cantidad de facturas a pagar. (Máximo 10)'))
}

let importeTotal = 0

for (let i = 1; i <= cantFacturas; i++){
    let importe = parseFloat(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $${importeTotal}.
                                    \nIngrese el importe de la factura n° ${i}`))
    importeTotal = parseFloat(importeTotal + importe)
}

let tipoIva = 0
let seleccionIva = parseInt(prompt(`Usted está pagando ${cantFacturas} facturas.
                                    \nEl valor total ingresado hasta el momento es de: $${importeTotal}.
                                    \n------------
                                    \nSelecciona el tipo de IVA de tus facturas:
                                    \n1. Productos GENERAL (21%)
                                    \n2. Productos REDUCIDO (10.5%)
                                    \n3. Servicios (27%)`)
                                    )   

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

let iibb = retBrutos(importeTotal)
let gcias = retGanancias(importeTotal, tipoIva)

function mostrar(ret, minimo){
    let retencion = 0
    if (ret >= minimo){
        retencion = ret
    }
    return retencion
}

let valores = importeTotal - mostrar(iibb, 280) - mostrar(gcias, 500)

alert(`La suma de sus ${cantFacturas} facturas es de $${importeTotal}. (IVA ${tipoIva * 100}%)
        \n-----
        \nDeberá Formular el pago de la siguiente manera:
        \nValores: $${valores}
        \nRetención IIBB: $${mostrar(iibb, 280)}
        \nRetención Ganancias: $${mostrar(gcias, 500)}
        \n-----
        \nGracias por su consulta.
`)

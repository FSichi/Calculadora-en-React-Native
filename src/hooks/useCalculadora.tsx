import { useRef, useState } from 'react';

enum Operadores { SUMAR, RESTAR, DIVIDIR, MULTIPLICAR }

export const useCalculadora = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    };

    const armarNumero = (numeroTexto: string) => {

        // No aceptar doble punto decimal (.)
        if (numero.includes('.') && numeroTexto === '.') {
            return;
        }

        if (numero.startsWith('0') || numero.startsWith('-0')) {

            // Punto Decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto);
            }
            //EVALUAR SI ES OTRO CERO Y HAY UN PUNTO
            else if (numeroTexto === '0' && numero.includes('.')) {
                setNumero(numero + numeroTexto);
            }
            //Evaluar si es diferente de CERO Y No tiene un PUNTO
            else if (numeroTexto !== '0' && !numero.includes('.')) {
                setNumero(numeroTexto);
            }
            //Evitar 0000.0
            else if (numeroTexto === '0' && !numero.includes('.')) {
                setNumero(numero);
            }
            else {
                setNumero(numero + numeroTexto);
            }

        } else {
            setNumero(numero + numeroTexto);
        }

    };

    const positivoNegativo = () => {
        if (numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        } else {
            setNumero('-' + numero);
        }
    };

    const btnDelete = () => {

        let negativo = '';
        let numeroTemp = numero;

        if (numero.includes('-')) {
            negativo = '-';
            numeroTemp = numero.substring(1);
        }

        (numeroTemp.length > 1)
            ? setNumero(negativo + numeroTemp.slice(0, -1))
            : setNumero('0');

    };

    const cambiarNumPorAnterior = () => {

        (numero.endsWith('.'))
            ? setNumeroAnterior(numero.slice(0, -1))
            : setNumeroAnterior(numero);

        setNumero('0');
    };

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.DIVIDIR;
    };

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.MULTIPLICAR;
    };

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.RESTAR;
    };

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.SUMAR;
    };

    const calcular = () => {

        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {

            case Operadores.SUMAR:
                setNumero(`${num1 + num2}`);
                break;

            case Operadores.RESTAR:
                setNumero(`${num2 - num1}`);
                break;

            case Operadores.MULTIPLICAR:
                setNumero(`${num1 * num2}`);
                break;

            case Operadores.DIVIDIR:
                setNumero(`${num2 / num1}`);
                break;

            default:
                break;
        }

        setNumeroAnterior('0');
    };

    return {
        numero,
        numeroAnterior,
        armarNumero,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
        limpiar,
    };

};

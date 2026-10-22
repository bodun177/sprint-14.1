import React, { useState, useRef, useEffect } from 'react';

import './input.css';

const OPERATORS = {
    Kyivstar: ['67', '68', '96', '97', '98'],
    Vodafone: ['50', '66', '95', '99'],
    Lifecell: ['63', '73', '93'],
    '3mob': ['91'],
    'People.net': ['92'],
    intertelecom: ['89', '94'],
};

function getOperatorName(code) {
    if (code.length < 2) {
        return '';
    }
    const found = Object.keys(OPERATORS).find((name) => OPERATORS[name].includes(code));
    return found || 'Unknown';
}

export default function Input() {
    const [operator, setOperator] = useState('');
    const [phone, setPhone] = useState('');
    const operatorRef = useRef(null);
    const phoneRef = useRef(null);

    useEffect(() => {
        operatorRef.current.focus();
    }, []);

    const handleOperatorInput = (e) => {
        const digits = e.target.value.replace(/\D/g, '');
        e.target.value = digits;
        setOperator(digits);
        if (digits.length === 2) {
            phoneRef.current.focus();
        }
    };

    const handlePhoneInput = (e) => {
        const digits = e.target.value.replace(/\D/g, '');
        e.target.value = digits;
        setPhone(digits);
    };

    const isValid = operator.length === 2 && phone.length === 7;

    return <div>
        <span className="operator-name" data-testid="operator-name">{getOperatorName(operator)}</span>
        <span>+38 0</span>
        <input
            className="operator-input"
            type="text"
            data-testid="operator-input"
            ref={operatorRef}
            onInput={handleOperatorInput}
            />
        <span className="check-icon" data-testid="check-icon"> {isValid ? '✔️' : '-'} </span>
        <input
            className="phone-input"
            type="text"
            data-testid="phone-input"
            ref={phoneRef}
            onInput={handlePhoneInput}
             />
    </div>;
}

import React from 'react';

const Input = ({ label, type, placeholder, className, name, onChange = () => { } }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <label className='text-sm font-light mb-1 opacity-60'>{label}</label>
            <input
                className='font-light text-gray-300 bg-stone-600/20 rounded-md p-2 mt-1 outline-dashed outline-0 focus:outline-2 focus:outline-danger'
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                autoComplete={'new-password'}
            />
        </div>
    );
}

export default Input;
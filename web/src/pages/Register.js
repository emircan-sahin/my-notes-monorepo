import React, { useEffect } from 'react';
import Input from '../components/UI/Input';
import { UserService } from '../services/User.service';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordAgain: '',
    });

    const navigate = useNavigate();

    const handleChange = (e, name) => {
        setForm({ ...form, [name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.passwordAgain) return toast.error('Passwords do not match!');

        const data = await UserService.register(form);
        if (data?.token) {
            toast.success('You have successfully registered!');
            Cookies.set('token', data.token);
            navigate('/');
        }
    };

    return (
        <div className='flex items-center justify-center flex-1 min-h-screen'>
            <form className='w-11/12 md:w-8/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 p-10 bg-stone-600/10 h-fit text-gray-200 rounded-lg' onSubmit={handleSubmit}>
                <h1 className='text-gray-100 text-2xl'>Register</h1>

                <div className='flex flex-row flex-wrap mt-8'>
                    <Input onChange={(e) => handleChange(e, 'firstName')} type={'text'} label={'First name'} className={'w-1/2 pr-4'} />
                    <Input onChange={(e) => handleChange(e, 'lastName')} type={'text'} label={'Last name'} className={'w-1/2 pl-4'} />
                </div>

                <div className='flex flex-row flex-wrap mt-8'>
                    <Input onChange={(e) => handleChange(e, 'email')} type={'text'} label={'E-mail address'} className={'w-full'} />
                </div>

                <div className='flex flex-row flex-wrap mt-8'>
                    <Input onChange={(e) => handleChange(e, 'password')} type={'password'} label={'Password'} className={'w-1/2 pr-4'} />
                    <Input onChange={(e) => handleChange(e, 'passwordAgain')} type={'password'} label={'Password again'} className={'w-1/2 pl-4'} />
                </div>

                {/* Submit button */}
                <div className='flex flex-row flex-wrap mt-8'>
                    <div className='flex flex-col w-40 mx-auto'>
                        <button className='bg-danger hover:bg-purple-7000 text-gray-100 rounded-md p-2 mt-1 outline-0'>Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
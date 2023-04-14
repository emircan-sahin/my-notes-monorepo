import React, { useEffect } from 'react';
import Input from '../components/UI/Input';
import { UserService } from '../services/User.service';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = React.useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e, name) => {
        setForm({ ...form, [name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await UserService.login(form);
        if (data?.token) {
            toast.success('You have successfully logged in!');
            Cookies.set('token', data.token);
            navigate('/');
        }
    };

    return (
        <div className='flex items-center justify-center flex-1 min-h-screen'>
            <form className='w-11/12 md:w-8/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 p-10 bg-stone-600/10 h-fit text-gray-200 rounded-lg' onSubmit={handleSubmit}>
                <h1 className='text-gray-100 text-2xl'>Login</h1>

                <div className='flex flex-row flex-wrap mt-8'>
                    <Input onChange={(e) => handleChange(e, 'email')} type={'text'} label={'E-mail address'} className={'w-full'} />
                </div>

                <div className='flex flex-row flex-wrap mt-8'>
                    <Input onChange={(e) => handleChange(e, 'password')} type={'password'} label={'Password'} className={'w-full'} />
                </div>

                {/* Don't have an account? */}
                <div className='flex flex-row flex-wrap mt-8'>
                    <p className='text-gray-300 text-sm mr-1'>Don't have an account?</p>
                    <span className='text-sm underline cursor-pointer' onClick={() => navigate('/register')}>
                        Register
                    </span>
                </div>

                {/* Submit button */}
                <div className='flex flex-row flex-wrap mt-8'>
                    <div className='flex flex-col w-40 mx-auto'>
                        <button className='bg-danger hover:bg-purple-7000 text-gray-100 rounded-md p-2 mt-1 outline-0'>Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
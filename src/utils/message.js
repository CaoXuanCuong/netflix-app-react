import { toast } from 'react-toastify';

const message = (type, msg, position = 'top-right', time = 2000) => {
    switch(type){
        case 'success':
            toast.success(msg, {
                position,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        case 'info':
            toast.info(msg, {
                position,
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
        case 'error':
            toast.error(msg, {
            position,
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
            break;
        default: 
            throw Error('Invalid Type Message');
    }
}

export default message

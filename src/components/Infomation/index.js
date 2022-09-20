import React, { useContext, useState } from 'react'
import styles from './Infomation.module.scss';
import classNames from 'classnames/bind';
import { AuthContext } from '~/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import message from '~/utils/message';
import userApi from '~/api/userApi';

const cx = classNames.bind(styles);
const Infomation = () => {
  const {
    authState: { user },
    updateProfile,
  } = useContext(AuthContext);

  const [fullName, setFullName] = useState(user.fullname);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleSelectFile = async (e) => {
    const data = new FormData();
    data.append('image', e.target.files[0]);
    try{
      setLoading(true);
      const res = await userApi.updateAvatar(data);
      if(res.success) {
        updateProfile({...user, avatar: res.avatar});
        setLoading(false);
      }
    }
    catch(error){
      message('error', 'Something went wrong, please try again!', 'top-center');
    }
  }

  const handleSetName = async() => {
    if(fullName.trim().length < 6 || fullName.trim().length >20){
      message('error', 'Fullname must be 6 to 20 characters', 'top-center')
      return;
    }
    else{
      try{
        const res = await userApi.updateName({ name: fullName });
        if(res.success){
          updateProfile({...user, fullname: fullName})
          setEdit(false);
        }
      }
      catch(error){
        message('error', 'Something went wrong, please try again!', 'top-center');
      }
    }
  }

  const handleCancelEdit = (e) => {
    if(e.keyCode === 27) {
      setEdit(false);
      setFullName(user.fullname);
    }
  }

  const handleChangePassword = async() => {
    if(password.trim().length === 0){
      message('error', 'Please type your current password', 'top-center')
      return;
    }
    if(newPassword.trim().length < 8 || newPassword.trim().length >20){
      message('error', 'Password must be 8 to 20 characters', 'top-center')
      return;
    }
    try{
      const res = await userApi.updatePassword({ password, newPassword });

      if(res.success){
        message('success', 'Change password success!', 'top-center');
        setPassword('');
        setNewPassword('');
      }
    }
    catch(error){
      console.log(error);
      message('error', error.response.data.message, 'top-center');
    }

  }
  return (
    <>
      <ToastContainer style={{fontSize: 15}} />
      <div className={(cx('infomation'))}>   
          <div className={cx('user-info')}>
              <div className={cx('info-group')}>
                  <h3 className={cx('title')}>User Infomation</h3>
                  <p className={cx('info-title')}>Here you can edit public information about yourself.</p>
              </div>
              <div className={cx('info-group')}>
                  <h3 className={cx('title')}>Email</h3>
                  <p className={cx('info-title')}>{user.email}</p>
              </div>
              <div className={cx('info-group')}>
                  <h3 className={cx('title')}>Fullname</h3>
                  {!edit ? (
                    <div className={cx('info-item')}>
                      <p className={cx('info-title')}>{fullName}</p>
                      <button onClick={()=>setEdit(true)} className={cx('edit-btn')}>
                        <i className='bx bx-edit-alt'></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={cx('edit')}>
                        <input className={cx('edit-input')} 
                               onKeyDown={handleCancelEdit}
                               type='text' 
                               value={fullName} 
                               onChange={(e)=>setFullName(e.target.value)} />
                        <button onClick={handleSetName} className={cx('edit-btn')}>
                          <i className='bx bx-send'></i>
                        </button>
                      </div>
                      <p className={cx('info-title')}>Press ESC to cancel</p>         
                    </>
                  )}      
              </div>
              <div className={cx('info-group')}>
                  <h3 className={cx('title')}>Password</h3>
                  <input id='password-check' className={cx('change-pass-check')} type='checkbox' />
                  <div className={cx('password')}>
                    <input 
                      type='password' 
                      className={cx('edit-input')} 
                      placeholder='Current Password'
                      autoComplete='new-password'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input 
                      type='password' 
                      className={cx('edit-input')} 
                      placeholder='New Password'
                      autoComplete='new-password'
                      value={newPassword}
                      onChange={(e)=>setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className={cx('action')}>
                    <label htmlFor='password-check' className={cx('change-password-btn')}>Change Password</label>
                    <button className={cx('submit-btn')} onClick={handleChangePassword}>Update</button>
                  </div>
              </div>
          </div>
          <div className={cx('user-info')}>
            <h3 className={cx('title')}>Profile photo</h3>
            <div className={cx('user-photo')}>
                <div className={cx('avatar')} style={{backgroundImage: `url(${user.avatar})`}} alt="Avatar">
                  {loading && (
                    <div className={cx('load')}>
                        <i className="bx bx-loader"></i>
                    </div>
                  )}
                </div>
                <input id='upload-avatar' accept=".jpg,.jpeg,.png" onChange={(e)=>handleSelectFile(e)} type='file' style={{display: 'none'}} />
                <label htmlFor='upload-avatar'>Upload new avatar</label>
            </div>
          </div>   
      </div>
    </>
  )
}

export default Infomation

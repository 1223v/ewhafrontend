import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MYPAGE } from '../../../../constants/text';
import { PasswordInput } from './PasswordInput';

import "./Password.css";

// 마이페이지 - 비밀번호 변경 모달 입력 폼
export const PasswordForm = ({
  onClose
}) => {
  const methods = useForm({
    defaultValues: {
      currentPw: '',
      newPw: '',
      newPwChk: '',
    }
  });

  const { watch, setError, clearErrors } = methods;

  const currentPw = watch('currentPw');
  const newPw = watch('newPw');
  const newPwChk = watch('newPwChk');

  useEffect(() => {
    if (newPw && currentPw && currentPw === newPw) {
      setError('newPw', { type: 'manual', message: '현재 비밀번호와 동일합니다.' });
    } else {
      clearErrors('newPw');
    }

    if (newPw && newPwChk && newPw !== newPwChk) {
      setError('newPwChk', { type: 'manual', message: '비밀번호가 일치하지 않습니다.' });
    } else {
      clearErrors('newPwChk');
    }
  }, [currentPw, newPw, newPwChk, setError, clearErrors]);

  const onSubmit = (data) => {
    const { currentPw, newPw, newPwChk } = data;
    console.log(data);
    onClose();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <section className='passwordForm'>
          <div className='passwordForm__content'>
            {
              MYPAGE.MODAL.title.map((t) => 
                <PasswordInput 
                  key={t.idx} 
                  title={t.title}
                  name={t.name}
                />
              )
            }
          </div>
          <div className='passwordForm__btn'>
            <button onClick={onClose} id='wt'>{MYPAGE.MODAL.btn.cancle}</button>
            <button type='submit' id='bk'>{MYPAGE.MODAL.btn.modify}</button>
          </div>
        </section>
      </form>
    </FormProvider>
  )
}
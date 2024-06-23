import React from 'react';
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

  const onSubmit = (data) => {
    console.log(data);
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
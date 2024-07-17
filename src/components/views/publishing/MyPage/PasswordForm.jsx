import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MYPAGE } from '../../../../constants/text';
import { PasswordInput } from './PasswordInput';

import Form from '../../Form/Form';
import "./Password.css";

// 마이페이지 - 비밀번호 변경 모달 입력 폼
export const PasswordForm = ({
  onClose
}) => {
  const defaultValues = {
    currentPw: '',
    newPw: '',
    newPwChk: '',
  }

  const methods = useForm({
    defaultValues: defaultValues
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

  return (
    <Form
      defaultValues={defaultValues}
      onClose={onClose}
    >
      {
        MYPAGE.MODAL.title.map((t) => 
          <PasswordInput 
            key={t.idx} 
            title={t.title}
            name={t.name}
          />
        )
      }
    </Form>
  )
}
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { MYPAGE } from '../../../constants/text';

function Form({
  onClose,
  methods,
  onSubmit,
  children
}) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <section className='passwordForm'>
          {children}
          <div className='passwordForm__btn'>
            <button onClick={onClose} id='wt'>{MYPAGE.MODAL.btn.cancle}</button>
            <button type='submit' id='bk'>
              확인
            </button>
          </div>
        </section>
      </form>
    </FormProvider>
  )
}

export default Form
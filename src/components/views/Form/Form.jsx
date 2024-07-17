import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MYPAGE } from '../../../constants/text';

function Form({
  defaultValues,
  onClose,
  children
}) {
  const methods = useForm({
    defaultValues: defaultValues
  });

  const { watch, setError, clearErrors } = methods;

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <section className='passwordForm'>
          {children}
          <div className='passwordForm__btn'>
            <button onClick={onClose} id='wt'>{MYPAGE.MODAL.btn.cancle}</button>
            <button type='submit' id='bk'>{MYPAGE.MODAL.btn.modify}</button>
          </div>
        </section>
      </form>
    </FormProvider>
  )
}

export default Form
import { FC } from 'react';
import { Food, Meals } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './common/Input';

type ManageFoodModalProps = {
  onClose: () => void;
  selectedMeal: Meals;
  onSave?: ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => void;
};

export const ManageFoodModal: FC<ManageFoodModalProps> = ({
  onClose,
  selectedMeal,
  onSave,
}) => {
  const { register, handleSubmit } = useForm<Food>();

  const onSubmit: SubmitHandler<Food> = (data) => {
    onSave?.({ meal: selectedMeal, foodItem: data });
    onClose();
  };

  return (
    <div className='absolute w-full h-full bg-white'>
      <div className='flex w-full h-full flex-col'>
        <button onClick={onClose}>Chiudi</button>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('name')} label='Name' />
          <Input {...register('calories')} label='Calories' type='number' />
          <Input {...register('carbohydrates')} label='Carbs' />
          <Input {...register('proteins')} label='proteins' />
          <Input {...register('fats')} label='fats' />
          <button>Salva</button>
        </form>
      </div>
    </div>
  );
};

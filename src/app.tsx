import { useMemo, useState } from 'react';
import './app.css';
import dayjs from 'dayjs';
import { DietDay, Food, Meals } from './types';
import { Accordion } from './components/Accordion';
import { ManageFoodModal } from './components/ManageFoodModal';

const initializeTabs = () => {
  return [true, false, false, false, false];
};

function App() {
  const [day, setDay] = useState<DietDay>({
    date: dayjs().format(),
    breakfast: [
      {
        calories: 100,
        name: 'Pollo',
        carbohydrates: 10,
        fats: 10,
        proteins: 10,
      },
    ],
    morningSnacks: [
      {
        calories: 100,
        name: 'Pollo',
        carbohydrates: 10,
        fats: 10,
        proteins: 10,
      },
    ],
  });

  const [openTabs, setOpenTabs] = useState(initializeTabs);
  const [selectedMeal, setSelectedMeal] = useState<Meals>();

  const handleTabPress = (tab: number) => () => {
    setOpenTabs((prev) => {
      const newTabs = [...prev];
      newTabs[tab] = !prev[tab];
      return newTabs;
    });
  };

  const onAddClick = (meal: Meals) => () => {
    setSelectedMeal(meal);
  };

  const onSave = ({ meal, foodItem }: { meal: Meals; foodItem: Food }) => {
    setDay((prev) => ({
      ...prev,
      food: {
        ...prev,
        [meal]: [
          ...(prev[meal] ?? []),
          {
            ...foodItem,
          },
        ],
      },
    }));
  };

  const { totalCalories } = useMemo(() => {
    const totalCalories =
      (day?.breakfast?.reduce((acc, next) => acc + Number(next.calories), 0) ??
        0) +
      (day?.morningSnacks?.reduce(
        (acc, next) => acc + Number(next.calories),
        0
      ) ?? 0) +
      (day?.lunch?.reduce((acc, next) => acc + Number(next.calories), 0) ?? 0) +
      (day?.eveningSnacks?.reduce(
        (acc, next) => acc + Number(next.calories),
        0
      ) ?? 0) +
      (day?.dinner?.reduce((acc, next) => acc + Number(next.calories), 0) ?? 0);
    return { totalCalories };
  }, [day]);

  return (
    <>
      {selectedMeal && (
        <ManageFoodModal
          selectedMeal={selectedMeal}
          onClose={() => {
            setSelectedMeal(undefined);
          }}
          onSave={onSave}
        />
      )}
      <div className='flex flex-col w-full h-full border border-red-700'>
        <span className='w-full text-center'>
          {dayjs(day.date).format('dddd DD/MM/YYYY')}
        </span>
        <div className='flex flex-col w-full items-center'>
          <span>Today's summary</span>
          <span>Calories: {totalCalories}</span>
          <div className='flex w-full justify-center gap-x-[10px]'>
            <span>
              Proteins:{' '}
              {day?.breakfast?.reduce((acc, next) => {
                return acc + next.proteins;
              }, 0)}
            </span>
            <span>
              Carbohydrates:{' '}
              {day?.breakfast?.reduce((acc, next) => {
                return acc + next.carbohydrates;
              }, 0)}
            </span>
            <span>
              Fats:{' '}
              {day?.breakfast?.reduce((acc, next) => {
                return acc + next.fats;
              }, 0)}
            </span>
          </div>
        </div>
        <Accordion
          foodItems={day?.breakfast}
          onTabClick={handleTabPress(0)}
          open={openTabs[0]}
          tabName='Breakfast'
          onAddClick={onAddClick('breakfast')}
        />
        <Accordion
          foodItems={day?.morningSnacks}
          onTabClick={handleTabPress(1)}
          open={openTabs[1]}
          tabName='Morning Snacks'
          onAddClick={onAddClick('morningSnacks')}
        />
        <Accordion
          foodItems={day?.lunch}
          onTabClick={handleTabPress(2)}
          open={openTabs[2]}
          tabName='Lunch'
        />
        <Accordion
          foodItems={day?.breakfast}
          onTabClick={handleTabPress(3)}
          open={openTabs[3]}
          tabName='Evening Snacks'
        />
        <Accordion
          foodItems={day?.breakfast}
          onTabClick={handleTabPress(4)}
          open={openTabs[4]}
          tabName='Dinner'
        />
      </div>
    </>
  );
}

export default App;

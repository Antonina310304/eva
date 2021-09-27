import React, { FC, memo, useState, useCallback } from 'react';
import QuestionCard from './QuetionCard';
import styles from './Questions.module.css';

const questions = [
  {
    title: 'Почему только один матрас? ',
    content: `Sleeper подходит людям любого телосложения. Именно это делает его уникальным. Чем больше давления вы оказываете на матрас, тем сильнее он реагирует на вас, поддерживая естественное положение позвоночника. Sleeper оценят и пары со значительной разницей в весе. Эластичный наполнитель подстраивается под нагрузку в местах наибольшего давления, а поверхность вокруг остается ровной. С течением времени ваши предпочтения по жесткости могут меняться — Sleeper подстроится под них в любой момент!`,
  },
  {
    title: 'Чем отличается Sleeper от матрасов с независимыми пружинами?',
    content: `По своим ортопедическим качествам Sleeper не уступает матрасам с многозональными пружинными блоками. При этом конструкции с пружинами накапливают огромное количество пыли: за 10 лет эксплуатации их вес увеличивается вдвое! Ведь внутри их — пустота. Sleeper достаточно пылесосить раз в 2-3 недели, и эта глобальная проблема ему не страшна. Беспружинный матрас решает также вопросы скрипа, вылетания пружин, накопления статического электричества и пр.`,
  },
];

const Questions: FC = () => {
  const [activeCardsNumber, setActiveCardNumber] = useState<boolean[]>(
    new Array(questions.length).fill(false),
  );

  const handleCardClick = useCallback(
    (index: number) => {
      setActiveCardNumber([
        ...activeCardsNumber.slice(0, index),
        !activeCardsNumber[index],
        ...activeCardsNumber.slice(index + 1),
      ]);
    },
    [activeCardsNumber],
  );

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Остались вопросы?</h2>
      <div className={styles.questionsWrapper}>
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            {...question}
            active={activeCardsNumber[index]}
            className={styles.questionCard}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Questions);

import React, { useState } from 'react';
import BlockTermCost from '../Blocks_input/BlockTermCost';
import Contribution from '../Blocks_input/Contribution';
import './Main.scss';

const sendRequest = (carCoast, initailPayment, initailPaymentPercent, leaseTerm, totalSum, monthlyPaymentFrom) => {
  const calculatorData = {
    'Стоимость авто': String(carCoast),
    'Первй взнос в рублях': String(initailPayment.toFixed(0)),
    'Первй взнос в процентах': String(initailPaymentPercent),
    'Срок лизинга в месяцах': String(leaseTerm),
    'Сумма договора лизинга': String(totalSum.toFixed(0)),
    'Ежемесячный платеж': String(monthlyPaymentFrom.toFixed(0)),
  };
  alert(JSON.stringify(calculatorData));
};

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [cost, setCost] = useState(3300000);
  const [percent, setPercent] = useState(10);
  const [months, setMonths] = useState(60);

  const costString = (costString) => {
    let value = String(Math.ceil(costString));
    let [_, num, suffix] = value.match(/^(.*?)((?:[,.]\d+)?|)$/);
    return `${num.replace(/\B(?=(?:\d{3})*$)/g, ' ')}${suffix}`;
  };

  const initial = cost * (percent / 100);
  const monthPay = (cost - initial) * ((0.05 * Math.pow(1 + 0.05, months)) / (Math.pow(1 + 0.05, months) - 1));
  const totalSum = initial + monthPay * months;

  const submitForm = () => {
    setIsLoading(true);
    sendRequest(cost, initial, percent, months, totalSum, monthPay);
    setIsLoading(true);
  };
  return (
    <div className="container">
      <h1 className="main_title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className=" data_container">
        <div className="data_container__input ">
          {' '}
          <BlockTermCost
            maxValue={10000000}
            minValue={1500000}
            title={'Стоимость автомобиля'}
            subTitle={'₽'}
            value={cost}
            setValue={setCost}
            isLoading={isLoading}
          />
          <Contribution
            setPercent={setPercent}
            subTitle={'₽'}
            initial={Math.ceil(initial)}
            percent={percent}
            isLoading={isLoading}
          />
          <BlockTermCost
            maxValue={120}
            minValue={6}
            title={'Срок лизинга'}
            subTitle={'мес.'}
            value={months}
            setValue={setMonths}
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="data_container data_container__btn">
        <div className="wraper">
          <div className="wraper_title">Сумма договора лизинга</div>
          <div className="wraper_sum">{costString(totalSum)} ₽</div>
        </div>
        <div className="wraper">
          <div className="wraper_title">Ежемесячный платеж</div>
          <div className="wraper_sum wraper_sum_payment">{costString(monthPay)} ₽</div>
        </div>
        <button onClick={submitForm} disabled={isLoading} className="btn">
          {isLoading ? 'Загрузка...' : 'Оставить заявку'}
        </button>
      </div>
    </div>
  );
}
export default Main;

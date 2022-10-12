import React, { useState } from 'react';
import BlockTermCost from '../Blocks_input/BlockTermCost';
import Contribution from '../Blocks_input/Contribution';
import axios from 'axios';
import './Main.scss';

const sendRequest = (carCoast, initailPayment, initailPaymentPercent, leaseTerm, totalSum, monthlyPaymentFrom) => {
  try {
    return axios
      .post(
        'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
        {
          car_coast: carCoast,
          initail_payment: initailPayment,
          initail_payment_percent: initailPaymentPercent,
          lease_term: leaseTerm,
          total_sum: totalSum,
          monthly_payment_from: monthlyPaymentFrom,
        },
        {
          headers: {
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
      )
      .then((response) => alert(response.data.id));
  } catch (e) {
    console.error(e);
  }
};

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [cost, setCost] = useState(3300000);
  const [percent, setPercent] = useState(13);
  const [months, setMonths] = useState(60);

  const initial = cost * (percent / 100);

  const monthPay = (cost - initial) * ((0.035 * Math.pow(1 + 0.035, months)) / (Math.pow(1 + 0.035, months) - 1));
  const totalSum = initial + monthPay * months;

  const submitForm = () => {
    setIsLoading(true);
    sendRequest(cost, initial, percent, months, totalSum, monthPay).then(() => setIsLoading(false));
  };
  return (
    <div className="container">
      <h1 className="main_title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className=" data_container data_container__input ">
        <BlockTermCost
          maxValue={6000000}
          minValue={1000000}
          title={'Стоимость автомобиля'}
          subTitle={'₽'}
          value={cost}
          setValue={setCost}
          isLoading={isLoading}
        />
        <Contribution setPercent={setPercent} initial={initial} percent={percent} isLoading={isLoading} />
        <BlockTermCost
          maxValue={60}
          minValue={1}
          title={'Срок лизинга'}
          subTitle={'мес.'}
          value={months}
          setValue={setMonths}
          isLoading={isLoading}
        />
      </div>
      <div className="data_container">
        <div className="wraper">
          <div className="wraper_title">Сумма договора лизинга</div>
          <div className="wraper_sum">{Math.round(totalSum)} ₽</div>
        </div>
        <div className="wraper">
          <div className="wraper_title">Ежемесячный платеж от</div>
          <div className="wraper_sum">{monthPay.toFixed(0)} ₽</div>
        </div>
        <button onClick={submitForm} disabled={isLoading} className="btn">
          {isLoading ? 'Загрузка...' : 'Оставить заявку'}
        </button>
      </div>
    </div>
  );
}
export default Main;

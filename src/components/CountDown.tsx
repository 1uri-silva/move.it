import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/Countdown.module.css';


export function CountDown() {

  const {
    minutes,
    seconds,
    isActive,
    hasFinish,
    startCountDown,
    stopCountDown
  } = useContext(CountDownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  return(
    <div>
      <div className={styles.countdownContainer}>

        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
       </div>

        <span>:</span>

        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>

      </div>

      { hasFinish ? (
        <button
          disabled
          className={styles.startCount} 
          >
            Ciclo encerrado
          </button>
      ) : (

        <>
          {isActive ? (
        
        <button
        type="button"
        className={`${styles.startCount} ${styles.startCountActive}`}
        onClick={stopCountDown}
        >
         Abandonar ciclo
        </button>
      ) : (

        <button
        type="button"
        className={styles.startCount}
        onClick={startCountDown}
        >
          Iniciar ciclo
        </button>
      )}
        </>
      )}

     </div>
  )
}
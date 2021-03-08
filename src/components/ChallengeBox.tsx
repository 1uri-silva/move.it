import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox(){

  const {
    activeChallenge,
    resetChallenge,
    completedChallenge
  } = useContext(ChallengesContext);

  const { stopCountDown,  } = useContext(CountDownContext)

  function handleChallengeSucceeded() {
    completedChallenge();
    stopCountDown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    stopCountDown();
  }


  return(
    <div className={styles.challengeBoxContainer}>

      { activeChallenge ? (

        <div className={styles.challengeActive}>
          <header> Ganhe {activeChallenge.amount} xp </header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
            type="button"
            className={styles.failButton}
            onClick={handleChallengeFailed}
            >
              Flalhei
            </button>

            <button
            type="button"
            className={styles.completeButton}
            onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>

        </div>

      ) : (

        <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"/>
          Avance de nivel completando desafios.
        </p>
      </div>
      )}

    </div>
  )
}
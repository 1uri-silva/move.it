import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
  minutes: number;
  seconds: number;
  hasFinish: boolean;
  isActive: boolean;
  startCountDown: () => void;
  stopCountDown: () => void;
}

interface CountDownProviderProps {
  children: ReactNode;
}

let countDownTimeout: NodeJS.Timeout;

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownProvider({ children }: CountDownProviderProps) {


  const {startNewChallenges} = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);

  const minutes = Math.floor( time / 60 );
  const seconds = time % 60;

  //

  function startCountDown() {
    setIsActive(true);
  }

  function stopCountDown() {
    clearTimeout(countDownTimeout);
    setIsActive(false);
    setTime( 0.1 * 60 );
    setHasFinish(false)
  }

  useEffect(() => {

    if(isActive && time > 0){

      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);

    } else if (isActive && time == 0 ){

      setHasFinish(true);
      setIsActive(false);
      startNewChallenges();
    }
  }, [isActive, time])

  return (
    <CountDownContext.Provider value={{
      minutes,
      seconds,
      hasFinish,
      isActive,
      startCountDown,
      stopCountDown
    }}>
      {children}
    </CountDownContext.Provider>
  )
}







// import { createContext, ReactNode } from 'react';

// interface CountDownContextData {}

// interface CountDownProviderProps {
//   children: ReactNode;
// }

// export const [CountDownContext] = createContext({} as CountDownContextData);

// export function CountDownProvider({ children }: CountDownProviderProps) {
  
//   return (
//     <CountDownContext.Provider value={{}}>
//       {children}
//     </CountDownContext.Provider>
//   )
// }
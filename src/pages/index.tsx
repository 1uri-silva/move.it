import Head from 'next/head';
import { GetServerSideProps } from 'next'

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { Profile } from "../components/Profile";
import { CountDown } from "../components/CountDown";
import { ChallengeBox } from "../components/ChallengeBox";
import { ExperienceBar } from "../components/ExperienceBar";
import { CompletedChallenge } from "../components/CompletedChallenge";

import styles from '../styles/components/Pages/Home.module.css';
import { CountDownProvider } from '../contexts/CountDownContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    
    >

    <div className={styles.container}>

      <Head>
        <title>Inicio | move.it</title>
      </Head>

      <ExperienceBar/>

    <CountDownProvider>

      <section>
        <div>
          <Profile/>
          <CompletedChallenge />
          <CountDown />
        </div>

        <div>
          <ChallengeBox/>
        </div>
      </section>
      
    </CountDownProvider>
    </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

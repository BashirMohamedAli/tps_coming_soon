"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { getRemainingTime } from "../utils/dateUtils"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`

const float = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
`

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #010101;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Bubbles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const Bubble = styled.div<{
  size: string
  top: string
  left?: string
  right?: string
  duration: string
}>`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(251, 187, 48, 0.1) 0%,
    rgba(251, 187, 48, 0.05) 100%
  );
  animation: ${float} ${(props) => props.duration} infinite;

  @media (max-width: 768px) {
    transform: scale(0.7);
  }
`

const WaveBg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 16rem;
  background: linear-gradient(
    180deg,
    rgba(1, 1, 1, 0) 0%,
    rgba(251, 187, 48, 0.15) 100%
  );
  clip-path: polygon(0 25%, 100% 0, 100% 100%, 0% 100%);

  @media (max-width: 768px) {
    height: 10rem;
  }
`

const Header = styled.header`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Logo = styled(Image)`
  width: 150px;
  height: auto;

  @media (max-width: 768px) {
    width: 100px;
  }
`

const Main = styled.main`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 2rem;
  text-align: center;
`

const Subtitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 300;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    font-size: 3.75rem;
  }
`

const Countdown = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 2.5rem;
  font-weight: 300;

  @media (min-width: 768px) {
    font-size: 3.75rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    gap: 0.5rem;
  }
`

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TimeValue = styled.span`
  font-variant-numeric: tabular-nums;
`

const TimeLabel = styled.span`
  font-size: 0.75rem;
  color: #a0a0a0;
  margin-top: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`

const Separator = styled.span`
  color: #fbbb30;
  align-self: flex-start;
`

interface ComingSoonProps {
  targetDate: string
  initialTimeLeft: {
    days: string
    hours: string
    minutes: string
    seconds: string
    total: number
  }
}

export default function ComingSoon({ targetDate, initialTimeLeft }: ComingSoonProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
  const [isReady, setIsReady] = useState(initialTimeLeft.total <= 0)

  useEffect(() => {
    if (isReady) return

    const target = new Date(targetDate)
    const interval = setInterval(() => {
      const remaining = getRemainingTime(target)
      setTimeLeft(remaining)

      if (remaining.total <= 0) {
        clearInterval(interval)
        setIsReady(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, isReady])

  return (
    <>
      <GlobalStyle />
      <Container>
        <Bubbles>
          <Bubble size="8rem" top="15%" left="15%" duration="8s" />
          <Bubble size="6rem" top="25%" left="25%" duration="6s" />
          <Bubble size="10rem" top="10%" right="20%" duration="10s" />
          <Bubble size="7rem" top="30%" right="25%" duration="7s" />
        </Bubbles>
        <WaveBg />
        <Header>
          <Logo src="/logo.jpeg" alt="The Project Stories" width={150} height={40} />
        </Header>
        <Main>
          <Subtitle>Something great is on the way</Subtitle>
          <Title>{isReady ? "READY" : "COMING SOON"}</Title>
          {!isReady && (
            <Countdown>
              <TimeUnit>
                <TimeValue>{timeLeft.days}</TimeValue>
                <TimeLabel>Days</TimeLabel>
              </TimeUnit>
              <Separator>:</Separator>
              <TimeUnit>
                <TimeValue>{timeLeft.hours}</TimeValue>
                <TimeLabel>Hours</TimeLabel>
              </TimeUnit>
              <Separator>:</Separator>
              <TimeUnit>
                <TimeValue>{timeLeft.minutes}</TimeValue>
                <TimeLabel>Mins</TimeLabel>
              </TimeUnit>
              <Separator>:</Separator>
              <TimeUnit>
                <TimeValue>{timeLeft.seconds}</TimeValue>
                <TimeLabel>Secs</TimeLabel>
              </TimeUnit>
            </Countdown>
          )}
        </Main>
      </Container>
    </>
  )
}


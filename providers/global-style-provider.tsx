"use client";

import styled from "styled-components";

function GlobalStyleProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <GlobalStyled>{children}</GlobalStyled>;
}

export default GlobalStyleProvider;

const GlobalStyled = styled.div`
  display: flex;
  height: 100%;
  padding: 2.5rem;
  gap: 2.5rem;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

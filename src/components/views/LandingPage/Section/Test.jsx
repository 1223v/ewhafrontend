import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../Modal/Modal";

function Test() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <AppWrap>
      <Button onClick={onClickButton}>Click Me !</Button>
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
    </AppWrap>
  );
}

const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  color: black;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  background-color: transparent;
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;

export default Test;

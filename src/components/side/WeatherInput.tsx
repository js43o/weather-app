import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { MdOutlineAdd, MdOutlineClose } from 'react-icons/md';
import Button from '../../lib/Button';
import palette from '../../utils/palette';
import flex from '../../utils/styles';
import useAddCity from 'hooks/useAddCity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';

const WeatherInputBlock = styled.div`
  ${flex('row')}
  margin-bottom: 1rem;
`;

const FormBox = styled.form`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  border: 1px solid ${palette.grey[200]};
  border-radius: 0.25rem;
  overflow: hidden;
`;

const InputBox = styled.input`
  flex-grow: 1;
  width: 100%;
  border: none;
  outline: none;
  padding: 0 0.5rem;
  background: ${palette.grey[200]};
  transition: background 0.25s;
  &:focus {
    background: white;
  }
  @media (max-width: 768px) {
    placeholder: 'Ente';
  }
`;

const SubmitButton = styled(Button)`
  border-radius: 0 0.25rem 0.25rem 0;
  &:active {
    opacity: 0.5;
  }
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`;

const CloseButton = styled(Button)`
  display: none;
  border: 1px solid ${palette.red[200]};
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  color: ${palette.red[500]};
  &:active {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    display: flex;
  }
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`;

type WeatherInputProps = {
  onToggleOpen: () => void;
};

const WeatherInput = ({ onToggleOpen }: WeatherInputProps) => {
  const loading = useSelector((state: RootState) => state.weather.loading);
  const dispatch = useDispatch();
  const onAddCity = useAddCity();

  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(onAddCity(input));
    setInput('');
  };

  useEffect(() => {
    if (!loading && inputRef.current) inputRef.current.focus();
  }, [loading]);

  return (
    <WeatherInputBlock>
      <FormBox onSubmit={handleSubmit} autoComplete="off">
        <InputBox
          name="city"
          type="text"
          onChange={onChange}
          value={input}
          placeholder="Enter the city name"
          required
          disabled={loading}
          ref={inputRef}
        />
        <SubmitButton type="submit">
          <MdOutlineAdd />
        </SubmitButton>
      </FormBox>
      <CloseButton onClick={onToggleOpen}>
        <MdOutlineClose />
      </CloseButton>
    </WeatherInputBlock>
  );
};

export default React.memo(WeatherInput);

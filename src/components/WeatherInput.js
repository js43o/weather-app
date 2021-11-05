import React, { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineAdd } from 'react-icons/md';

const WeatherInputBlock = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #cccccc;
    border-radius: 0.25rem;
    overflow: hidden;
    margin-bottom: 1rem;
    input {
      flex-grow: 1;
      border: none;
      outline: none;
      padding: 0 0.5rem;
      background: #eeeeee;
      transition: background 0.25s;
      &:focus {
        background: white;
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      border: none;
      border-radius: 0 0.25rem 0.25rem 0;
      background: white;
      font-size: 1.25rem;
    }
  }
`;

const WeatherInput = ({ onAddCity }) => {
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCity(input);
    setInput('');
  };

  return (
    <WeatherInputBlock>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          name="city"
          type="text"
          placeholder="Enter the city name..."
          onChange={onChange}
          value={input}
          required
        />
        <button type="submit">
          <MdOutlineAdd />
        </button>
      </form>
    </WeatherInputBlock>
  );
};

export default WeatherInput;

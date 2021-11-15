import styled from 'styled-components';
import flex from '../utils/styles';

const Button = styled.button`
  ${flex('row')}
  padding: 0.5rem;
  border: none;
  background: white;
  font-size: 1.25rem;
  cursor: pointer;
`;

export default Button;

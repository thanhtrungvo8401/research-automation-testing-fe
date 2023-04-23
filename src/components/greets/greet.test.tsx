import { render, screen } from '@testing-library/react';
import Greet from './greet';

/**
 * Greet should render the text hello and if the name is passed into the component... greet should render the name follow the 'hello'
 */

describe("UT - Greet", () => {  
  test('Greet render "Hello"', () => {
    render(<Greet />);
    
    const componentWithHello = screen.getByText(/Hello/);
    
    expect(componentWithHello).toBeInTheDocument();
  });
  
  test('Greet render "Hello ..."', () => {
    const actor = 'Trung';
    render(<Greet name={actor} />);
    
    const greetingComponent = screen.getByText(`Hello ${actor}`);
    
    expect(greetingComponent).toBeInTheDocument();
  })
})
import { describe, expect, it } from 'vitest'
import { render, screen } from "@testing-library/react"
import LoginPage from './login'

describe("Login page", () => {

  it("should render with required fields", () => {
    //Arrange
    //Act


    //getBy-> throws an error
    //queryBy-> returns null
    //findBy-> returns a promise or for async method



    //Assert
    render(<LoginPage />);
    expect(screen.getByText(/Sign in/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeInTheDocument();
    expect(screen.getByText('Forgot password')).toBeInTheDocument();




  })

})
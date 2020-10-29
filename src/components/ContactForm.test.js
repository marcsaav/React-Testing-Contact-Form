import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import ContactForm from './ContactForm'

test('Can fill out form', () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByPlaceholderText('Edd')
    const lastNameInput = screen.getByPlaceholderText('Burke')
    const emailInput = screen.getByPlaceholderText('bluebill1049@hotmail.com')
    const messageInput = screen.getByPlaceholderText('Message here.')

    fireEvent.change(firstNameInput, {target:{value: 'Mar', name: 'firstName'}})
    fireEvent.change(lastNameInput, {target:{value: 'Saavedra', name: 'lastName'}})
    fireEvent.change(emailInput, {target:{value: 'marcsaav96@gmail.com', name: 'email'}})
    fireEvent.change(messageInput, {target:{value: 'Oof, where did the change handler go?', name: 'message'}})

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    const newObject = screen.findByText('firstName')
    expect(newObject).toBeTruthy()
  })

  test('Error shows up when form is not filled out correctly', () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByPlaceholderText('Edd')

    fireEvent.change(firstNameInput, {target:{value: 'Marcos', name: 'firstName'}})

    screen.findByText('Looks like there was an error:')
  })

  test('Cannot submit when form is not filled out', () => {
    render(<ContactForm />)

    const submitButton = screen.getByRole('button')

    fireEvent.click(submitButton)

    screen.findByText('Looks like there was an error: required')
  })

  test('Cannot submit form when not filled out correctly', () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByPlaceholderText('Edd')
    const lastNameInput = screen.getByPlaceholderText('Burke')

    fireEvent.change(firstNameInput, {target:{value: 'Mar', name: 'firstName'}})
    fireEvent.change(lastNameInput, {target:{value: 'Saavedra', name: 'lastName'}})

    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    screen.findByText('Looks like there was an error: required')
  })
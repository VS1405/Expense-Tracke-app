import Greeting from "./Greeting"
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe('Greeting Component Test', () => {

    test('render greeting component', () => {
        render(<Greeting />)
        const helloElement = screen.getByText('Hello World!', { exact: false });

        expect(helloElement).toBeInTheDocument()
    });

    test('render "Nice to See You" if button NOT clicke', () => {
        render(<Greeting />)

        // Act
        const OutPutElement = screen.getByRole('button')
        userEvent.click(OutPutElement)

        // Assert
        const outPut = screen.getByText('Nice to See You', { exact: false })
        expect(outPut).toBeInTheDocument();
    });

    test('render "changed" if button is click', () => {
        render(<Greeting />)

        const outPutButton = screen.getByRole('button')
        userEvent.click(outPutButton)

        const OutPutElement = screen.getByText('Changed', { exact: false })
        expect(OutPutElement).toBeInTheDocument()
    })
    // should not finding if button is clicked
    test('does not found the nice to see you', () => {
        render(<Greeting />)

        const outPutButton = screen.getByRole('button')
        userEvent.click(outPutButton)

        const OutPutElement = screen.queryByText('Nice to See You', { exact: false })
        expect(OutPutElement).toBeNull()
    })
})
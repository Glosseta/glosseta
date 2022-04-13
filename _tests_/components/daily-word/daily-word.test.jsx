import React from 'react';
import {render, screen} from '@testing-library/react';
import DailyWord from '../../../src/components/daily-word/daily-word';

jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

const words = ["eip", "ethereum", "whale", "web3", "web2"];

it('it shows a word of words in a link', () => {
    render(<DailyWord words={words}/>);

    const wordLink = screen.getByRole('link');

    expect(wordLink).toBeInTheDocument();
    expect(words.includes(wordLink.text)).toBe(true);
})

it('it links the word to the correct page', () => {
    render(<DailyWord words={words}/>);

    const wordLink = screen.getByRole('link');
    const pattern = `search\\?term=${wordLink.text}`;
    const regex = new RegExp(pattern);

    expect(wordLink).toBeInTheDocument();
    expect(wordLink.href).toMatch(regex);
})

it('it shows a unique word in each day that matches with it\'s link', () => {
    const shownWords = new Set();
    const element = render(<DailyWord words={words}/>);

    for(let i=0;i<words.length;i++){
        const singleDay = 24 * 60 * 60 * 1000;
        const date = new Date((new Date).getTime() + singleDay * i);
        jest.useFakeTimers().setSystemTime(date);
        element.rerender(<DailyWord words={words}/>);

        const wordLink = screen.getByRole('link');
        const word = wordLink.text;
        const pattern = `search\\?term=${word}`;
        const regex = new RegExp(pattern);

        expect(wordLink).toBeInTheDocument();
        expect(wordLink.href).toMatch(regex);

        expect(shownWords.has(word)).toBe(false);
        shownWords.add(word);
        jest.useRealTimers();
    }
});

it('it shows the title correctly', () => {
    render(<DailyWord words={words}/>);

    const title = screen.getByText("wordOfTheDay");

    expect(title).toBeInTheDocument();
})

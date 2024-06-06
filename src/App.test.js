import App from "./components/App";
import { wait } from './helper';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import SearchPage from "./components/SearchPage";

jest.setTimeout(10000);

jest.mock("@canvasjs/react-charts", () => {
    return {
        CanvasJSChart: () => null,
    };
});

it('render home page in less than 500 milisecond', async () => {
    render(<App />);
    await wait(500);
    expect(screen.getByText(/Aìrnes/i)).toBeInTheDocument();
});

it('check if search page is rendered', async () => {
    render(
        <MemoryRouter initialEntries={["/search"]}>
            <SearchPage />
        </MemoryRouter>
    );

    await wait(500);

    expect(screen.getByPlaceholderText("Table basse!")).toBeInTheDocument();
});


it('if product appears with filter', async () => {
    render(
        <MemoryRouter initialEntries={["/search"]}>
            <SearchPage />
        </MemoryRouter>
    );

    await wait(500);

    const input = screen.getByPlaceholderText("Table basse!");
    fireEvent.change(input, { target: { value: 'wahs' } });

    await wait(500);

    const product = screen.getByText(/Wahson Armchair/i);
    expect(product).toBeInTheDocument();
});

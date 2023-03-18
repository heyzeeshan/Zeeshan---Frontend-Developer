import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Rockets from './components/pages/Rocket'

test('renders spacex message', () => {
  const { getByText } = render(<App />);
  const welcomeMessage = getByText('SpaceX');
  expect(welcomeMessage).toBeInTheDocument();
});

test('fetches data from SpaceX API', async () => {
  const response = await fetch('https://api.spacexdata.com/v4/rockets');
  const data = await response.json();
  expect(response.status).toEqual(200);
  expect(data.length).toBeGreaterThan(0);
});

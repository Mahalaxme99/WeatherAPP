import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import NewsScreen from '../../NewsScreen/NewsScreen'
import axios from 'axios';

jest.mock('axios');

describe('NewsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading indicator and then displays news list', async () => {
    const mockArticles = [
      {
        title: 'Breaking News',
        description: 'This is breaking news.',
        url: 'https://example.com/breaking',
      },
      {
        title: 'Tech News',
        description: 'This is tech news.',
        url: 'https://example.com/tech',
      },
    ];

    axios.get.mockResolvedValueOnce({ data: { articles: mockArticles } });

    render(<NewsScreen />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getAllByText(/Breaking News/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Tech News/i).length).toBeGreaterThan(0);

    });
  });

  it('shows error message when API fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API failure'));

    render(<NewsScreen />);

    await waitFor(() => {
      expect(screen.getByText(/Could not fetch news data/i)).toBeTruthy();
    });
  });
});

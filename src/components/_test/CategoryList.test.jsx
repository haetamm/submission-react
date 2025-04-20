/**
 * Test Scenarios
 *
 * - CategoryList component
 *   - should render the search instruction heading
 *   - should render categories with correct thread counts
 *   - should generate correct links for categories
 *   - should render nothing in trending-categories when threads and categories are empty
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryList from '../CategoryList';
import React from 'react';

vi.mock('../utils/constans', () => ({
  urlPage: {
    SEARCH: '/search',
  },
}));

const renderWithRouter = (categories = [], threads = []) => {
  return render(
    <MemoryRouter>
      <CategoryList categories={categories} threads={threads} />
    </MemoryRouter>
  );
};

describe('CategoryList', () => {
  const mockThreads = [
    { id: 1, category: 'React', title: 'React Thread 1' },
    { id: 2, category: 'React', title: 'React Thread 2' },
    { id: 3, category: 'JavaScript', title: 'JS Thread 1' },
  ];
  const mockCategories = ['React', 'JavaScript'];

  it('renders the search instruction heading', () => {
    renderWithRouter(mockCategories, mockThreads);
    expect(
      screen.getByText('Enter a title in the search input to find thread.')
    ).toBeInTheDocument();
  });

  it('renders categories with correct thread counts', () => {
    renderWithRouter(mockCategories, mockThreads);

    expect(screen.getByText('#React')).toBeInTheDocument();
    expect(screen.getByText('2 threads')).toBeInTheDocument();
    expect(screen.getByText('#JavaScript')).toBeInTheDocument();
    expect(screen.getByText('1 threads')).toBeInTheDocument();
  });

  it('generates correct links for categories', () => {
    renderWithRouter(mockCategories, mockThreads);

    expect(screen.getByText('#React').closest('a')).toHaveAttribute(
      'href',
      '/search?category=React'
    );
    expect(screen.getByText('#JavaScript').closest('a')).toHaveAttribute(
      'href',
      '/search?category=JavaScript'
    );
  });

  it('renders nothing in trending-categories when threads and categories are empty', () => {
    renderWithRouter([], []);

    expect(screen.queryByText(/#./)).not.toBeInTheDocument();
    expect(screen.queryByText(/threads/)).not.toBeInTheDocument();
    expect(screen.getByTestId('trending-categories').children).toHaveLength(0);
  });
});
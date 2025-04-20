/**
 * Test Scenarios
 *
 * - InputCustom component
 *   - should renders FaMoon icon when theme is light
 *   - should renders FaSun icon when theme is dark
 *   - hould calls toggleTheme when clicked
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ToggleTheme from '../ToggleTheme';
import { AppContext } from '../../context/AppContext';
import React from 'react';
import userEvent from '@testing-library/user-event';

// Mock AppContext
const createMockContext = (theme = 'light', toggleTheme = vi.fn()) => ({
  theme,
  toggleTheme,
});

const renderWithContext = (ui, contextValue) => {
  return render(
    <AppContext.Provider value={contextValue}>
      {ui}
    </AppContext.Provider>
  );
};

describe('ToggleTheme Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders FaMoon icon when theme is light', () => {
    const mockContext = createMockContext('light');
    renderWithContext(<ToggleTheme />, mockContext);

    const moonIcon = screen.getByTestId('moon-icon');
    expect(moonIcon).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('should renders FaSun icon when theme is dark', () => {
    const mockContext = createMockContext('dark');
    renderWithContext(<ToggleTheme />, mockContext);

    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('should calls toggleTheme when clicked', async () => {
    const toggleTheme = vi.fn();
    const mockContext = createMockContext('light', toggleTheme);
    renderWithContext(<ToggleTheme />, mockContext);

    const toggleElement = screen.getByTestId('moon-icon').parentElement;
    await userEvent.click(toggleElement);

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
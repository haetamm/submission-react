/**
 * Test Scenarios
 *
 * - Confirmation component
 *   - should renders button with correct text and classes
 *   - should calls dispatch with asyncUnsetAuthUser when clicked
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Confirmation from '../Confirmation';
import React from 'react';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn()
}));

vi.mock('../stores/authUser/action', () => ({
  asyncUnsetAuthUser: vi.fn()
}));

describe('Confirmation Component', () => {
  const mockDispatch = vi.fn();
  const testName = 'Logout';

  beforeEach(() => {
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders button with correct text and classes', () => {
    render(<Confirmation name={testName} />);

    const button = screen.getByRole('button', { name: testName });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(testName);
    expect(button).toHaveClass('cursor-pointer');
    expect(button).toHaveClass('btn-delete');
  });

  it('should calls dispatch with asyncUnsetAuthUser when clicked', () => {
    render(<Confirmation name={testName} />);

    const button = screen.getByText(testName);
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
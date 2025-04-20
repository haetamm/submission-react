/**
 * Test Scenarios
 *
 * - HeaderPage component
 *   - should renders without crashing
 *   - should displays the correct page name
 *   - should shows back arrow for "Search" page'
 *   - should shows back arrow for "Detail Thread" page
 *   - should does not show back arrow for other pages
 *   - should calls navigate(-1) when back arrow is clicked'
 *   - should renders ToggleTheme component
 *   - should applies w-header-thread class when changeStyle is true
 *   - hould applies w-header-thread_leaderboard class when changeStyle is false
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useMatches } from 'react-router-dom';
import HeaderPage from '../HeaderPage';
import React from 'react';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useMatches: vi.fn(),
}));

vi.mock('../ToggleTheme', () => ({
  default: vi.fn(() => <div>ToggleTheme</div>)
}));

vi.mock('react-icons/fa6', () => ({
  FaArrowLeft: vi.fn(({ onClick, className }) => (
    <div onClick={onClick} className={className}>FaArrowLeft</div>
  )),
}));

describe('HeaderPage Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  it('should renders without crashing', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Test Page' } }]);
    render(<HeaderPage changeStyle={false} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should displays the correct page name', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Test Page' } }]);
    render(<HeaderPage changeStyle={false} />);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('should shows back arrow for "Search" page', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Search' } }]);
    render(<HeaderPage changeStyle={false} />);
    expect(screen.getByText('FaArrowLeft')).toBeInTheDocument();
  });

  it('should shows back arrow for "Detail Thread" page', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Detail Thread' } }]);
    render(<HeaderPage changeStyle={false} />);
    expect(screen.getByText('FaArrowLeft')).toBeInTheDocument();
  });

  it('should does not show back arrow for other pages', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Home' } }]);
    render(<HeaderPage changeStyle={false} />);
    expect(screen.queryByText('FaArrowLeft')).not.toBeInTheDocument();
  });

  it('should calls navigate(-1) when back arrow is clicked', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Search' } }]);
    render(<HeaderPage changeStyle={false} />);
    fireEvent.click(screen.getByText('FaArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should renders ToggleTheme component', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Test Page' } }]);
    render(<HeaderPage changeStyle={false} />);
    expect(screen.getByText('ToggleTheme')).toBeInTheDocument();
  });

  it('should applies w-header-thread class when changeStyle is true', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Test Page' } }]);
    render(<HeaderPage changeStyle={true} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('w-header-thread');
    expect(header).not.toHaveClass('w-header-thread_leaderboard');
  });

  it('should applies w-header-thread_leaderboard class when changeStyle is false', () => {
    useMatches.mockReturnValue([{ handle: { name: 'Test Page' } }]);
    render(<HeaderPage changeStyle={false} />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('w-header-thread_leaderboard');
    expect(header).not.toHaveClass('w-header-thread');
  });
});
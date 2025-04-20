/**
 * Test Scenarios
 *
 * - InputCustom component
 *   - should renders input with correct base attributes
 *   - should displays the passed value correctly
 *   - should handles onChange event properly
 *   - should shows error message when error prop exists'
 *   - should does not show error message when error prop is empty
 *   - should sets autocomplete to new-password for password type
 *   - should applies correct classes to elements
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InputCustom from '../InputCustom';
import React from 'react';

describe('InputCustom Component', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    label: 'Username',
    name: 'username',
    type: 'text',
    onChange: mockOnChange,
  };

  it('should renders input with correct base attributes', () => {
    render(<InputCustom {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'username');
    expect(input).toHaveAttribute('name', 'username');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Username');
    expect(input).toHaveAttribute('autocomplete', 'off');
    expect(input).toHaveValue('');
  });

  it('should displays the passed value correctly', () => {
    render(<InputCustom {...defaultProps} value="john_doe" />);
    expect(screen.getByRole('textbox')).toHaveValue('john_doe');
  });

  it('should handles onChange event properly', () => {
    render(<InputCustom {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new_value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('new_value');
  });

  it('should shows error message when error prop exists', () => {
    render(<InputCustom {...defaultProps} error="Invalid username" />);

    const errorMessage = screen.getByText('Invalid username');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('error-message');
    expect(errorMessage.closest('.wrap-message')).toBeInTheDocument();
  });

  it('should does not show error message when error prop is empty', () => {
    const { container } = render(<InputCustom {...defaultProps} />);
    expect(container.querySelector('.error-message')).toBeNull();
  });

  it('should sets autocomplete to new-password for password type', () => {
    render(<InputCustom {...defaultProps} type="password" />);

    const input = screen.getByPlaceholderText('Username');
    expect(input).toHaveAttribute('autocomplete', 'new-password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should applies correct classes to elements', () => {
    const { container } = render(<InputCustom {...defaultProps} error="Error" />);

    expect(container.querySelector('.wrap-message')).toBeInTheDocument();
    expect(container.querySelector('.error-message')).toBeInTheDocument();
  });
});
/**
 * Test Scenarios
 *
 * - AvatarUser component
 *   - should render image with provided src correctly
 *   - should render default image when img prop is empty
 *   - should apply custom size and borderRadius correctly
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AvatarUser from '../AvatarUser';
import React from 'react';

describe('AvatarUser component', () => {
  it('should render image with given src', () => {
    const testImg = 'https://ui-avatars.com/api/?name=user1&background=random';
    render(<AvatarUser img={testImg} />);
    const imgElement = screen.getByAltText('AvatarUser');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testImg);
  });

  it('should render default image when img prop is not provided', () => {
    render(<AvatarUser img={''} />);
    const imgElement = screen.getByAltText('AvatarUser');
    expect(imgElement).toHaveAttribute(
      'src',
      'https://pbs.twimg.com/profile_images/1269621458822664192/NHV_D34w_400x400.jpg'
    );
  });
});

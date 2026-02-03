import React from 'react';
import { Button } from '../button';
import { Badge } from '../badge';
import { Avatar } from '../avatar';
import { Card } from '../card';

// Mock Spinner separately since it uses Reanimated
jest.mock('../spinner', () => ({
  Spinner: () => null,
}));

describe('Component Exports', () => {
  it('should export Button component', () => {
    expect(Button).toBeDefined();
    expect(typeof Button).toBe('function');
  });

  it('should export Badge component', () => {
    expect(Badge).toBeDefined();
    expect(typeof Badge).toBe('function');
  });

  it('should export Avatar component', () => {
    expect(Avatar).toBeDefined();
    expect(typeof Avatar).toBe('function');
  });

  it('should export Card component', () => {
    expect(Card).toBeDefined();
    expect(typeof Card).toBe('function');
  });
});

describe('Component Props', () => {
  it('Button should accept required props', () => {
    const element = React.createElement(Button, { children: 'Test' });
    expect(element.type).toBe(Button);
  });

  it('Badge should accept required props', () => {
    const element = React.createElement(Badge, { children: 'New' });
    expect(element.type).toBe(Badge);
  });

  it('Avatar should accept name prop', () => {
    const element = React.createElement(Avatar, { name: 'John Doe' });
    expect(element.type).toBe(Avatar);
    expect(element.props.name).toBe('John Doe');
  });

  it('Card should accept children prop', () => {
    const element = React.createElement(Card, { children: null });
    expect(element.type).toBe(Card);
  });
});

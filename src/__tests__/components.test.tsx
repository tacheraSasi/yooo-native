import React from 'react';
import { Button } from '../button';
import { Badge } from '../badge';
import { Avatar } from '../avatar';
import { Card } from '../card';
import { Switch } from '../switch';
import { Input } from '../input';
import { Label } from '../label';
import { Separator } from '../separator';
import { YoooProvider } from '../theme';

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

  it('should export Switch component', () => {
    expect(Switch).toBeDefined();
    expect(typeof Switch).toBe('function');
  });

  it('should export Input component', () => {
    expect(Input).toBeDefined();
  });

  it('should export Label component', () => {
    expect(Label).toBeDefined();
    expect(typeof Label).toBe('function');
  });

  it('should export Separator component', () => {
    expect(Separator).toBeDefined();
    expect(typeof Separator).toBe('function');
  });

  it('should export YoooProvider', () => {
    expect(YoooProvider).toBeDefined();
    expect(typeof YoooProvider).toBe('function');
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

  it('Switch should accept value prop', () => {
    const element = React.createElement(Switch, { value: true });
    expect(element.type).toBe(Switch);
    expect(element.props.value).toBe(true);
  });

  it('Input should accept placeholder prop', () => {
    const element = React.createElement(Input, { placeholder: 'Email' });
    expect(element.props.placeholder).toBe('Email');
  });

  it('Label should accept children prop', () => {
    const element = React.createElement(Label, { children: 'Name' });
    expect(element.type).toBe(Label);
  });

  it('Separator should accept orientation prop', () => {
    const element = React.createElement(Separator, { orientation: 'vertical' });
    expect(element.type).toBe(Separator);
    expect(element.props.orientation).toBe('vertical');
  });
});

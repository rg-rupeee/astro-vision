import { describe, it, expect } from '@jest/globals';

describe('Hello World functionality', () => {
  it('should return "Hello, World!"', () => {
    const helloWorld = () => 'Hello, World!';
    expect(helloWorld()).toBe('Hello, World!');
  });
});

import { describe, it } from 'mocha';
import assert from 'assert';

describe('Hello World', () => {
    it('should return "Hello, World!"', () => {
        const greeting = "Hello, World!";
        assert.strictEqual(greeting, "Hello, World!");
    });
});
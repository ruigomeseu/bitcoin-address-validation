import { base58_to_binary } from 'base58-js';
import { bech32, bech32m } from 'bech32';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getAddressInfo, validate } from '../src/index';

// Fail immediately if decoding is reached, so a regression cannot hang the suite.
vi.mock('base58-js', () => ({
  base58_to_binary: vi.fn(() => {
    throw new Error('Decoder reached');
  }),
}));
vi.mock('bech32', () => ({
  bech32: {
    decodeUnsafe: vi.fn(() => {
      throw new Error('Decoder reached');
    }),
  },
  bech32m: {
    decodeUnsafe: vi.fn(() => {
      throw new Error('Decoder reached');
    }),
  },
}));

beforeEach(() => vi.clearAllMocks());

describe('Address input length limit', () => {
  it.each([501, 10 * 1024, 1024 * 1024])('rejects %i Base58 characters before decoding', (length) => {
    const address = '3'.repeat(length);

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow('Invalid address');
    expect(vi.mocked(base58_to_binary).mock.calls.length).toBe(0);
    expect(vi.mocked(bech32.decodeUnsafe).mock.calls.length).toBe(0);
    expect(vi.mocked(bech32m.decodeUnsafe).mock.calls.length).toBe(0);
  });

  it.each(['bc1q', 'bc1p', 'tb1q', 'bcrt1p'])('rejects oversized %s inputs before decoding', (prefix) => {
    const address = prefix + '3'.repeat(501 - prefix.length);

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow('Invalid address');
    expect(vi.mocked(base58_to_binary).mock.calls.length).toBe(0);
    expect(vi.mocked(bech32.decodeUnsafe).mock.calls.length).toBe(0);
    expect(vi.mocked(bech32m.decodeUnsafe).mock.calls.length).toBe(0);
  });

  it('leaves inputs of exactly 500 characters to format validation', () => {
    const address = '3'.repeat(500);

    expect(() => getAddressInfo(address)).toThrow('Invalid address');
    expect(base58_to_binary).toHaveBeenCalledWith(address);
  });
});

import validate, { getAddressInfo, Network } from '../src/index';
import { expect, describe, it } from "vitest";

describe('Validation and parsing', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ type: 'p2pkh', network: 'mainnet', bech32: false, address });
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ type: 'p2pkh', network: 'testnet', bech32: false, address });
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    expect(validate(address)).toBe(false);
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ type: 'p2sh', network: 'mainnet', bech32: false, address });
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ type: 'p2sh', network: 'testnet', bech32: false, address });
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    expect(validate(address)).toBe(false);
  });

  it('handles bogus address', () => {
    const address = 'x';

    expect(validate(address)).toBe(false);
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = ['bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', 'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s'];

    expect(validate(addresses[0])).not.toBe(false);
    expect(getAddressInfo(addresses[0])).toEqual({
      bech32: true,
      type: 'p2wpkh',
      network: 'mainnet',
      address: addresses[0],
    });

    expect(validate(addresses[1])).not.toBe(false);
    expect(getAddressInfo(addresses[1])).toEqual({
      bech32: true,
      type: 'p2wpkh',
      network: 'mainnet',
      address: addresses[1],
    });
  });

  it('validates uppercase Bech32 P2WPKH', () => {
    const addresses = ['BC1Q973XRRGJE6ETKKN9Q9AZZSGPXEDDATS8CKVP5S', 'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4'];

    expect(validate(addresses[0])).not.toBe(false);
    expect(getAddressInfo(addresses[0])).toEqual({
      bech32: true,
      type: 'p2wpkh',
      network: 'mainnet',
      address: addresses[0],
    });

    expect(validate(addresses[1])).not.toBe(false);
    expect(getAddressInfo(addresses[1])).toEqual({
      bech32: true,
      type: 'p2wpkh',
      network: 'mainnet',
      address: addresses[1],
    });
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2wpkh', network: 'testnet', address });
  });

  it('validates Regtest Bech32 P2WPKH', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2wpkh', network: 'regtest', address });
  });

  it('validates Mainnet Bech32 P2TR', () => {
    const address = 'bc1ptxs597p3fnpd8gwut5p467ulsydae3rp9z75hd99w8k3ljr9g9rqx6ynaw';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2tr', network: 'mainnet', address });
  });

  it('validates Testnet Bech32 P2TR', () => {
    const address = 'tb1p84x2ryuyfevgnlpnxt9f39gm7r68gwtvllxqe5w2n5ru00s9aquslzggwq';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2tr', network: 'testnet', address });
  });

  it('validates Regtest Bech32 P2TR', () => {
    const address = 'bcrt1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqc8gma6';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2tr', network: 'regtest', address });
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2wsh', network: 'mainnet', address });
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2wsh', network: 'testnet', address });
  });

  it('validates Regtest Bech32 P2WSH', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2wsh', network: 'regtest', address });
  });

  it('validates Signet Bech32 P2WKH', () => {
    const address = 'bcrt1qc7evl8kdgp69h7qmm8cndaq07xkhj6ulyck0x5';

    expect(validate(address)).not.toBe(false);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2wpkh', network: 'regtest', address });
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    expect(validate(address)).toBe(false);
  });

  it('errors on non-base58 encoded', () => {
    expect(() => getAddressInfo('???')).toThrow();
  });
});

describe('Witness validation regressions', () => {
  // Custom mutations of BIP 350 vectors, not official vectors. Reject non-ASCII
  // characters before case normalization, as in the reference decoder:
  // https://github.com/sipa/bech32/blob/master/ref/python/segwit_addr.py
  it('rejects a Kelvin sign in an uppercase Bech32 address', () => {
    const original = 'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4';
    const address = original.replace('K', '\u212a');

    expect(validate(original)).toBe(true);
    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects a Kelvin sign in an uppercase Bech32m address', () => {
    const original = 'BC1P0XLXVLHEMJA6C4DQV22UAPCTQUPFHLXM9H8Z3K2E72Q4K9HCZ7VQZK5JJ0';
    const address = original.replace('K', '\u212a');

    expect(validate(original)).toBe(true);
    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  // Custom fixtures, not official vectors. Length rules:
  // https://github.com/bitcoin/bips/blob/24e96e870fffaa257b465ce1f0370c14aac588e8/bip-0350.mediawiki#addresses-for-segregated-witness-outputs
  it('rejects an empty version 0 witness program with a valid checksum', () => {
    const address = 'bc1q9zpgru';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects a two-byte version 0 witness program with a valid checksum', () => {
    const address = 'bc1qqyqsvvqw2m';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  // Custom mutation exercising the Bech32 insertion weakness described in BIP 350:
  // https://github.com/bitcoin/bips/blob/24e96e870fffaa257b465ce1f0370c14aac588e8/bip-0350.mediawiki#motivation
  it('rejects a checksum-preserving insertion that changes the version 0 program length', () => {
    const original = 'bc1qqvd54age0mps4yn0fr85pcg60k7ywqzg5g0yqqah50q8chdtrw4q5xrq3p';
    const address = original.slice(0, -1) + 'qqqqqqqqp';

    expect(validate(original)).toBe(true);
    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  // Case variants of the mainnet Taproot vectors in BIP 350, not verbatim vectors.
  // BIP 350 retains BIP 173's acceptance of all-uppercase addresses.
  it('accepts an uppercase Taproot address with a Bech32m checksum', () => {
    const address = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0'.toUpperCase();

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'p2tr', network: 'mainnet', address });
  });

  it('rejects an uppercase Taproot address with a Bech32 checksum', () => {
    const address = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqh2y7hd'.toUpperCase();

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });
});

describe('Base58 alphabet regressions', () => {
  // Custom malformed inputs derived from valid Base58Check addresses, not official BIP vectors.
  it('rejects a trailing line feed', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem\n';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects trailing CRLF', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem\r\n';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects an embedded line feed', () => {
    const address = '17VZNX1SN5\nNtKa8UQFxwQbFeFc3iqRYhem';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects an embedded carriage return', () => {
    const address = '17VZNX1SN5\rNtKa8UQFxwQbFeFc3iqRYhem';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects an embedded Unicode line separator', () => {
    const address = '17VZNX1SN5\u2028NtKa8UQFxwQbFeFc3iqRYhem';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects an embedded Unicode paragraph separator', () => {
    const address = '17VZNX1SN5\u2029NtKa8UQFxwQbFeFc3iqRYhem';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects punctuation that the decoder maps to the same bytes as a valid address', () => {
    const original = '19kD1gZjgzuP8KuQw8fKTm9hoNuqLUnTUw';
    const address = '19kD1gZjh?uP8KuQw8fKTm9hoNuqLUnTUw';

    expect(validate(original)).toBe(true);
    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });
});

describe('Witness address type regressions', () => {
  // Classification uses both witness version and program length:
  // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#witness-program
  // https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki#script-validation-rules
  it('accepts the two-byte witness program minimum as an unknown version 1 type', () => {
    // Custom Bech32m fixture containing two 0x01 bytes.
    const address = 'bc1pqyqsa3ky2c';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'unknown', network: 'mainnet', address });
  });

  it('reports unknown witness types on testnet', () => {
    // Custom Bech32m fixture containing twenty 0x01 bytes at witness version 1.
    const address = 'tb1pqyqszqgpqyqszqgpqyqszqgpqyqszqgpsdrp6t';

    expect(validate(address, Network.testnet)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'unknown', network: 'testnet', address });
  });

  it('reports unknown witness types on regtest', () => {
    // Custom Bech32m fixture containing twenty 0x01 bytes at witness version 1.
    const address = 'bcrt1pqyqszqgpqyqszqgpqyqszqgpqyqszqgpjy6vdz';

    expect(validate(address, Network.regtest)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'unknown', network: 'regtest', address });
  });

  it('does not classify a version 1 20-byte program as P2WPKH', () => {
    // Custom Bech32m fixture containing twenty 0x01 bytes.
    const address = 'bc1pqyqszqgpqyqszqgpqyqszqgpqyqszqgp6tcjpc';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'unknown', network: 'mainnet', address });
  });

  it('does not classify the official version 1 40-byte program as Taproot', () => {
    // Third valid BIP 350 address vector, also exercised in the official-vector group below.
    const address = 'bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kt5nd6y';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ bech32: true, type: 'unknown', network: 'mainnet', address });
  });
});

describe('Casting', () => {
  it('rejects casting a testnet address to mainnet from JavaScript', () => {
    const address = 'tb1qg3hss5p9g9jp0es5u5aaz3lszf6cvdggtmjarr';
    // Deliberately bypass TypeScript to exercise invalid JavaScript caller input.
    const options = { castTestnetTo: Network.mainnet } as unknown as Parameters<typeof getAddressInfo>[1];

    expect(validate(address, Network.mainnet, options)).toBe(false);
    expect(() => getAddressInfo(address, options)).toThrow();
  });

  it('rejects an unrecognized casting destination from JavaScript', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';
    const options = { castTestnetTo: 'invalid' } as unknown as Parameters<typeof getAddressInfo>[1];

    expect(validate(address, undefined, options)).toBe(false);
    expect(() => getAddressInfo(address, options)).toThrow();
  });

  it('rejects an empty casting destination from JavaScript', () => {
    const address = 'tb1qg3hss5p9g9jp0es5u5aaz3lszf6cvdggtmjarr';
    const options = { castTestnetTo: '' } as unknown as Parameters<typeof getAddressInfo>[1];

    expect(validate(address, undefined, options)).toBe(false);
    expect(() => getAddressInfo(address, options)).toThrow();
  });

  it('casts testnet to regtest', () => {
    const address = 'tb1qg3hss5p9g9jp0es5u5aaz3lszf6cvdggtmjarr';

    expect(getAddressInfo(address, { castTestnetTo: Network.regtest })).toEqual({ bech32: true, type: 'p2wpkh', network: 'regtest', address });
    expect(validate(address, Network.regtest, { castTestnetTo: Network.regtest })).toBe(true);
  });

  it('casts testnet to signet', () => {
    const address = 'tb1qg3hss5p9g9jp0es5u5aaz3lszf6cvdggtmjarr';

    expect(getAddressInfo(address, { castTestnetTo: Network.signet })).toEqual({ bech32: true, type: 'p2wpkh', network: 'signet', address });
    expect(validate(address, Network.signet, { castTestnetTo: Network.signet })).toEqual(true);
  });

  it('fails to validate a mainnet address casted to signet', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    expect(() => getAddressInfo(address, { castTestnetTo: Network.signet })).toThrow();
    expect(validate(address, Network.signet, { castTestnetTo: Network.signet })).toEqual(false);
  });

  // The README's "Casting testnet addresses to regtest or signet" contract applies only to testnet.
  it('does not validate a regtest address as signet when testnet casting is enabled', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    expect(validate(address, Network.regtest)).toBe(true);
    expect(validate(address, Network.regtest, { castTestnetTo: Network.signet })).toBe(true);
    expect(validate(address, Network.signet, { castTestnetTo: Network.signet })).toBe(false);
  });

  it('does not report a regtest address as signet when testnet casting is enabled', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    expect(getAddressInfo(address, { castTestnetTo: Network.signet }).network).toBe(Network.regtest);
  });
});

describe('Validation & network', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    expect(validate(address, Network.mainnet)).toBe(true);
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    expect(validate(address, Network.testnet)).toBe(true);
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    expect(validate(address, Network.mainnet)).toBe(false);
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    expect(validate(address, Network.mainnet)).toBe(true);
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    expect(validate(address, Network.testnet)).toBe(true);
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    expect(validate(address, Network.mainnet)).toBe(false);
  });

  it('handles bogus address', () => {
    const address = 'x';

    expect(validate(address, Network.mainnet)).toBe(false);
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = ['bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4', 'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s'];

    expect(validate(addresses[0], Network.mainnet)).toBe(true);

    expect(validate(addresses[1], Network.mainnet)).toBe(true);
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    expect(validate(address, Network.testnet)).toBe(true);
  });

  it('validates Regtest Bech32 P2WPKH', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    expect(validate(address, Network.regtest)).toBe(true);
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    expect(validate(address, Network.mainnet)).toBe(true);
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    expect(validate(address, Network.testnet)).toBe(true);
  });

  it('validates Regtest Bech32 P2WSH', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    expect(validate(address, Network.regtest)).toBe(true);
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    expect(validate(address, Network.mainnet)).toBe(false);
  });
});

// Official BIP 350 vectors: "Test vectors for v0-v16 native segregated witness addresses".
// Source: https://github.com/bitcoin/bips/blob/24e96e870fffaa257b465ce1f0370c14aac588e8/bip-0350.mediawiki#test-vectors-for-v0-v16-native-segregated-witness-addresses
// All 8 valid and 15 invalid address vectors are copied verbatim; test labels are descriptive.
// Generic Bech32m strings are not Bitcoin addresses. BIP 350 supersedes BIP 173 for witness v1+.
describe('Official BIP 350 address vectors', () => {
  it('accepts uppercase mainnet P2WPKH', () => {
    const address = 'BC1QW508D6QEJXTDG4Y5R3ZARVARY0C5XW7KV8F3T4';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'mainnet', type: 'p2wpkh' });
  });

  it('accepts testnet P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'testnet', type: 'p2wsh' });
  });

  it('accepts version 1 with a 40-byte program', () => {
    const address = 'bc1pw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kt5nd6y';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'mainnet', type: 'unknown' });
  });

  it('accepts uppercase version 16', () => {
    const address = 'BC1SW50QGDZ25J';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'mainnet', type: 'unknown' });
  });

  it('accepts version 2', () => {
    const address = 'bc1zw508d6qejxtdg4y5r3zarvaryvaxxpcs';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'mainnet', type: 'unknown' });
  });

  it('accepts testnet P2WSH with leading zero bytes', () => {
    const address = 'tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'testnet', type: 'p2wsh' });
  });

  it('accepts testnet Taproot', () => {
    const address = 'tb1pqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesf3hn0c';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'testnet', type: 'p2tr' });
  });

  it('accepts mainnet Taproot', () => {
    const address = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0';

    expect(validate(address)).toBe(true);
    expect(getAddressInfo(address)).toEqual({ address, bech32: true, network: 'mainnet', type: 'p2tr' });
  });

  it('rejects unknown network prefix', () => {
    const address = 'tc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vq5zuyut';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects version 1 encoded with Bech32', () => {
    const address = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqh2y7hd';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects version 2 encoded with Bech32', () => {
    const address = 'tb1z0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqglt7rf';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects version 16 encoded with Bech32', () => {
    const address = 'BC1S0XLXVLHEMJA6C4DQV22UAPCTQUPFHLXM9H8Z3K2E72Q4K9HCZ7VQ54WELL';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects 20-byte version 0 encoded with Bech32m', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kemeawh';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects 32-byte version 0 encoded with Bech32m', () => {
    const address = 'tb1q0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vq24jc47';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects invalid checksum character', () => {
    const address = 'bc1p38j9r5y49hruaue7wxjce0updqjuyyx0kh56v8s25huc6995vvpql3jow4';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects witness version above 16', () => {
    const address = 'BC130XLXVLHEMJA6C4DQV22UAPCTQUPFHLXM9H8Z3K2E72Q4K9HCZ7VQ7ZWS8R';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects one-byte witness program', () => {
    const address = 'bc1pw5dgrnzv';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects 41-byte witness program', () => {
    const address = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7v8n0nx0muaewav253zgeav';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects invalid version 0 program length', () => {
    const address = 'BC1QR508D6QEJXTDG4Y5R3ZARVARYV98GJ9P';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects mixed case', () => {
    const address = 'tb1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vq47Zagq';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects excess padding', () => {
    const address = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7v07qwwzcrf';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects nonzero padding', () => {
    const address = 'tb1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vpggkg4j';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });

  it('rejects missing witness version', () => {
    const address = 'bc1gmk9yu';

    expect(validate(address)).toBe(false);
    expect(() => getAddressInfo(address)).toThrow();
  });
});

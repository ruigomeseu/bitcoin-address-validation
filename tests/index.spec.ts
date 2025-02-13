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

describe('Casting', () => {
  it('casts testnet to regtest', () => {
    const address = 'tb1qg3hss5p9g9jp0es5u5aaz3lszf6cvdggtmjarr';

    expect(getAddressInfo(address, { castTestnetTo: Network.signet })).toEqual({ bech32: true, type: 'p2wpkh', network: 'signet', address });
    expect(validate(address, Network.signet, { castTestnetTo: Network.signet })).toEqual(true);
  });

  it('fails to validate a mainnet address casted to signet', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    expect(() => getAddressInfo(address, { castTestnetTo: Network.signet })).toThrow();
    expect(validate(address, Network.signet, { castTestnetTo: Network.signet })).toEqual(false);
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

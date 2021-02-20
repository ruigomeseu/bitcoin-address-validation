import { validate } from '../src/index';

describe('Validator', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2pkh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2pkh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(validate(address));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2sh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2sh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(validate(address));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(validate(address));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(validate(address));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isNotFalse(validate(addresses[0]));
    assert.include(validate(addresses[0]), { bech32: true, type: 'p2wpkh', network: 'mainnet' });

    assert.isNotFalse(validate(addresses[1]));
    assert.include(validate(addresses[1]), { bech32: true, type: 'p2wpkh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wpkh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WPKH', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wpkh', network: 'regtest' });
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WSH', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', network: 'regtest' });
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(validate(address));
  });
});

describe('Strict Validator', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isTrue(validate(address, 'mainnet'));
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isTrue(validate(address, 'testnet'));
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(validate(address, 'mainnet'));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isTrue(validate(address, 'mainnet'));
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isTrue(validate(address, 'testnet'));
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(validate(address, 'mainnet'));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(validate(address, 'mainnet'));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(validate(address, 'mainnet'));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isTrue(validate(addresses[0], 'mainnet'));

    assert.isTrue(validate(addresses[1], 'mainnet'));
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isTrue(validate(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WPKH', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isTrue(validate(address, 'regtest'));
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isTrue(validate(address, 'mainnet'));
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isTrue(validate(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WSH', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isTrue(validate(address, 'regtest'));
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(validate(address, 'mainnet'));
  });
});

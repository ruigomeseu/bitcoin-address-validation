const { assert } = require('chai');
const { validator, strictValidator } = require('../lib/index.cjs.js');

describe('Validator', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { type: 'p2pkh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { type: 'p2pkh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(validator(address));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { type: 'p2sh', network: 'mainnet', bech32: false });
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { type: 'p2sh', network: 'testnet', bech32: false });
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(validator(address));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(validator(address));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(validator(address));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isNotFalse(validator(addresses[0]));
    assert.include(validator(addresses[0]), { bech32: true, type: 'p2wpkh', network: 'mainnet' });

    assert.isNotFalse(validator(addresses[1]));
    assert.include(validator(addresses[1]), { bech32: true, type: 'p2wpkh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { bech32: true, type: 'p2wpkh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WPKH as tesnet', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { bech32: true, type: 'p2wpkh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WPKH as regtest with flag enabled', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isNotFalse(validator(address, true));
    assert.include(validator(address, true), { bech32: true, type: 'p2wpkh', network: 'regtest' });
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { bech32: true, type: 'p2wsh', network: 'mainnet' });
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { bech32: true, type: 'p2wsh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WSH as testnet', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isNotFalse(validator(address));
    assert.include(validator(address), { bech32: true, type: 'p2wsh', network: 'testnet' });
  });

  it('validates Regtest Bech32 P2WSH as regtest with flag enabled', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isNotFalse(validator(address, true));
    assert.include(validator(address, true), { bech32: true, type: 'p2wsh', network: 'regtest' });
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(validator(address));
  });
});

describe('Strict Validator', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isTrue(strictValidator(address, 'mainnet'));
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(strictValidator(address, 'mainnet'));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isTrue(strictValidator(address, 'mainnet'));
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('fails on invalid P2SH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFFFc3iqRYhem';

    assert.isFalse(strictValidator(address, 'mainnet'));
  });

  it('handles null address', () => {
    const address = null;

    assert.isFalse(strictValidator(address, 'mainnet'));
  });

  it('handles bogus address', () => {
    const address = 'x';

    assert.isFalse(strictValidator(address, 'mainnet'));
  });

  it('validates Mainnet Bech32 P2WPKH', () => {
    const addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isTrue(strictValidator(addresses[0], 'mainnet'));

    assert.isTrue(strictValidator(addresses[1], 'mainnet'));
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WPKH as testnet', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WPKH as regtest with flag enabled', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isTrue(strictValidator(address, 'regtest', true));
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isTrue(strictValidator(address, 'mainnet'));
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WSH as testnet', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('validates Regtest Bech32 P2WSH as regtest with flag enabled', () => {
    const address = 'bcrt1q5n2k3frgpxces3dsw4qfpqk4kksv0cz96pldxdwxrrw0d5ud5hcqzzx7zt';

    assert.isTrue(strictValidator(address, 'regtest', true));
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(strictValidator(address, 'mainnet'));
  });

  it('validates bech32 regtest address on testnet network with default settings', () => {
    const address = 'bcrt1q6rhpng9evdsfnn833a4f4vej0asu6dk5srld6x';

    assert.isTrue(strictValidator(address, 'testnet'));
  });

  it('fails to validate bech32 regtest address on testnet network with flag enabled', () => {
    const address = 'bcrt1q6z64a43mjgkcq0ul2znwneq3spghrlau9slefp';

    assert.isFalse(strictValidator(address, 'testnet', true));
  });
});

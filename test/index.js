const { assert } = require('chai');
const validate = require('../lib/index.cjs.js');

describe('Validator', () => {
  it('validates Mainnet P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2pkh', testnet: false, bech32: false });
  });

  it('validates Testnet P2PKH', () => {
    const address = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2pkh', testnet: true, bech32: false });
  });

  it('fails on invalid P2PKH', () => {
    const address = '17VZNX1SN5NtKa8UFFxwQbFeFc3iqRYhem';

    assert.isFalse(validate(address));
  });

  it('validates Mainnet P2SH', () => {
    const address = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2sh', testnet: false, bech32: false });
  });

  it('validates Testnet P2SH', () => {
    const address = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { type: 'p2sh', testnet: true, bech32: false });
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
    let addresses = [
      'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
      'bc1q973xrrgje6etkkn9q9azzsgpxeddats8ckvp5s',
    ];

    assert.isNotFalse(validate(addresses[0]));
    assert.include(validate(addresses[0]), { bech32: true, type: 'p2wpkh', testnet: false });

    assert.isNotFalse(validate(addresses[1]));
    assert.include(validate(addresses[1]), { bech32: true, type: 'p2wpkh', testnet: false });
  });

  it('validates Testnet Bech32 P2WPKH', () => {
    const address = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wpkh', testnet: true });
  });

  it('validates Mainnet Bech32 P2WSH', () => {
    const address = 'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', testnet: false });
  });

  it('validates Testnet Bech32 P2WSH', () => {
    const address = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7';

    assert.isNotFalse(validate(address));
    assert.include(validate(address), { bech32: true, type: 'p2wsh', testnet: true });
  });

  it('fails on invalid Bech32', () => {
    const address = 'bc1qw508d6qejxtdg4y5r3zrrvary0c5xw7kv8f3t4';

    assert.isFalse(validate(address));
  });
});

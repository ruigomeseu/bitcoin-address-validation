# bitcoin-address-validation

## 4.0.0

### Major Changes

- 1285f9c: Improve address validation and witness type detection.

  Valid witness addresses with an unrecognized type now return `AddressType.unknown`. Update exhaustive switches and mappings over `AddressType` to handle this value. Applications requiring a recognized payment type should check `type` in addition to `validate`.

  Casting destinations are now checked at runtime and must be `regtest` or `signet`.

  Update dependencies to their latest stable releases. Node.js users now require Node.js 18.8 or newer.

## 3.0.1

### Patch Changes

- 4d3665f: Reject address inputs longer than 500 characters before decoding to prevent excessive CPU usage.

## 3.0.0

### Major Changes

- 0ce0ba3: - Simplifies build and test process
  - Supports ESM only
  - Adds casting of testnet addresses to regtest or signet
  - Adds changelog

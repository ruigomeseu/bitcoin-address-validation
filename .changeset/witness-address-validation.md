---
'bitcoin-address-validation': major
---

Improve address validation and witness type detection.

Valid witness addresses with an unrecognized type now return `AddressType.unknown`. Update exhaustive switches and mappings over `AddressType` to handle this value. Applications requiring a recognized payment type should check `type` in addition to `validate`.

Casting destinations are now checked at runtime and must be `regtest` or `signet`.

Update dependencies to their latest stable releases. Node.js users now require Node.js 18.8 or newer.

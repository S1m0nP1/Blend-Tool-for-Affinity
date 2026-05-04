# Blend Tool v2 — User Guide

## Support This Project

If this project helped you, you can support it:

- One-time tip: [Buy Me a Coffee](https://www.buymeacoffee.com/S1m0nP)
- Monthly support: [GitHub Sponsors](https://github.com/sponsors/S1m0nP1)

This tool stays free and open source. Support is optional.


**Platform:** Affinity V3.2
**Author:** © S1m0np1

The Blend Tool is a script that generates smooth morphing transitions between two shapes or groups — interpolating their position, form, fill, stroke, and scale across a configurable number of intermediate steps. Results can optionally follow a custom path and be edited non-destructively after creation.

---

## What's New in v23

Two bugs from v1 have been fixed:

- **Flip shapes without a path** — Previously, flipping swapped shapes to each other's document position instead of just reversing the morph direction. This is now corrected: flip only swaps the *appearance*, never the *position*.
- **Misplaced steps on high-count curve blends** — With many steps (e.g. 600), shapes near bezier segment boundaries could be placed wildly out of position. This is now fixed with a more accurate arc-length sampling method.

---

## Before You Start

The script works on two kinds of object:

| Type | Notes |
|------|-------|
| **Vector shapes** | Standard curves and closed paths |
| **Groups** | Each child shape is blended individually. Use *Layer > Convert to Curves* on groups first if needed |

Both objects must be the **same type** — two vectors or two groups. You cannot mix them.

---

## How to Run the Script

Select your objects first, then run the script. What happens depends on how many objects are selected:

| Selection | Result |
|-----------|--------|
| **2 objects** | Opens the blend dialog |
| **3 objects** | Blend on Path — the 3rd object is used as the path |
| **1 blend container** | Opens the Apply Spine dialog (see below) |
| Anything else | Shows a helpful error message |

---

## The Main Dialog

When you select two shapes and run the script, the blend dialog opens. It is divided into several sections.

---

### Settings

This section controls the overall structure of the blend.

#### Steps
The number of intermediate shapes generated between your two originals. The final output will contain your two original shapes plus however many steps you enter here.

- Low values (e.g. **3–8**) create a visible, chunky series of shapes.
- High values (e.g. **50–200**) create a smooth, near-continuous transition.


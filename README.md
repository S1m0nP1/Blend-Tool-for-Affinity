# Blend Tool v16.6.3 — User Guide

## Support This Project

If this project helped you, you can support it:

- One-time tip: [Buy Me a Coffee](https://www.buymeacoffee.com/S1m0nP)
- Monthly support: [GitHub Sponsors](https://github.com/sponsors/S1m0nP1)

This tool stays free and open source. Support is optional.


**Platform:** Affinity V3.2
**Author:** © S1m0np1

The Blend Tool is a script that generates smooth morphing transitions between two shapes or groups — interpolating their position, form, fill, stroke, and scale across a configurable number of intermediate steps. Results can optionally follow a custom path and be edited non-destructively after creation.

---

## What's New in v16.6.3

Two bugs from v16.6.2 have been fixed:

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

#### Twist (°)
Rotates the blended steps progressively from Shape A to Shape B. A value of **360** makes the shapes spin one full revolution across the blend.

- Positive values rotate clockwise.
- Negative values rotate anti-clockwise.

#### Reverse Twist
Flips the direction of the twist. Tick this if the rotation goes the wrong way.

#### Align Start Points
When both shapes are closed paths, this attempts to automatically rotate the anchor point order on Shape B to best match Shape A — minimising unwanted twisting in the morph. Leave this on unless you need manual control.

#### Reverse Second Path Direction
Reverses the winding direction (the order anchor points are traversed) on Shape B before blending. Useful when two similar shapes morph in an unexpected mirror-image direction.

#### Stacking Order
Controls which shape sits on top in the layer stack within the blend container.

- **B on top** — Shape B and steps near it appear above Shape A.
- **A on top** — The reverse.

#### Flip Shapes
Swaps which shape is treated as the start (Sh 1) and which is the end (Sh 2) of the blend. The spatial positions stay fixed; only the morph direction reverses. Useful when the blend appears to run the wrong way around.

> On a **Blend on Path**, the script automatically detects which shape is closer to the start of the path and sets it as Sh 1. A note appears in the dialog when this happens.

---

### Shape A and Shape B

Each shape has its own panel where you can override how it looks at its endpoint of the blend.

#### Fill (vectors only)
A colour picker showing the current fill colour of the shape. Change it here to override the fill at that endpoint — the blend will interpolate between the two fill colours you set.

#### Stroke Colour (vectors only)
Override the stroke colour at this endpoint.

#### Stroke Width (vectors only)
Override the stroke width (in document units) at this endpoint. The blend will smoothly transition the width across all steps.

#### Scale Shape (%)
Scales the shape at its endpoint, relative to its original size. `100` = no change.

- Set Shape A to `150` and Shape B to `50` to have shapes start large and shrink across the blend.
- Combined with **Scale Blend Center**, this can create arc or bulge effects.

---

### Scale Blend Center

This section lets you make the middle of the blend larger or smaller than both endpoints — creating a "bulge" or "pinch" effect at the centre.

#### Scale (%)
How much to scale shapes at the exact midpoint of the blend. `100` = no change. `150` = steps in the middle are 50% larger than the surrounding endpoint scale.

#### Softness (%)
Controls how broadly the center scaling effect is spread across the blend.

- **Low softness (e.g. 5–20%)** — Only steps very near the middle are scaled. Creates a sharp, narrow bump.
- **High softness (e.g. 70–100%)** — The scaling spreads across most of the blend. Creates a gentle, wide curve.

---

### Spacing

Controls how the intermediate steps are distributed between the two shapes.

#### Easing
By default, steps are placed at equal intervals (linear). Easing shifts them toward one end.

| Option | Effect |
|--------|--------|
| **Linear** | Equal spacing — steps are evenly spread |
| **Ease In** | Steps cluster near Shape A, spread out toward Shape B |
| **Ease Out** | Steps spread out from Shape A, cluster near Shape B |
| **Ease In+Out** | Steps cluster at both ends, spread in the middle |

#### Easing Factor
How strongly the easing is applied. Only active when a non-Linear easing is selected.

- **1.0** — Very subtle.
- **2.0** — Moderate (default).
- **5.0+** — Extreme clustering.

---

### Colour

#### Interpolate Fill
When **on**, fills are smoothly blended from Shape A's colour to Shape B's colour across all steps. When **off**, every step uses Shape A's fill.

Supports solid fills and gradients. If one shape has a gradient and the other has a solid fill, the solid is treated as a two-stop gradient and interpolated correctly.

#### Interpolate Stroke
The same, but for stroke colour and weight.

---

### Spine

#### Create Editable Spine
When ticked, a purple guide line (the **spine**) is added to the blend container after creation. The spine runs from the centre of Shape A to the centre of Shape B.

You can move and reshape this line freely in Affinity. To reposition all blend steps along the edited spine, select the blend container and re-run the script — this opens the **Apply Spine** dialog.

> On a **Blend on Path**, the path itself acts as the spine, so this option is disabled.

---

### Action Buttons

#### 👁 Preview
Generates a live preview of the blend on the canvas without committing it. You can change settings and hit Preview again to refresh. The preview is undone automatically if you close the dialog or click Preview before Apply.

The status bar below the buttons shows the current step count and any active options.

#### ✓ Apply
Commits the blend to the document, removes the original shapes from the layer panel, and closes the dialog. If a path was selected as the 3rd object, it is hidden (but not deleted) and renamed to `Path Spine: Blend on Path: …`.

---

## Blend on Path

Select **two shapes and one path** before running the script to distribute blend steps along the path.

- The path becomes the spine — steps are placed at arc-length-equal intervals along it.
- The script auto-detects which shape is closer to the path's start point and sets it as Sh 1.
- The path is hidden after applying (it still exists in the layers panel, renamed to `Path Spine: …`).
- The **Create Editable Spine** option is unavailable in this mode since the path already acts as the spine.

---

## The Apply Spine Dialog

If you previously created a blend with **Create Editable Spine** enabled, you can edit the spine line and then reposition all blend steps to follow it.

**To use it:** select the blend container (the group labelled `Blend: …`) and re-run the script.

The dialog shows:

- **Container** — The name of the blend.
- **Current steps** — How many intermediate steps exist in the blend.
- **New steps** — Enter a new step count if you want to change it (only available if Sh 1 and Sh 2 are still present as vector nodes).

### Buttons

#### ↺ Apply Spine
Repositions all existing steps (and Sh 1 / Sh 2) to follow the current position of the spine line. The shapes themselves are not re-blended — only their positions change.

#### ↻ Re-step + Apply
Deletes all existing intermediate steps, generates a fresh set with the new step count you entered, and then applies the spine positions. Use this to change the number of steps in an existing blend without recreating it from scratch.

---

## What Gets Created

After applying, the script produces a **container group** in your layers panel containing:

| Node name | What it is |
|-----------|------------|
| `Sh 1` | Your original Shape A (or a copy at the path start) |
| `Step 1`, `Step 2`, … | Intermediate blended shapes |
| `Sh 2` | Your original Shape B (or a copy at the path end) |
| `Spine: …` | The editable spine line (purple, only if requested) |

For **group blends**, each step is itself a sub-container holding individual `Glyph 1`, `Glyph 2`, … nodes corresponding to the child shapes in your original groups.

---

## Tips

- **Closed paths blend better** when *Align Start Points* is on — the script automatically rotates anchor order on Shape B to minimise crossing.
- **Too much twisting?** Try ticking *Reverse Second Path Direction* first, then *Reverse Twist* if needed.
- **For a smooth gradient effect**, use 50+ steps with *Interpolate Fill* on and both shapes the same size.
- **For a repeating pattern**, use 5–20 steps with *Interpolate Fill* off and identical fills on both shapes.
- **The spine is just a regular line** — you can move its endpoints, add curvature with the node tool, or replace it entirely. The blend will reposition to match when you apply the spine.
- **Undo works fully** — every preview and apply is a discrete undo step. If something looks wrong, `Ctrl/Cmd+Z` will cleanly reverse it.

---

## Error Messages

| Message | Cause |
|---------|-------|
| *Both targets must be the same type* | One shape is a vector and the other is a group |
| *3rd object (path) must be a vector node* | The path you selected for Blend on Path is a group or non-vector |
| *No spine found* | You selected a blend container but it has no spine (was created without *Create Editable Spine*) |
| *Could not find Sh 1 / Steps / Sh 2* | The container doesn't have the expected structure — may have been manually edited |
| *Select 2 objects to blend…* | Fewer than 2 or more than 3 objects selected |




# Blend Tool v16.6.3 vs Adobe Illustrator — A Comparison Guide

The Blend Tool v16.6.3 is a script for **Affinity Designer** by S1m0np1. Adobe Illustrator has its own built-in Blend Tool. Both create intermediate steps between two shapes, but the feature sets diverge significantly. This guide covers every area where v16.6.3 offers something Illustrator does not.

---

## 1. Twist

**Illustrator:** No twist option. If you want shapes to rotate across a blend, you have to manually rotate each intermediate step after expanding the blend — a tedious process that is also destructive.

**Blend Tool v16.6.3:** A dedicated **Twist (°)** control rotates each step progressively from Shape A to Shape B. The full rotation range is −3600° to +3600°, allowing multiple full spins. A **Reverse Twist** checkbox flips the rotation direction without reconfiguring anything else.

---

## 2. Easing

**Illustrator:** Step distribution is always linear — *Specified Steps* places shapes at equal intervals, and *Specified Distance* uses a fixed gap. There is no way to weight steps toward one end of the blend.

**Blend Tool v16.6.3:** A dedicated **Spacing** section offers four easing modes:

| Mode | Effect |
|------|--------|
| Linear | Equal spacing (matches Illustrator behaviour) |
| Ease In | Steps cluster near Shape A, spread toward Shape B |
| Ease Out | Steps spread from Shape A, cluster near Shape B |
| Ease In+Out | Steps cluster at both ends, spread in the middle |

An **Easing Factor** slider (0.1–10) controls how aggressively the easing is applied. This makes it possible to create organic, naturally-spaced sequences that would require manual repositioning of every step in Illustrator.

---

## 3. Per-Endpoint Scale

**Illustrator:** Scaling either shape before blending changes that shape permanently. There is no way to define a scale for each endpoint as part of the blend itself.

**Blend Tool v16.6.3:** Both Shape A and Shape B have a **Scale Shape (%)** control. Setting them to different values causes the blend to smoothly grow or shrink across its steps — independently of the actual document size of either shape. The original shapes remain untouched.

---

## 4. Scale Blend Center (Bulge/Pinch Effect)

**Illustrator:** Has no equivalent. To create a blend that swells in the middle, you would need to add a third shape manually at the midpoint, turning a simple two-object blend into a more complex multi-stop setup.

**Blend Tool v16.6.3:** The **Scale Blend Center** section adds a bulge or pinch effect at the midpoint of the blend without requiring an extra shape:

- **Scale (%)** — How much to enlarge or shrink steps at the centre of the blend.
- **Softness (%)** — How broadly the scaling effect spreads across the blend. Low softness creates a sharp peak; high softness creates a gentle arc.

This is a unique feature with no parallel in Illustrator.

---

## 5. Automatic Anchor Point Matching

**Illustrator:** When blending two closed paths with different anchor counts or rotational starting positions, Illustrator can produce unintended twisting or crossing. The only fix is to manually reorder anchor points using the Direct Selection tool before blending.

**Blend Tool v16.6.3:** The **Align Start Points** option automatically analyses the angular distribution of anchors on both shapes and rotates Shape B's anchor order to best match Shape A — minimising unwanted morphing artefacts. It also tries both the forward and reversed winding directions to find the best fit.

---

## 6. Reverse Path Direction

**Illustrator:** Reversing path direction requires exiting the blend, selecting a shape, using *Object > Path > Reverse Path Direction*, then remaking the blend.

**Blend Tool v16.6.3:** A single **Reverse Second Path Direction** checkbox in the dialog handles this without touching the original shapes. It can be combined with **Align Start Points** and **Flip Shapes** to resolve most morphing direction issues without leaving the dialog.

---

## 7. Colour Interpolation Control

**Illustrator:** Fill and stroke are always interpolated. You cannot disable this — if you want all steps to share Shape A's colour, you must set both shapes to the same colour before blending.

**Blend Tool v16.6.3:** Two independent toggles — **Interpolate Fill** and **Interpolate Stroke** — let you choose exactly what gets blended:

- Turn both off to get a repeating pattern where all steps look identical to Shape A.
- Turn off stroke interpolation only to keep a consistent outline while the fill transitions.
- Turn off fill interpolation only to let stroke weight and colour change while the fill stays fixed.

---

## 8. Per-Endpoint Fill and Stroke Overrides

**Illustrator:** The blend reads colours directly from the shapes. To change a blend's colours, you must edit the actual shapes.

**Blend Tool v16.6.3:** Each shape has its own **Fill**, **Stroke Colour**, and **Stroke Width** controls directly in the dialog. You can override how each endpoint looks without modifying the original shapes — useful when you want to explore different colour combinations non-destructively during the preview stage.

---

## 9. Non-Destructive Live Preview

**Illustrator:** The blend is created immediately when you apply it. To try different step counts or options, you must undo, change settings, and reapply.

**Blend Tool v16.6.3:** A **Preview** button generates a live on-canvas preview. You can update settings and refresh the preview as many times as you like. The preview is automatically undone if you close the dialog without committing — nothing is left in the document until you click **Apply**.

---

## 10. Editable Spine with Non-Destructive Re-Stepping

**Illustrator:** The spine can be replaced with a custom path via *Object > Blend > Replace Spine*, but this is a one-time operation. If you want to change the step count of a spine-following blend, you must undo and recreate the entire thing.

**Blend Tool v16.6.3:** When **Create Editable Spine** is enabled, a purple guide line is added to the blend container. You can reshape this line freely at any time using Affinity's node tools. To reapply:

1. Select the blend container.
2. Re-run the script.
3. Choose **Apply Spine** (repositions existing steps) or **Re-step + Apply** (generates a new step count, then applies the spine).

This means you can change both the path *and* the number of steps as many times as you like after the blend has been committed.

---

## 11. Blend on Path in a Single Operation

**Illustrator:** Blend on Path is a two-step process — create the blend, then separately replace its spine using *Object > Blend > Replace Spine*. The original shapes remain in the document and must be managed manually.

**Blend Tool v16.6.3:** Select two shapes and a path simultaneously, then run the script. The blend is placed along the path in a single operation. The path is automatically hidden and renamed to `Path Spine: …` so it stays accessible but doesn't clutter the canvas. The script also auto-detects which shape is closer to the start of the path and sets it as the first endpoint — removing the guesswork.

---

## 12. Group Blending

**Illustrator:** Can blend two groups, but treats each group as a single object — the sub-shapes inside are not blended individually. Complex multi-part shapes (e.g. a letter made of two curves) cannot be morphed glyph-by-glyph.

**Blend Tool v16.6.3:** When both selections are groups, the script extracts each child shape individually and blends them in matched pairs. Each intermediate step is itself a sub-container of interpolated glyphs, meaning multi-part shapes morph correctly part-by-part. Fill and stroke are interpolated per glyph.

---

## 13. Stacking Order Control

**Illustrator:** The stacking order within a blend is determined by the layer order of the original shapes. To change it you must reorder layers before blending.

**Blend Tool v16.6.3:** A **Stacking Order** control in the dialog lets you choose whether Shape B or Shape A sits on top of the layer stack inside the blend container — without touching the original layer order.

---

## Summary Table

| Feature | Illustrator | Blend Tool v16.6.3 |
|---------|------------|---------------------|
| Twist across steps | ✗ | ✓ |
| Easing (ease in/out) | ✗ | ✓ |
| Per-endpoint scale | ✗ | ✓ |
| Scale blend center / bulge | ✗ | ✓ |
| Auto anchor matching | ✗ | ✓ |
| Reverse path direction (in dialog) | ✗ | ✓ |
| Toggle fill interpolation | ✗ | ✓ |
| Toggle stroke interpolation | ✗ | ✓ |
| Per-endpoint fill/stroke override | ✗ | ✓ |
| Live non-destructive preview | ✗ | ✓ |
| Editable spine with re-stepping | ✗ | ✓ |
| Blend on Path in one step | ✗ | ✓ |
| Group blending (glyph-by-glyph) | ✗ | ✓ |
| Stacking order control | ✗ | ✓ |
| Smooth colour mode | ✓ | ✓ (always on) |
| Specified steps | ✓ | ✓ |
| Specified distance | ✓ | ✗ |
| Expand blend | ✓ | ✗ (use Affinity's tools) |
| Release blend | ✓ | ✗ (use Undo) |

---

## When Illustrator Still Has an Edge

Illustrator's Blend Tool is built into the application and has a few conveniences the script does not replicate:

- **Specified Distance** — placing steps at a fixed physical distance apart, rather than by count.
- **Expand** — converting a live blend into individual editable objects while keeping them on the canvas.
- **Release** — returning a blend to its original two objects after the fact.

For the majority of creative blending tasks, however — especially anything involving animation-style morphing, path-following, scaling effects, or large step counts — v16.6.3 offers more control and a more forgiving, non-destructive workflow.




# The Blend Tool — A Complete Guide

The Blend Tool is one of the most powerful features in vector design software like **Adobe Illustrator**. It lets you create smooth transitions between two or more objects — blending their shapes, colours, sizes, and positions automatically.

---

## What Is the Blend Tool?

At its core, the Blend Tool generates a series of intermediate steps between two (or more) objects. Think of it like this:

> You have a small red circle on the left and a large blue square on the right. The Blend Tool fills the space between them with a smooth progression — gradually changing size, shape, and colour from one object to the other.

This makes it incredibly useful for:

- Creating smooth colour gradients with shapes
- Generating repeating patterns along a path
- Building complex illustrations with depth and shading
- Producing morphing effects between different shapes

---

## Finding the Blend Tool

In **Adobe Illustrator**, you can access the Blend Tool in a few ways:

- **Toolbox:** Press `W` on your keyboard
- **Menu:** Go to `Object > Blend > Make`
- **Shortcut to open options:** Double-click the Blend Tool icon in the toolbox

---

## How to Create a Basic Blend

### Step 1 — Create Two Objects
Draw or place at least two objects on your artboard. They can be any shape, and ideally give them different colours.

### Step 2 — Select Both Objects
Use the Selection Tool (`V`) to select both objects at the same time (hold `Shift` and click each one, or drag a selection box around them).

### Step 3 — Apply the Blend
Go to **Object > Blend > Make** (or press `Alt + Ctrl + B` on Windows / `Option + Cmd + B` on Mac).

Illustrator will instantly create a blend between the two objects.

### Step 4 — Click with the Blend Tool (Alternative Method)
Select the Blend Tool (`W`), then **click directly on the first object**, then **click on the second object**. This gives you more control over where the blend anchors.

---

## Blend Options — The Key Settings

Double-click the Blend Tool icon to open **Blend Options**. This is where the magic happens.

### 1. Smooth Color
Illustrator automatically calculates how many steps are needed to create a perfectly smooth colour transition. Best used when blending between two different colours.

### 2. Specified Steps
You manually choose how many intermediate objects are created between your two originals.

- **Low number (e.g. 3–5):** Creates a visible, distinct series of objects — great for repeating patterns.
- **High number (e.g. 50–100):** Creates a very smooth, almost gradient-like result.

### 3. Specified Distance
Instead of steps, you define the distance (in your document's units) between each intermediate object. Useful when you need evenly spaced repeating elements.

---

## The Blend Spine

When a blend is created, Illustrator draws a straight line between your objects called the **spine**. This is the path that the blended objects follow.

### Editing the Spine
You can replace the straight spine with any custom path:

1. Draw a new path (e.g. a curve or wave).
2. Select both the blend and the new path.
3. Go to **Object > Blend > Replace Spine**.

The blended objects will now flow along your custom curve — perfect for creating waves, arcs, or spirals of shapes.

### Reversing the Spine
Go to **Object > Blend > Reverse Spine** to flip the direction of the blend along its path.

### Reversing the Stack Order
Go to **Object > Blend > Reverse Front to Back** to flip which object sits on top in the z-order.

---

## Editing a Blend

A blend is a **live, editable group**. You can change it at any time without starting over.

### Edit the Original Objects
Double-click the blend to enter **Isolation Mode**, then click on either of the original objects to edit them. Change the colour, size, shape, or position — the blend updates automatically.

### Add More Objects to the Blend
You can blend more than two objects. Just click each one in sequence with the Blend Tool to create a multi-stop blend.

### Expand the Blend
To convert the blend into individual, fully editable objects:

Go to **Object > Blend > Expand**

> ⚠️ This action is permanent. Once expanded, the blend is no longer live and won't update automatically.

### Release the Blend
To remove the blend effect and return to your original objects:

Go to **Object > Blend > Release** (or `Alt + Shift + Ctrl + B` / `Option + Shift + Cmd + B`)

---

## Practical Examples

### Smooth Colour Transition
- Draw two rectangles side by side: one yellow, one purple.
- Set Blend Options to **Smooth Color**.
- Apply the blend — you get a smooth gradient-like transition without using a gradient fill.

### Repeating Object Pattern
- Draw a small star at the start of a curved path and a large star at the end.
- Set Blend Options to **Specified Steps: 8**.
- Replace the spine with your curve — now you have 10 evenly spaced, gradually scaling stars along the curve.

### 3D Shading Effect
- Draw two versions of the same shape: one lighter, one darker, slightly offset.
- Blend with **Smooth Color** — the result mimics a soft shadow or highlight, giving the illusion of depth.

---

## Tips and Tricks

| Tip | Details |
|-----|---------|
| **Use simple shapes first** | Complex paths can produce unexpected results when blending. Start simple. |
| **Match anchor points** | When blending two different shapes, try to match the number of anchor points on each for a cleaner morph. |
| **Combine with transparency** | Blend between an opaque and a transparent version of the same object for a smooth fade effect. |
| **Use with gradients** | Objects with gradient fills can also be blended, creating very rich colour transitions. |
| **Group before blending** | If your objects are made of multiple parts, group them first so the blend treats each as a single unit. |

---

## Common Problems and Fixes

**The blend looks twisted or crossed**
→ The anchor points on your objects are in the wrong order. Try clicking a specific anchor point on each object when using the Blend Tool (instead of clicking the centre).

**The blend isn't smooth**
→ Check your Blend Options — make sure you're using Smooth Color or have enough Specified Steps.

**The spine won't follow my path**
→ Make sure both the blend object and your new path are selected before going to Object > Blend > Replace Spine.

**Expanding creates too many objects**
→ That's expected with high step counts. Reduce steps in Blend Options before expanding if you need to manage the file.

---

## Quick Reference

| Action | Shortcut (Mac) | Shortcut (Windows) |
|--------|---------------|--------------------|
| Activate Blend Tool | `W` | `W` |
| Make Blend | `Cmd + Option + B` | `Ctrl + Alt + B` |
| Release Blend | `Cmd + Option + Shift + B` | `Ctrl + Alt + Shift + B` |
| Open Blend Options | Double-click tool icon | Double-click tool icon |

---

## Summary

The Blend Tool is all about **smooth transitions** — between colours, shapes, sizes, and positions. Once you understand the three spacing options (Smooth Color, Specified Steps, Specified Distance) and how the spine works, you unlock a huge range of creative possibilities. Start with simple two-object blends, experiment with the spine, and work your way up to more complex multi-stop blends and 3D shading effects.


<img width="2581" height="3589" alt="strange fruit" src="https://github.com/user-attachments/assets/1dd46555-8757-4c01-b74e-4da6b857ac27" />

<img width="2481" height="3508" alt="twist blend" src="https://github.com/user-attachments/assets/47986cba-c46c-47fb-b88b-804c562e8c75" />



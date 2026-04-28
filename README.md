# Meal Planner — Interactive Prototype

Single-file prototype (`index.html`). Open directly in any browser — no server needed.

---

## How to open

Double-click `index.html`, or drag it into Chrome/Safari/Firefox.  
For the best experience use Chrome or Safari on desktop; works on actual iPhone too (open via local network or AirDrop to phone).

---

## ✅ Wired interactions

### Navigation
| Interaction | What happens |
|---|---|
| Bottom nav tabs (Planner / Library / Shop) | Switches active screen with a 180ms fade |
| Back arrow `‹` on Recipe Detail | Returns to previous tab |
| Close `✕` on Add Recipe | Dismisses sheet |

### Planner screen
| Interaction | What happens |
|---|---|
| Tap an empty slot `+` | Opens recipe picker bottom sheet for that meal type |
| Tap a recipe in the picker | Fills the slot, closes the sheet |
| Tap a filled slot | Opens Recipe Detail for that recipe |
| Tap `✕` on a filled slot | Removes the recipe from that slot |
| "Generate shopping list" button | Navigates to Shop tab (active only when ≥ 1 slot filled) |
| Week progress bar | Updates live as slots are filled/cleared |
| Quick-add row | Horizontally scrollable; tap any card to open its detail |
| "See all →" in quick-add | Navigates to Library tab |

### Recipe Library screen
| Interaction | What happens |
|---|---|
| Tap any recipe card | Opens Recipe Detail full-screen sheet |
| Filter chips | Toggle active state visually; filters the grid by tag |
| "All" chip | Clears all tag filters |
| Search bar | Focusable / accepts input (search logic is stubbed — see below) |
| `+` FAB | Opens Add Recipe sheet |

### Add Recipe screen
| Interaction | What happens |
|---|---|
| Paste URL / Manual / From photo tabs | Switches capture mode |
| Manual form | Fully scrollable; all fields accept real input |
| "Add ingredient" button | Appends a new Qty / Unit / Ingredient row |
| `−` on an ingredient row | Removes that row |
| "Save recipe" button | Validates title is filled, saves to library, closes sheet, shows toast |
| Close `✕` | Dismisses without saving |

### Recipe Detail screen
| Interaction | What happens |
|---|---|
| Full scroll | Hero → metadata → tags → ingredients → method all scroll |
| "Add to plan" button | Opens slot picker modal listing all 7 days × 3 meal slots |
| Tap an available slot in picker | Assigns the recipe, closes modal and detail, shows toast |
| Taken slots in picker | Shown greyed out with occupying recipe name; not tappable |
| Back arrow `‹` | Returns to Library or Planner depending on entry point |

### Shopping list screen
| Interaction | What happens |
|---|---|
| Tap a checkbox | Marks item checked (strikethrough + dimmed) |
| Checked items | Move to a "Done" section at the bottom after 280ms delay |
| Tap a checked item | Unchecks it and moves it back to its category |
| Progress bar | Updates live as items are checked/unchecked |
| "Add item manually" | Appends an editable text row; saves on blur or Enter |
| "Share list" `↑` | Copies unchecked items (grouped by aisle) to clipboard as plain text |

### Persistence
All state (slot fills, checked items, saved recipes) is written to `localStorage` under the keys `mp_planner`, `mp_checked`, `mp_recipes`, `mp_shop`. Survives page refresh.  
To reset to defaults: open DevTools → Application → Local Storage → delete the four `mp_*` keys, then refresh.

---

## 🔲 Stubbed (not wired)

| Feature | Notes |
|---|---|
| **Search / filter logic** | Search bar is focusable but doesn't filter results. Filter chips toggle visual state and do filter the grid by tag — but cross-tag AND logic isn't implemented (currently OR). |
| **Week navigation arrows** | `‹` / `›` arrows on Planner are decorative; all days are hardcoded to 28 Apr–4 May. |
| **URL import** | Tapping "Import recipe" in Paste URL mode shows a toast saying it's a stub. |
| **From photo / camera** | Camera access not wired; placeholder UI only. |
| **Recipe photo / image upload** | All image slots are grey rectangles. |
| **Sort button** | "Sort ↕" on Library is decorative. |
| **Overflow menu `···`** | On Recipe Detail, the `···` button is not wired (would expose Edit, Duplicate, Delete). |
| **Swipe to delete** | Shopping list items can be removed by unchecking then a manual delete; swipe gesture not wired. |
| **Serves scaler** | Tapping the "Serves" cell in Recipe Detail doesn't scale ingredient quantities. |
| **Shopping list auto-regenerate** | The list is pre-seeded from the default plan. If you add/remove planner meals after loading, the list doesn't automatically update. Tap "Generate shopping list" from Planner to navigate to Shop — but re-generation logic isn't wired. |
| **Toast on "From photo"** | No feedback on camera activation attempt. |

---

## Prototype data

Five pre-loaded recipes with full ingredients and method:
- Chicken stir fry · Shakshuka · Lemon pasta · Beef tacos · Roasted salmon

Pre-filled planner slots (Mon–Sun):
- Mon: Shakshuka (B), Chicken stir fry (D)
- Tue: Lemon pasta (L), Beef tacos (D)
- Wed: Shakshuka (D)
- Thu: Beef tacos (L)
- Fri: Roasted salmon (D)
- Sun: Lemon pasta (L)

Shopping list pre-seeded with 21 items across Produce, Meat & Fish, Dairy & Eggs, Pantry.

---

## File structure

```
Meal Planner/
├── index.html       ← entire prototype (HTML + CSS + JS, ~700 lines)
├── wireframes.html  ← original static lo-fi wireframes
└── README.md        ← this file
```

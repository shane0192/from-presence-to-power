# Photo slots

Drop a JPG with the exact filename below into this folder and it appears on the
site immediately — no code change, no build step. Until a file exists, that slot
renders as a labelled chalk panel instead of a broken image, so the pages stay
presentable while photography is being collected.

All of these can come straight from the existing firstandsouth.com photo library.

| File | Page | Crop | What it should show |
|---|---|---|---|
| `hero-corner.jpg` | index (hero) | 16:9, wide — needs to work at 2400px | The Victorian on the corner, ideally at dusk with the lights on. Leave headroom at the bottom: the name and buttons sit over the lower third. |
| `dining-room.jpg` | index (story) | 3:4 portrait | Interior of the dining room, chalkboard mural visible. |
| `dish-burger.jpg` | index (signatures) | 1:1 square | House ground burger with First Fries. |
| `dish-fries.jpg` | index (signatures) | 1:1 square | First Fries on their own. |
| `dish-chowder.jpg` | index (signatures) | 1:1 square | South Street Chowder. |
| `dish-pupusas.jpg` | index (signatures) | 1:1 square | Pupusas / Tuesday tacos. |
| `kitchen-produce.jpg` | index (sourcing) | 4:3 landscape | Local produce, a delivery crate, or the kitchen pass. |
| `room-bar.jpg` | index (gallery) | 3:4 portrait | The bar. This is the tall one in the gallery grid. |
| `room-porch.jpg` | index (gallery) | 1:1 square | Outdoor seating / the porch in season. |
| `room-table.jpg` | index (gallery) | 1:1 square | A table mid-service. |
| `room-chalkboard.jpg` | index (gallery) | 1:1 square | The hand-drawn specials board. |
| `room-music.jpg` | index (gallery) | 1:1 square | Live music night. |
| `exterior-street.jpg` | visit | 4:3 landscape | The building from across the street, daylight. |
| `table-window.jpg` | visit (reserve) | 4:3 landscape | A set table by the window. |

## Sizing

Everything is `object-fit: cover`, so exact pixel dimensions do not matter — only
the rough aspect ratio, so the important part of the frame is not cropped out.

Suggested export widths:

- `hero-corner.jpg` — 2400px wide, quality 78
- everything else — 1200px on the long edge, quality 80

If you would rather serve WebP, change the extension in the three HTML files and
in this table; nothing else depends on the format.

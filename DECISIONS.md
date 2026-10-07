Package manager: pnpm is the optimal package manager

NX - wanted to learn monorepo and nx better, also wanted to add a backend and react native later

Removed react router - removed; with tanstack router because it has typed routes and search params, loaders that work with Query

Vite and react - a wallet is a client-side app that needs no server rendering, so Vite rather than Next.js.

DEVnet only to protect real funds

Assets table cells - a mix: symbol, name and amount come from a `keyof Holding` list, so the columns and their order live in one place and a wrong field name fails typecheck; the value cell is hand-written because value (amount × priceUsd) is computed, not a field of Holding. Rejected: writing all four cells by hand (simplest, but changing or reordering columns means editing JSX instead of one list); a column config with a render function per column (would make value just another column, but is more machinery than four columns need); adding value to Holding so keyof covers it (stores a derived number that goes stale when amount or price changes).

Both sorting and select needs a new state as i added them

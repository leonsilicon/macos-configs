# Leon's macOS configs

## Setup

```shell
cd ~
git init
git remote add origin https://github.com/leondreamed/macos-configs
git pull origin main
```

## Keymappings

My Karabiner-Elements keymaps are auto-generated using a tool called [GokuRakuJoudo](https://github.com/yqrashawn/GokuRakuJoudo) and can be found at [`.config/goku/karabiner.edn`](./.config/goku/karabiner.edn).

## Shortcuts/Keybinds

### System-wide utilities

Shortcuts for system-wide utilities such as controlling Yabai (the window manager) or opening certain applications use the following combination of modifier keys (referred to as "Super"): `⌘⌥^` (and optionally `⇧`)

> We don't use the `Fn` key because it's not detectable when setting shortcuts in certain applications.

#### Yabai

Karabiner is used for the keybinds which can be found at [`.config/goku/karabiner.edn`](./.config/goku/karabiner.edn)

> The general rule for using "Shift" is either if a command is a complementary one (e.g. increasing height instead of width) or if it modifies some sort of state (e.g. moving windows)

`<Super+J>`: Focus window down\
`<Super+Shift+J>`: Move window down\
`<Super+K>`: Focus window up\
`<Super+Shift+K>`: Move window up\
`<Super+L>`: Narrow/expand window to left\
`<Super+Shift+L>`: Increase window height\
`<Super+H>`: Narrow/expand window to right\
`<Super+Shift+H>`: Decrease window height\
`<Super+M>`: Focus master window\
`<Super+K>`: Focus master window\
`<Super+Shift+M>`: Move window to master\
`<Super+Shift+I>`: Increase number of master windows\
`<Super+Shift+D>`: Decrease number of master windows\
`<Super+,>`: Focus previous display\
`<Super+Shift+,>`: Move window to previous display\
`<Super+.>`: Focus next display\
`<Super+Shift+.>`: Focus window to next display\
`<Super+Shift+Q>`: Close focused window

#### Apps

`<Super+R>`: Opens Raycast\
`<Super+S>`: Opens CleanShot X (capture mode)\
`<Super+C>`: Opens CleanShot X (all-in-one mode)\
`<Super+T>`: Opens Shortcat\
`<Super+Enter>`: Opens Warp\
`<Super+Q>`: Opens Qutebrowser\
`<Super+P>`: Opens 1Password (quick access mode)\
`<Super+E>`: Opens Toggl Track (`E` for "time **e**ntry")\
`<Super+A>`: Opens Todoist (`A` for "**a**dd todo)\
`<Super+N>`: Show Notion Calendar

### VSCode

My VSCode shortcuts generally adhere to the following principles:

`⌥` - Used for "navigation" actions (e.g. changing views, go to definition, switching between editors, etc.)
`⌘` - Used for "non-navigation" actions (usually modifies state, but also includes actions like search/find)
`⌘⇧` - Used for complementary "non-navigation" actions, e.g. opposites (`⌘Z` = Undo, `⌘⇧Z` = Redo), or scope changes (`⌘F` = Find in current file, `⌘⇧F` = Find in all files)\
`^` - Not used for any VSCode shortcuts - reserved for the Vim extension\
`^⌥` - Used for setting/toggling options



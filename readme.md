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

## Shortcuts

### System-wide utilities

Shortcuts for system-wide utilities such as controlling Yabai (the window manager) or opening certain applications use the following combination of modifier keys: `⌘⌥^` (and optionally `⇧`)

> We don't use the `Fn` key because it's not detectable when setting shortcuts in certain applications.

### VSCode

My VSCode shortcuts generally adhere to the following principles:

`⌘` - Used for "write" actions - actions that modify some sort of state\
`⌘⇧` - Used for complementary "write" actions, e.g. opposites (`⌘Z` = Undo, `⌘⇧Z` = Redo), or scope changes (`⌘F` = Find in current file, `⌘⇧F` = Find in all files)\
`⌥` - Used for "read" actions - actions that don't modify state (e.g. changing views, navigation, etc.)\
`^` - Not used for any VSCode shortcuts - reserved for the Vim extension\
`^⇧` - TODO


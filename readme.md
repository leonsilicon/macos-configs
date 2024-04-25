# Leon's macOS configs

## Setup

### Cloning the repo

```shell
cd ~
git init
git remote add origin https://github.com/leonsilicon/macos-configs
git pull origin main
```

## Keymappings

My Karabiner-Elements keymaps, which can be found at [`.config/goku/karabiner.edn`](./.config/goku/karabiner.edn), is defined using [GokuRakuJoudo](https://github.com/yqrashawn/GokuRakuJoudo) which uses it to generate a `karabiner.json` file.

## Shortcuts/Keybinds

### System-wide

Shortcuts for system-wide utilities such as controlling Yabai (the window manager) or opening certain applications use the following combination of modifier keys (referred to as "Super"): `⌘⌥^` (and optionally `⇧`)

> We don't use the `Fn` key because it's not detectable when setting shortcuts in certain applications.

#### Yabai

Karabiner is used for the keybinds which can be found at [`.config/goku/karabiner.edn`](./.config/goku/karabiner.edn)

> The general rule for using "Shift" is if a command is a complementary one (e.g. increasing height instead of width)

`<Super+J>` Focus window down\
`<Super+Shift+J>` Move window down\
`<Super+K>` Focus window up\
`<Super+Shift+K>` Move window up\
`<Super+L>` Narrow/expand window to left\
`<Super+Shift+L>` Increase window height\
`<Super+H>` Narrow/expand window to right\
`<Super+Shift+H>` Decrease window height\
`<Super+M>` Focus **m**aster window\
`<Super+Shift+M>` _Move_ window to **m**aster\
`<Super+I>` **I**ncrease number of master windows\
`<Super+D>` **D**ecrease number of master windows\
`<Super+,>` Focus previous display\
`<Super+Shift+,>` Move window to previous display\
`<Super+.>` Focus next display\
`<Super+Shift+.>` Focus window to next display\
`<Super+Z>` Minimi**z**e focused window
`<Super+Q>` **Q**uit focused window

#### Apps

`<Super+A>` Opens Todoist (quick **a**dd mode)\
`<Super+B>` Opens Qute**b**rowser\
`<Super+Shift+B>` Show/Hide hidden menu bar items in Bartender\
`<Super+C>` Opens Clean**S**hot X (all-in-one mode)\
`<Super+E>` Toggles K**e**yCastr\
`<Super+G>` Play/Pause Lofi **G**arden\
`<Super+Shift+G>` Toggle Lun**g**o\
`<Super+N>` Show **N**otion Calendar\
`<Super+Shift+N>` Join upcoming meeting in **N**otion Calendar\
`<Super+P>` Opens 1**P**assword (quick access mode)\
`<Super+Shift+P>` Opens ColorSnapper Color **P**icker (ColorSlurp causes focused window to lose focus, Sip has bug with shortcuts that use the Command key)\
`<Super+R>` Opens Sho**r**tcat\
`<Super+S>` **S**creenshot w/ CleanShot X ("Capture Area")\
`<Super+Shift+S>` **S**creenshot to clipboard w/ CleanShot X ("Capture Area & Copy to Clipboard")\
`<Super+T>` Opens **T**oggl Track\
`<Super+Shift+T>` Start/Stop Timer in **T**oggl Track\
`<Super+U>` Toggle [N**u**mi](https://numi.app)\
`<Super+Shift+U>` Show/Hide **u**Bar\
`<Super+V>` Toggle [**P**aste](https://pasteapp.io/)\
`<Super+Shift+V>` Show webcam **v**ideo preview with Hand Mirror\
`<Super+W>` Opens **W**arp\
`<Super+Shift+W>` Opens **W**arp in a new window\
`<Super+X>` Toggle [PixelSnap](https://getpixelsnap.com)\
`<Super+Space>` Opens Raycast\
`<Super+Enter>` Open/Hide Side**N**otes \
`<Super+Shift+Enter>` Create new note in Side**N**otes\
`<Super+)>` Increase brightness (using [Lunar](https://lunar.fyi))\
`<Super+(>` Decrease brightness (using [Lunar](https://lunar.fyi))

#### System

`<Super+;>` Lock Screen (since `,` and `.` represent moving between displays, it seems fitting that the key `;` to the left of `,` should mean "lock screen")
`<Super+[>` Vol**u**me Down
`<Super+]>` Vol**u**me Up
`<Super+0>` Volume Mute

#### Input navigation

`<Option+Left>` Go to end of word\
`<Option+Shift+Left>` Select to end of word\
`<Option+Right>` Go to start of word\
`<Option+Shift+Right>` Select to start of word\
`<Command+Left>` Go to start of line\
`<Command+Shift+Left>` Select to start of line\
`<Command+Right>` Go to end of line\
`<Command+Shift+Right>` Select to end of line\
`<Command+Up>` Go to start of input\
`<Command+Shift+Up>` Select to start of input\
`<Command+Down>` Go to end of input\
`<Command+Shift+Down>` Select to end of input\

### VSCode

My VSCode shortcuts generally adhere to the following principles:

`⌥` - Used for "navigation" actions (e.g. changing views, go to definition, switching between editors, etc.)\
`⌘` - Used for "non-navigation" actions (usually modifies state, but also includes actions like search/find)\
`⌘⇧` - Used for complementary "non-navigation" actions, e.g. opposites (`⌘Z` = Undo, `⌘⇧Z` = Redo), or scope changes (`⌘F` = Find in current file, `⌘⇧F` = Find in all files)\
`^` - Not used for any VSCode shortcuts - reserved for the Vim extension\
`^⌥` - Used for shortcuts that set/toggle some sort of option

#### Common shortcuts

##### Option+KEY

`<Option+A>` Reveal Active File in Explorer View\
`<Option+C>` Go to declaration\
`<Option+D>` Go to definition\
`<Option+F>` Go to file\
`<Option+G>` A chord keybind to represent "global"-ness\
`<Option+HJKL>` Navigate between views\
`<Option+I>` Go to implementations\
`<Option+M>` Go to next merge conflict\
`<Option+Shift+M>` Go to previous merge conflict\
`<Option+P>` Go to next problem\
`<Option+Shift+P>` Go to previous problem\
`<Option+R>` Go to references

##### Command+Key

`<Command+A>` Select all\
`<Command+C>` Copy\
`<Command+E>` ESLint Fix auto-fixable problems\
`<Command+F>` Find in file\
`<Command+Shift+F>` Search in project\
`<Command+M B>` Merge conflict: Accept both\
`<Command+M C>` Merge conflict: Accept current\
`<Command+M I>` Merge conflict: Accept incoming


# Yabai Master-Stack Plugin

![A screenshot of the Master-Stack plugin in action](/images/yabai-master-stack-plugin-screenshot.png)

[Yabai](https://github.com/koekeishiya/yabai) is an amazing tiling manager for macOS. However, since the algorithm Yabai uses is based on bsp (binary-space partitioning), implementing layouts such as the master-stack layout in [dwm](https://dwm.suckless.org/) is [not within their goals for the project](https://github.com/koekeishiya/yabai/issues/658#issuecomment-693687832). Luckily, Yabai provides an incredibly powerful signal system that can execute commands in response to an event in Yabai (e.g. when a window is created, deleted, etc.). This plugin leverages this powerful system to emulate the dwm-style master-stack layout in Yabai.

To "install" this plugin, make sure you have [Node](https://nodejs.org/en/) installed, and then clone this Git repository into a folder:

```bash
cd <your_folder> # replace <your_folder> with the folder you're cloning to the repo to
git clone https://github.com/leonzalion/yabai-master-stack-plugin
cd yabai-master-stack-plugin
```

Then, copy the `.env.example` file and name the new file `.env`, placing it in the same folder as the `.env.example` folder. In the new `.env` file, update `YABAI_PATH` to your installation path of yabai (you can get this by running `which yabai`). In addition, if you don't want debugging output, make sure to remove the `DEBUG=1` line.

Once you've added the `.env` file, you can now install the dependencies and build the files.

```bash
npm install
npm build
```

Then, add the following lines to your `.yabairc` (remember to replace &lt;your_folder&gt;with the path you folder you cloned the repo to):

```bash
yabai -m signal --add event=window_created action='node <your_folder>/yabai-master-stack-plugin/dist/handlers/window-created.js'

yabai -m signal --add event=application_launched action='node <your_folder>/yabai-master-stack-plugin/dist/handlers/window-created.js'

yabai -m signal --add event=window_moved action='node <your_folder>/yabai-master-stack-plugin/dist/handlers/window-moved.js'

node <your_folder>/yabai-master-stack-plugin/dist/handlers/on-yabai-start.js
```

Then, to make the actions of focusing on the next/prev window work smoothly, set the keybinds to execute the node scripts in the `fns` folder. For example, if you're using [skhd](https://github.com/koekeishiya/skhd), add the following into your `skhdrc` file:

```text
# focus windows
alt + j : node <your_folder>/yabai-master-stack-plugin/dist/fns/focus-down-window.js
alt + k : node <your_folder>/yabai-master-stack-plugin/dist/fns/focus-up-window.js

# adjust number of master windows
alt + shift - i : node <your_folder>/yabai-master-stack-plugin/dist/fns/increase-master-window-count.js
alt + shift - d : node <your_folder/yabai-master-stack-plugin/dist/fns/decrease-master-window-count.js
```

## Troubleshooting

So there's this super obscure error when binding shell commands to Karabiner where the Node processes will abruptly exit without the onExit callback getting called when registered using the `signal-exit` package (which ends up causing a deadlock since the lockfile doesn't get released). To fix this error, you need to add a `> /dev/null` to the end of the node command in the karabiner `shell_command` property [(see this commit)](https://github.com/leonzalion/macos-configs/commit/a2f2b88c34e0d1cabb49e92fdadf6a284fecee93). I have absolutely no idea why this works, but I discovered it on accident when trying to debug the command by redirecting stdout to a file and then failing to reproduce the issue afterwards.

Maybe I'll add some kind of synchronization mechanism in the future where the plugin will check whether the process which registered the lock is still active, and if it's not active, then it'll delete the lock file or something.

## TODO

[] Add an option to temporary disable auto-positioning of a window.

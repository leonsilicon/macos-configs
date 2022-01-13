export PATH="/Users/leonzalion/code/homebrew/bin:$PATH"

source ~/code/zsh-autocomplete/zsh-autocomplete.plugin.zsh

eval "$(starship init zsh)"
set -o vi

# Loads tmux
if command -v tmux &> /dev/null && [ -n "$PS1" ] && [[ ! "$TERM" =~ screen ]] && [[ ! "$TERM" =~ tmux ]] && [ -z "$TMUX" ]; then
  tmux new-session
fi

export GOKU_EDN_CONFIG_FILE=~/.config/goku/karabiner.edn

eval "$(zoxide init zsh)"

. ~/.zsh_aliases

if [ -f $(brew --prefix)/etc/brew-wrap ];then
  source $(brew --prefix)/etc/brew-wrap
fi


# add brew bash autocompletion
if type brew &>/dev/null
then
  FPATH="$(brew --prefix)/share/zsh/site-functions:${FPATH}"
fi

zstyle ':completion:*' list-prompt ''
zstyle ':completion:*' select-prompt ''

autoload -Uz compinit
compinit -i

export PATH="$(pnpm bin -g):$PATH"
export PATH="/Users/leonzalion/code/bin:$PATH"

export PNPM_HOME="/Users/leonzalion/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

# For Python & Tkinter
# For compilers to find zlib you may need to set:
export LDFLAGS="${LDFLAGS} -L/usr/local/opt/zlib/lib"
export CPPFLAGS="${CPPFLAGS} -I/usr/local/opt/zlib/include"

# For pkg-config to find zlib you may need to set:
export PKG_CONFIG_PATH="${PKG_CONFIG_PATH} /usr/local/opt/zlib/lib/pkgconfig"

export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

export PATH="$HOME/.poetry/bin:$PATH"

source ~/code/git-subrepo/.rc

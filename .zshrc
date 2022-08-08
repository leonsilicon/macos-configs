export ZSH="$HOME/.oh-my-zsh"
plugins=(wakatime zsh-autocomplete zsh-syntax-highlighting)

source $ZSH/oh-my-zsh.sh

export PATH="/Users/leonzalion/code/homebrew/bin:$PATH"

zstyle ':completion:*' list-prompt   ''
zstyle ':completion:*' select-prompt ''

eval "$(starship init zsh)"
set -o vi

# Loads tmux
if command -v tmux &> /dev/null && [ -n "$PS1" ] && [[ ! "$TERM" =~ screen ]] && [[ ! "$TERM" =~ tmux ]] && [ -z "$TMUX" ]; then
  tmux new-session
fi

export GOKU_EDN_CONFIG_FILE=~/.config/goku/karabiner.edn

eval "$(zoxide init zsh)"

. ~/.zsh_aliases

# TODO: fix this (no idea why it's running with Python 3.6)
# if [ -f $(brew --prefix)/etc/brew-wrap ];then
  # source $(brew --prefix)/etc/brew-wrap
# fi


# add brew bash autocompletion
if type brew &>/dev/null
then
  FPATH="$(brew --prefix)/share/zsh/site-functions:${FPATH}"
fi

zstyle ':completion:*' list-prompt ''
zstyle ':completion:*' select-prompt ''

autoload -Uz compinit
compinit -i

export PNPM_HOME="/Users/leonzalion/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

export PATH="$(pnpm bin -g):$PATH"
export PATH="/Users/leonzalion/code/bin:$PATH"


# For Python & Tkinter
# For compilers to find zlib you may need to set:
export LDFLAGS="${LDFLAGS} -L/usr/local/opt/zlib/lib"
export CPPFLAGS="${CPPFLAGS} -I/usr/local/opt/zlib/include"

# For pkg-config to find zlib you may need to set:
export PKG_CONFIG_PATH="${PKG_CONFIG_PATH} /usr/local/opt/zlib/lib/pkgconfig"

export PATH="$HOME/.poetry/bin:$PATH"

RESOLVE_SCRIPT_API="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/"
RESOLVE_SCRIPT_LIB="/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
export PYTHONPATH="$PYTHONPATH:$HOME/.pyenv/versions/3.6.15"
export PATH="$PATH:$HOME/.pyenv/versions/3.6.15/bin"
export PATH="$(pyenv root)/shims:$PATH"
eval "$(pyenv init -)"

export PATH="/Users/leonzalion/perl5/bin${PATH:+:${PATH}}";
export PERL5LIB="/Users/leonzalion/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}";
export PERL_LOCAL_LIB_ROOT="/Users/leonzalion/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}";
export PERL_MB_OPT="--install_base \"/Users/leonzalion/perl5\"";
export PERL_MM_OPT="INSTALL_BASE=/Users/leonzalion/perl5";

zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

export PATH="$PATH:/Users/leonzalion/.local/bin"
export PATH="$PATH:/Users/leonzalion/.cargo/bin"

alias clear="printf '\33c\e[3J'"
export PATH="/usr/local/opt/tcl-tk/bin:$PATH"
export PATH="$PATH:/Users/leonzalion/.mint/bin"
export FLYCTL_INSTALL="/Users/leonzalion/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
export PATH="/Users/leonzalion/bin:$PATH"
export GEM_HOME=$HOME/.gem
export PATH="$PATH:/Users/leonzalion/.gem/bin"

export OPENSSL_ROOT_DIR=/usr/local/Cellar/openssl@1.1/1.1.1q/
export OPENSSL_LIBRARIES=/usr/local/Cellar/openssl@1.1/1.1.1q/lib

export ZSH="$HOME/.oh-my-zsh"
plugins=(wakatime)

source $ZSH/oh-my-zsh.sh

export PATH="/Users/leonzalion/code/homebrew/bin:$PATH"

source ~/code/zsh-autocomplete/zsh-autocomplete.plugin.zsh

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

source ~/code/git-subrepo/.rc

RESOLVE_SCRIPT_API="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/"
RESOLVE_SCRIPT_LIB="/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
export PYTHONPATH="$PYTHONPATH:$HOME/.pyenv/versions/3.6.15"
export PATH="$PATH:$HOME/.pyenv/versions/3.6.15/bin"
eval "$(pyenv init -)"

PATH="/Users/leonzalion/perl5/bin${PATH:+:${PATH}}"; export PATH;
PERL5LIB="/Users/leonzalion/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}"; export PERL5LIB;
PERL_LOCAL_LIB_ROOT="/Users/leonzalion/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}"; export PERL_LOCAL_LIB_ROOT;
PERL_MB_OPT="--install_base \"/Users/leonzalion/perl5\""; export PERL_MB_OPT;
PERL_MM_OPT="INSTALL_BASE=/Users/leonzalion/perl5"; export PERL_MM_OPT;

zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}


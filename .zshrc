export PATH="$HOME/code/homebrew/bin:$PATH"
export EDITOR="nvim"

set -o vi

export GOKU_EDN_CONFIG_FILE=~/.config/goku/karabiner.edn

. ~/.zsh_aliases

# add brew bash autocompletion
if type brew &>/dev/null
then
  FPATH="$(brew --prefix)/share/zsh/site-functions:${FPATH}"
fi

zstyle ':completion:*' list-prompt ''
zstyle ':completion:*' select-prompt ''

# For Python & Tkinter
# For compilers to find zlib you may need to set:
export LDFLAGS="${LDFLAGS} -L/usr/local/opt/zlib/lib"
export CPPFLAGS="${CPPFLAGS} -I/usr/local/opt/zlib/include"

# For pkg-config to find zlib you may need to set:
export PKG_CONFIG_PATH="${PKG_CONFIG_PATH} /usr/local/opt/zlib/lib/pkgconfig"

export PATH="$HOME/.poetry/bin:$PATH"

export PATH="$HOME/perl5/bin${PATH:+:${PATH}}";
export PERL5LIB="$HOME/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}";
export PERL_LOCAL_LIB_ROOT="$HOME/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}";
export PERL_MB_OPT="--install_base \"$HOME/perl5\"";
export PERL_MM_OPT="INSTALL_BASE=$HOME/perl5";

zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

export PATH="$PATH:$HOME/.local/bin"
export PATH="$PATH:$HOME/.cargo/bin"
source $HOME/.cargo/env

alias clear="printf '\33c\e[3J'"
export PATH="/usr/local/opt/tcl-tk/bin:$PATH"
export PATH="$HOME/bin:$PATH"
export GEM_HOME=$HOME/.gem
export PATH="$PATH:$HOME/.gem/bin"

export OPENSSL_ROOT_DIR=/usr/local/Cellar/openssl@1.1/1.1.1q/
export OPENSSL_LIBRARIES=/usr/local/Cellar/openssl@1.1/1.1.1q/lib

alias -g ...='../..'
alias -g ....='../../..'
alias -g .....='../../../..'
alias -g ......='../../../../..'

# bun completions
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="/opt/local/bin:$PATH"

# pnpm
export PNPM_HOME="/Users/leonsilicon/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

eval "$(/opt/homebrew/bin/brew shellenv)"
eval "$(zoxide init zsh)"

export PATH="$HOME/go/bin:$PATH"

eval "$(direnv hook zsh)"
eval $(thefuck --alias f)

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/opt/miniconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/opt/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/opt/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/opt/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion



eval "$(fnm env --use-on-cd --shell zsh)"


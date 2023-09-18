export PATH="/Users/leondreamed/code/homebrew/bin:$PATH"
export EDITOR="nvim"

set -o vi

export GOKU_EDN_CONFIG_FILE=~/.config/goku/karabiner.edn

eval "$(zoxide init zsh)"

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

export PYTHONPATH="$PYTHONPATH:$HOME/.pyenv/versions/3.6.15"
export PATH="$PATH:$HOME/.pyenv/versions/3.6.15/bin"
export PATH="$(pyenv root)/shims:$PATH"
eval "$(pyenv init -)"

export PATH="/Users/leondreamed/perl5/bin${PATH:+:${PATH}}";
export PERL5LIB="/Users/leondreamed/perl5/lib/perl5${PERL5LIB:+:${PERL5LIB}}";
export PERL_LOCAL_LIB_ROOT="/Users/leondreamed/perl5${PERL_LOCAL_LIB_ROOT:+:${PERL_LOCAL_LIB_ROOT}}";
export PERL_MB_OPT="--install_base \"/Users/leondreamed/perl5\"";
export PERL_MM_OPT="INSTALL_BASE=/Users/leondreamed/perl5";

zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}

export PATH="$PATH:/Users/leondreamed/.local/bin"
export PATH="$PATH:/Users/leondreamed/.cargo/bin"

alias clear="printf '\33c\e[3J'"
export PATH="/usr/local/opt/tcl-tk/bin:$PATH"
export PATH="/Users/leondreamed/bin:$PATH"
export GEM_HOME=$HOME/.gem
export PATH="$PATH:/Users/leondreamed/.gem/bin"

export OPENSSL_ROOT_DIR=/usr/local/Cellar/openssl@1.1/1.1.1q/
export OPENSSL_LIBRARIES=/usr/local/Cellar/openssl@1.1/1.1.1q/lib

alias -g ...='../..'
alias -g ....='../../..'
alias -g .....='../../../..'
alias -g ......='../../../../..'

# export PATH="$HOME/.tea/npmjs.org/v*/bin:$PATH"
# export PATH="$HOME/Library/pnpm:$PATH"

# pnpm
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

export PATH="/Users/leondreamed/.tea/ruby-lang.org/v*/bin:$PATH"
export PATH="/Users/leondreamed/.tea/go.dev/v*/bin:$PATH"
export PATH="/Users/leondreamed/.tea/npmjs.com/v9.8.1/bin:$PATH"
export PATH="/Users/leondreamed/.tea/nodejs.org/v20.5.0/bin:$PATH"

# bun completions
[ -s "/Users/leondreamed/.bun/_bun" ] && source "/Users/leondreamed/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# begin:tunnel-shell-configuration
export DIRENV_LOG_FORMAT=""
cd /Users/leondreamed/repos/Tunnel-Labs/Tunnel && eval "$('/Users/leondreamed/.tea/direnv.net/v*/bin/direnv' hook zsh)" && cd - > /dev/null
# end:tunnel-shell-configuration

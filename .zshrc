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

  autoload -Uz compinit
  compinit -i
fi

export PATH="$(pnpm bin -g):$PATH"
export PATH="/Users/leonzalion/code/bin:$PATH"

export PNPM_HOME="/Users/leonzalion/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"

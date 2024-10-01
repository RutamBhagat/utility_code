# Personal Zsh configuration file.
# Documentation: https://github.com/romkatv/zsh4humans/blob/v5/README.md.

# Periodic auto-update on Zsh startup: 'ask' or 'no'.
zstyle ':z4h:' auto-update      'no'
zstyle ':z4h:' auto-update-days '28'

# Keyboard type: 'mac' or 'pc'.
zstyle ':z4h:bindkey' keyboard  'pc'

# Don't start tmux.
zstyle ':z4h:' start-tmux       no

# Mark up shell's output with semantic information.
zstyle ':z4h:' term-shell-integration 'yes'

# Right-arrow key accepts one character ('partial-accept') from command autosuggestions or the whole thing ('accept')?
zstyle ':z4h:autosuggestions' forward-char 'accept'

# Recursively traverse directories when TAB-completing files.
zstyle ':z4h:fzf-complete' recurse-dirs 'no'

# Enable direnv to automatically source .envrc files.
zstyle ':z4h:direnv'         enable 'no'
zstyle ':z4h:direnv:success' notify 'yes'

# Enable automatic teleportation of z4h over SSH when connecting to these hosts.
zstyle ':z4h:ssh:example-hostname1'   enable 'yes'
zstyle ':z4h:ssh:*.example-hostname2' enable 'no'
zstyle ':z4h:ssh:*'                   enable 'no'
zstyle ':z4h:ssh:*' send-extra-files '~/.nanorc' '~/.env.zsh'

# Clone additional Git repositories from GitHub.
z4h install ohmyzsh/ohmyzsh || return

# Initialize Zsh.
z4h init || return

# Extend PATH.
path=(~/bin $path)

# Export environment variables.
export GPG_TTY=$TTY
export NVM_DIR="$HOME/.nvm"
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Source additional local files if they exist.
[ -f ~/.env.zsh ] && z4h source ~/.env.zsh

# Load additional Git repositories pulled in with `z4h install`.
z4h source ohmyzsh/ohmyzsh/lib/diagnostics.zsh
z4h load   ohmyzsh/ohmyzsh/plugins/emoji-clock
z4h load   ohmyzsh/ohmyzsh/plugins/git  # Added git plugin

# Define key bindings.
z4h bindkey z4h-backward-kill-word  Ctrl+Backspace     Ctrl+H
z4h bindkey z4h-backward-kill-zword Ctrl+Alt+Backspace
z4h bindkey undo                     Ctrl+/ Shift+Tab
z4h bindkey redo                     Alt+/
z4h bindkey z4h-cd-back             Alt+Left
z4h bindkey z4h-cd-forward           Alt+Right
z4h bindkey z4h-cd-up                Alt+Up
z4h bindkey z4h-cd-down              Alt+Down

# Autoload functions.
autoload -Uz zmv

# Define functions and completions.
function md() { [[ $# == 1 ]] && mkdir -p -- "$1" && cd -- "$1" }
compdef _directories md

# Define named directories for WSL.
[[ -n $z4h_win_home ]] && hash -d w=$z4h_win_home

# Define aliases.
alias tree='tree -a -I .git'
alias ls="${aliases[ls]:-ls} -A"
alias gaa='git add -A'
alias gcm='git commit -m'
alias gpum='git push -u origin main'
alias pbcopy='xclip -selection clipboard'
alias pbpaste='xclip -selection clipboard -o'

# Set shell options.
setopt glob_dots     # no special treatment for file names with a leading dot
setopt no_auto_menu  # require an extra TAB press to open the completion menu

# Add ZSH_THEME from old .zshrc
ZSH_THEME="powerlevel10k/powerlevel10k"

# Load Homebrew environment variables (from old .zshrc)
if [ -d "/home/linuxbrew/.linuxbrew" ]; then
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
elif [ -d "$HOME/.linuxbrew" ]; then
    eval "$($HOME/.linuxbrew/bin/brew shellenv)"
fi

# Optionally, you can add this to save history when zsh exits
function zshexit() {
  history -a
}

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# bun completions
[ -s "/home/rutam/.bun/_bun" ] && source "/home/rutam/.bun/_bun"

clone_template_project() {
    local templates_dir="/home/rutam/Downloads/Code/utility_code/code_template/templates"
    local index_ts="/home/rutam/Downloads/Code/utility_code/code_template/index.ts"
    local output_file="/tmp/selected_template.txt"
    
    if [ ! -f "$index_ts" ]; then
        echo "index.ts not found in the templates directory."
        return 1
    fi

    # Run the TypeScript file using Bun
    bun run "$index_ts"

    # Check if the output file exists and read the selected template
    if [ -f "$output_file" ]; then
        local selected_template=$(cat "$output_file")
        rm "$output_file"  # Clean up the temporary file
    else
        echo "No template selected."
        return 1
    fi

    if [ -z "$selected_template" ]; then
        echo "No template selected."
        return 1
    fi

    local template_path="$templates_dir/$selected_template"
    if [ -f "$template_path" ]; then
        # Source the script instead of executing it
        source "$template_path"
    else
        echo "Selected template not found: $selected_template"
        return 1
    fi
}

# Create an alias for the function
alias code_template='clone_template_project'

alias python='python3'
alias zshrc='code ~/.zshrc'
alias generate_cohort_thread='bun run /home/rutam/Downloads/Threads/cohort/index.ts'

#theme/plugins
# source $ZSH_CUSTOM/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source $ZSH_CUSTOM/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh
source $ZSH_CUSTOM/plugins/zsh-you-should-use/zsh-you-should-use.plugin.zsh


plugins=(
    git 
    zsh-syntax-highlighting 
    zsh-autosuggestions 
    zsh-history-substring-search 
    zsh-you-should-use
)
# Powerlevel10k instant prompt configuration. Keep this near the top of ~/.zshrc.

# Initialization code requiring console input (passwords, confirmations) MUST go above.

if [[-r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"]]; then
source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Configure Powerlevel10k instant prompt

typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet

# Source Powerlevel10k theme

[[! -f ~/.p10k.zsh]] || source ~/.p10k.zsh # To customize, run `p10k configure`

# Set keyboard layout silently - redirecting all output to /dev/null

{ setxkbmap us colemak; } &>/dev/null

# --- Path and Environment Variables ---

# If you come from bash, you might have to change your $PATH.

export PATH="$HOME/bin:/usr/local/bin:$PATH"

# Standard environment variables

export ZSH="$HOME/.oh-my-zsh"
export GOPATH="$HOME/go"
export PATH="$PATH:$GOPATH/bin"
export NVM_DIR="$HOME/.nvm"
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
export XKB_DEFAULT_LAYOUT=colemak # While not directly used here, can be useful for other tools
export PATH="$PATH:/home/voldemort/.local/bin" # Created by `pipx`
export MESA_D3D12_DEFAULT_ADAPTER_NAME=NVIDIA  # For graphics performance
export XDG_DATA_DIRS="$XDG_DATA_DIRS:/var/lib/flatpak/exports/share:/home/voldemort/.local/share/flatpak/exports/share"
export BROWSER=google-chrome

# --- Oh My Zsh Configuration ---

# Set the theme

ZSH_THEME="powerlevel10k/powerlevel10k"

# --- Oh My Zsh Plugins ---

plugins=(
git
aliases
ubuntu
systemadmin
sudo
history
vscode
ansible
docker
docker-compose
you-should-use
zsh-autosuggestions
zsh-syntax-highlighting
zsh-history-substring-search
zsh-bat
)

source $ZSH/oh-my-zsh.sh

# --- Completion Settings ---

zstyle ':completion:\*' menu select # Enable menu selection
zmodload zsh/complist # Load completion module

# Bind arrow keys for completion menu

bindkey -M menuselect '^[[A' vi-up-line-or-history
bindkey -M menuselect '^[[B' vi-down-line-or-history
bindkey -M menuselect '^[[C' vi-forward-char
bindkey -M menuselect '^[[D' vi-backward-char

# --- Optional Oh My Zsh Configurations (Uncomment to enable) ---

# Case-sensitive completion

# CASE_SENSITIVE="true"

# Hyphen-insensitive completion

# HYPHEN_INSENSITIVE="true"

# Automatic updates

# zstyle ':omz:update' mode disabled # disable

# zstyle ':omz:update' mode auto # automatic

# zstyle ':omz:update' mode reminder # reminder

# zstyle ':omz:update' frequency 13 # update frequency (days)

# --- Other Zsh Options (Uncomment to enable) ---

# Disable magic functions (for pasting issues)

# DISABLE_MAGIC_FUNCTIONS="true"

# Disable colors in ls

# DISABLE_LS_COLORS="true"

# Disable auto-setting terminal title

# DISABLE_AUTO_TITLE="true"

# Enable command auto-correction

# ENABLE_CORRECTION="true"

# Completion waiting dots

# COMPLETION_WAITING_DOTS="true"

# Disable dirty marking for untracked files (speeds up large repos)

# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Format for history timestamps

# HIST_STAMPS="mm/dd/yyyy"

# --- NVM ---

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # Load NVM
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # Load NVM bash completion

# --- Bun ---

[ -s "/home/voldemort/.bun/_bun" ] && source "/home/voldemort/.bun/\_bun"

# --- Homebrew ---

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# --- Editor Configuration (VS Code and Cursor switching) ---

code_switch_func() {
local zshrc="$HOME/.zshrc"
    local temp_file="/tmp/zshrc.tmp"
    local state_file="$HOME/.editor_state"

    [[ ! -f "$state_file" ]] && echo "vscode" > "$state_file"
    local current_state=$(cat "$state_file")

    grep -v "^alias cursor=" "$zshrc" | grep -v "^alias code=" > "$temp_file"

    if [[ "$current_state" == "vscode" ]]; then
        echo "cursor" > "$state_file"
        echo 'alias code="/mnt/c/Users/Rutam/AppData/Local/Programs/cursor/resources/app/bin/cursor"' >> "$temp_file"
        echo 'alias cursor="/mnt/c/Users/Rutam/AppData/Local/Programs/Microsoft\ VS\ Code/bin/code"' >> "$temp_file"
        print "Switched to Cursor as default 'code' command"

    else
        echo "vscode" > "$state_file"
        echo 'alias cursor="/mnt/c/Users/Rutam/AppData/Local/Programs/cursor/resources/app/bin/cursor"' >> "$temp_file"
        echo 'alias code="/mnt/c/Users/Rutam/AppData/Local/Programs/Microsoft\ VS\ Code/bin/code"' >> "$temp_file"
        print "Switched to VS Code as default 'code' command"
    fi

    mv "$temp_file" "$zshrc"
    exec zsh

}

# Set default editors. These will get swapped by code_switch as needed.

alias cursor="/mnt/c/Users/Rutam/AppData/Local/Programs/cursor/resources/app/bin/cursor"
alias code="/mnt/c/Users/Rutam/AppData/Local/Programs/Microsoft\ VS\ Code/bin/code"
alias code_switch='code_switch_func'

# --- Aliases ---

alias python='python3.11'
alias open='explorer.exe .'
alias ls="${aliases[ls]:-ls} -A" # Use existing ls alias or default to ls -A
alias tree='tree -a -I ".git" --gitignore'
alias pbcopy='xclip -selection clipboard' # Copy to clipboard
alias pbpaste='xclip -selection clipboard -o' # Paste from clipboard
alias cat='bat --paging=never' # View file contents with bat
alias catgitignored="function \_catgitignored() { git ls-files \"\$1\" | xargs cat | pbcopy; }; \_catgitignored"
alias gcm='git commit -m'
alias gap='git add -p'
alias gpum='git push -u origin main'

alias code_primary='code /home/voldemort/Desktop/Code/python_projects/langgraph-grojects/langchain_academy/intro_to_langgraph/langchain-academy'
alias code_secondary='code /home/voldemort/Desktop/Code/open_source/swipe/gmail-pub-sub'
alias code_zshrc='code ~/.zshrc'
alias code_fabric_prompts='code /home/voldemort/.config/fabric/patterns'
alias code_threads='code /home/voldemort/Desktop/Code/utility_code/Threads/cohort'
alias code_template_code='code /home/voldemort/Desktop/Code/utility_code/code_template/templates'
alias code_portfolio='code /home/voldemort/Desktop/Code/portfolio/magic-portfolio'

alias template_code='clone_template_project'
alias template_linkedin='bun run /home/voldemort/Desktop/Code/utility_code/linkedin_template/index.ts'
alias template_generate_cohort_thread='bun run /home/voldemort/Desktop/Code/utility_code/Threads/cohort/index.ts'
alias redditscrape='/home/voldemort/Desktop/Code/utility_code/reddit/.venv/bin/python /home/voldemort/Desktop/Code/utility_code/reddit/scrape.py'
alias firefox='snap run firefox'

# --- Functions ---

# Unalias md if it exists (before function definition)

unalias md 2>/dev/null

# Create and enter directory

md() {
[[$# == 1]] && mkdir -p -- "$1" && cd -- "$1"
}

yt() { # Download YouTube transcripts
if [["$1" == "--transcript"]]; then
yt-dlp --write-auto-sub --skip-download "$2"
    else
        print "Invalid option. Use --transcript <URL> to download transcripts."
    fi
}
update_code_alias() { # Function to update code_primary/code_secondary aliases
    local dir; dir=$(pwd)
if [[$1 != "primary" && $1 != "secondary"]]; then
print "Usage: update*code_alias [primary|secondary]"
return 1
fi
local alias_name="code*$1"
local new_alias="alias $alias_name='code $dir'"

    if grep -q "^alias $alias_name=" ~/.zshrc; then
        sed -i "s|^alias $alias_name=.*|$new_alias|" ~/.zshrc
    else
        echo "$new_alias" >> ~/.zshrc
    fi

    if grep -q "^$new_alias" ~/.zshrc; then
        source ~/.zshrc
        print "$alias_name updated to open $dir"
    else
        print "Error: alias update failed."
    fi

}
clone_template_project() {
local templates_dir="/home/voldemort/Desktop/Code/utility_code/code_template/templates"
local index_ts="/home/voldemort/Desktop/Code/utility_code/code_template/index.ts"
local output_file="/tmp/selected_template.txt"

[[! -f "$index_ts"]] && { print "index.ts not found."; return 1; }
bun run "$index_ts"

if [[-f "$output_file"]]; then
local selected_template=$(cat "$output_file"); rm "$output_file"
else
print "No template selected."; return 1
fi

[[-z "$selected_template"]] && { print "No template selected."; return 1; }

local template_path="$templates_dir/$selected_template"
[[-f "$template_path"]] && source "$template_path" || { print "Template not found: $selected_template"; return 1; }
}

# --- Zsh Options ---

setopt glob_dots # Include dotfiles in globbing
setopt auto_menu # Automatic menu completion

fpath+=~/.zfunc # Add .zfunc to function path
autoload -Uz compinit # Load and initialize completion system
compinit # Initialize completion system

compdef \_directories md # Completion definition for the md function

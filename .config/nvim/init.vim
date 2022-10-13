set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath=&runtimepath
source ~/.vimrc

function! DeleteInnerNumber()
python3 << EOF
import vim
import json

line = vim.eval("getline('.')")
line_number = vim.eval("line('.')")
cursor_pos = int(vim.eval("col('.')"))

def is_hex(s):
    try:
        int(s, 16)
        return True
    except ValueError:
        return False

queue = [(0, len(line))]
number_substring = None

visited = [[False] * (len(line) + 1) for _ in range(len(line) + 1)]

# Loop through all possible substrings that contain this position in order
# from longest substring to smallest substring
while len(queue) > 0:
    (left, right) = queue.pop(0)
    if visited[left][right]: continue
    visited[left][right] = True
    if left >= right: break
    substring = line[left:right]
    if substring[0] == '-' or substring[0] == '+':
        substring = substring[1:]

    if is_hex(substring):
        number_substring = (left, right)
        break

    if left < cursor_pos:
        queue.append((left + 1, right))
    if right > cursor_pos:
        queue.append((left, right - 1))

if number_substring != None:
  line_with_number_erased = line[:number_substring[0]] + line[number_substring[1]:]
  vim.eval(f"setline('.', {json.dumps(line_with_number_erased)})")
EOF
endfunction

:nmap din :call DeleteInnerNumber()<CR><CR>

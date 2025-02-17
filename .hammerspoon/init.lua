hs.window.animationDuration = 0

local function getVisibleWindows()
    return hs.fnutils.filter(hs.window.allWindows(), function(window)
        local app = window:application()
        if not app then return false end

        -- Skip temporary/system windows
        if window:subrole() == "AXSystemDialog" or
           window:subrole() == "AXDialog" or
           window:role() == "AXSystemFloatingWindow" then
            return false
        end

        return window:isVisible()
            and window:isStandard()
            and app:name() ~= "Wispr Flow"
            and app:name() ~= "Bartender 5"
    end)
end

local function getClosestWindowInDirection(currentWindow, direction)
    local visibleWindows = getVisibleWindows()
    local currentFrame = currentWindow:frame()
    local currentWindowName = currentWindow:application():name()
    local currentPoint = { x = currentFrame.x, y = currentFrame.y }
    local closestWindow = nil
    local minDistance = math.huge

    for _, window in ipairs(visibleWindows) do
        if window ~= currentWindow then
            local frame = window:frame()
            local candidatePoint = { x = frame.x, y = frame.y }
            local valid = false
            local distance = math.huge

            if direction == "west"  then
                if candidatePoint.x < currentPoint.x then
                    valid = true
                    distance = currentPoint.x - candidatePoint.x
                elseif candidatePoint.x == currentPoint.x and window:application():name() < currentWindowName then
                    valid = true
                    distance = 0
                end
            elseif direction == "east" then
                if candidatePoint.x > currentPoint.x then
                    valid = true
                    distance = candidatePoint.x - currentPoint.x
                elseif candidatePoint.x == currentPoint.x and window:application():name() > currentWindowName then
                    valid = true
                    distance = 0
                end
            elseif direction == "north" then
                if candidatePoint.y < currentPoint.y then
                    valid = true
                    distance = currentPoint.y - candidatePoint.y
                elseif candidatePoint.y == currentPoint.y and window:application():name() < currentWindowName then
                    valid = true
                    distance = 0
                end
            elseif direction == "south" then
                if candidatePoint.y > currentPoint.y then
                    valid = true
                    distance = candidatePoint.y - currentPoint.y
                elseif candidatePoint.y == currentPoint.y and window:application():name() > currentWindowName then
                    valid = true
                    distance = 0
                end
            end

            if valid then
                if distance < minDistance then
                    minDistance = distance
                    closestWindow = window
                elseif distance == minDistance then
                    if (direction == "west" or direction == "north") and window:application():name() < currentWindowName then
                        closestWindow = window
                    elseif (direction == "east" or direction == "south") and window:application():name() > currentWindowName then
                        closestWindow = window
                    end
                end
            end
        end
    end

    return closestWindow
end

local function focusOrSwapWindow(direction, swap)
    local currentWindow = hs.window.focusedWindow()
    if not currentWindow or not currentWindow:isVisible() then
        -- If no window is focused, find the direction-most window
        local visibleWindows = getVisibleWindows()
        local extremeWindow = nil
        local extremeValue = nil

        for _, window in ipairs(visibleWindows) do
            local frame = window:frame()
            local value = nil

            if direction == "west" then
                value = frame.x
                if extremeValue == nil or value < extremeValue then
                    extremeValue = value
                    extremeWindow = window
                end
            elseif direction == "east" then
                value = frame.x + frame.w
                if extremeValue == nil or value > extremeValue then
                    extremeValue = value
                    extremeWindow = window
                end
            elseif direction == "north" then
                value = frame.y
                if extremeValue == nil or value < extremeValue then
                    extremeValue = value
                    extremeWindow = window
                end
            elseif direction == "south" then
                value = frame.y + frame.h
                if extremeValue == nil or value > extremeValue then
                    extremeValue = value
                    extremeWindow = window
                end
            end
        end

        if extremeWindow then
            extremeWindow:focus()
        end
        return
    end

    local targetWindow = getClosestWindowInDirection(currentWindow, direction)
    if not targetWindow then
        return
    end

    if swap then
        local targetFrame = targetWindow:frame()
        targetWindow:setFrame(currentWindow:frame())
        currentWindow:setFrame(targetFrame)
    else
        targetWindow:focus()
    end
end

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "h", function()
    focusOrSwapWindow("west", false)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, "h", function()
    focusOrSwapWindow("west", true)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "l", function()
    focusOrSwapWindow("east", false)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, "l", function()
    focusOrSwapWindow("east", true)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "k", function()
    focusOrSwapWindow("north", false)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, "k", function()
    focusOrSwapWindow("north", true)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "j", function()
    focusOrSwapWindow("south", false)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, "j", function()
    focusOrSwapWindow("south", true)
end)

-- Grid layout: 1 2 3
--              4 5 6
--              7 8 9
local function setWindowToThird(position, expand)
    local win = hs.window.focusedWindow()
    if not win then return end

    local screen = win:screen():frame()
    local cellWidth = screen.w / 3
    local cellHeight = screen.h / 3
    local currentFrame = win:frame()

    local col = (position - 1) % 3
    local row = math.floor((position - 1) / 3)

    local thirdFrame = {
        x = screen.x + (col * cellWidth),
        y = screen.y + (row * cellHeight),
        w = cellWidth,
        h = cellHeight
    }

    local frame
    if expand then
        frame = {
            x = math.min(currentFrame.x, thirdFrame.x),
            y = math.min(currentFrame.y, thirdFrame.y),
            w = math.max(currentFrame.x + currentFrame.w, thirdFrame.x + thirdFrame.w) - math.min(currentFrame.x, thirdFrame.x),
            h = math.max(currentFrame.y + currentFrame.h, thirdFrame.y + thirdFrame.h) - math.min(currentFrame.y, thirdFrame.y)
        }
    else
        frame = thirdFrame
    end

    win:setFrame(frame)
end

for i = 1, 9 do
    hs.hotkey.bind({"cmd", "alt", "ctrl"}, tostring(i), function()
        setWindowToThird(i, false)
    end)
    hs.hotkey.bind({"cmd", "alt", "ctrl", "shift"}, tostring(i), function()
        setWindowToThird(i, true)
    end)
end

-- Snaps window to thirds grid by snapping each edge to the nearest grid line
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "0", function()
    local window = hs.window.focusedWindow()
    if window then
        local frame = window:frame()
        local screenFrame = window:screen():frame()
        local cellWidth = screenFrame.w / 3
        local cellHeight = screenFrame.h / 3

        local function snap(val, base, step)
            return base + math.floor((val - base) / step + 0.5) * step
        end

        local left = snap(frame.x, screenFrame.x, cellWidth)
        local top = snap(frame.y, screenFrame.y, cellHeight)
        local right = snap(frame.x + frame.w, screenFrame.x, cellWidth)
        local bottom = snap(frame.y + frame.h, screenFrame.y, cellHeight)

        window:setFrame({
            x = left,
            y = top,
            w = right - left,
            h = bottom - top
        })
    end
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "x", function()
    local win = hs.window.focusedWindow()
    if win then
        win:close()
    end
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "m", function()
    local win = hs.window.focusedWindow()
    if win then
        win:minimize()
    end
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "b", function()
    hs.application.launchOrFocus("Google Chrome Beta")
end)


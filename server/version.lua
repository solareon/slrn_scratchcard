CreateThread(function()
    PerformHttpRequest("https://version.red40.dev/version/slrn_scratchcard", function(statusCode, response, headers)
        if statusCode ~= 200 then
            lib.print.warn("[Version Check]: Failed to fetch latest version from API.")
            return
        end

        local jsonData = json.decode(response)
        if not jsonData or not jsonData.latestVersion then
            lib.print.warn("[Version Check]: Invalid API response.")
            return
        end

        local latestVersion = jsonData.latestVersion
        local currentVersion = 'v' .. GetResourceMetadata(GetCurrentResourceName(), "version", 0)

        if not currentVersion then
            lib.print.warn("[Version Check]: No version metadata found in fxmanifest.")
            return
        end

        if currentVersion ~= latestVersion then
            lib.print.warn(("[Version Check]: Outdated! Installed: %s, Latest: %s — Download the latest from CFX Portal or GitHub."):format(currentVersion, latestVersion))
			if jsonData.changeLog ~= '' then
                lib.print.info('[Version Check] Change Log:\n' .. jsonData.changeLog)
			end
        else
            lib.print.info(("[Version Check]: You are up to date! Version: %s"):format(currentVersion))
        end
    end, "GET", "", {})
end)
fx_version "cerulean"

description "Solareon Scratchcard"
author "solareon."
version '1.0.0'
repository 'https://github.com/solareon/slrn_scratchcard'

lua54 'yes'

games {
  "gta5",
}

ui_page 'web/build/index.html'

client_script "client/**/*"
server_script "server/**/*"
shared_script "@ox_lib/init.lua"

files {
	'web/build/index.html',
	'web/build/**/*',
  'images/**/*'
}
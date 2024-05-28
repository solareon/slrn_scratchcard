# slrn_scratchcard
A simple yet flexible scratch card system utilizing ox_inventory metadata and React to create dynamic sized scratch cards for players to earn money. Fully secure against client event injection as all processing is handled server side.

**ESX/QB/ND/QBOX supported with bridge**

## Preview
![image](https://github.com/solareon/slrn_scratchcard/assets/769465/8167930a-caec-4175-af0d-01b45e436802)

## Installation
Download the release version or build using `pnpm i` and `pnpm build`. Add the items to your `ox_inventory` configuration and to a shop then restart your server.

### Items
Add this item to your `ox_inventory/data/items.lua` configuration

```lua
	['scratchercard'] = {
		label = 'Lottery Scratcher',
		description = 'Lottery Scratchoff Ticket',
		weight = 5,
		stack = true,
		close = true,
		client = {
			usetime = 2500,
			anim = { clip = 'static', dict = 'amb@code_human_wander_texting_fat@male@base' },
			prop = {
				bone = 28422,
				model = 'prop_phone_ing',
				pos = vector3(-0.020, -0.010, 0.000),
				rot = vector3(2.309, 88.845, 29.979),
			}
		},
		server = {
			export = 'slrn_scratchcard.scratcher',
		}
	},
```

### Shops
Add these to a shop in your `ox_inventory/data/shops.lua` or to another shop resource, The metadata is a requirement for the cards to work.

```lua
{ name = "scratchercard", price = 1000, count = 100, metadata = { label = "7x7 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto8.png', scratcherType = 'sevenxseven' }, type = 'item' },
{ name = "scratchercard", price = 500, count = 100, metadata = { label = "6x6 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto7.png', scratcherType = 'sixxsix' }, type = 'item' },
{ name = "scratchercard", price = 200, count = 100, metadata = { label = "6x5 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto6.png', scratcherType = 'sixxfive' }, type = 'item' },
{ name = "scratchercard", price = 100, count = 100, metadata = { label = "5x5 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto5.png', scratcherType = 'fivexfive' }, type = 'item' },
{ name = "scratchercard", price = 50, count = 100, metadata = { label = "5x4 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto4.png', scratcherType = 'fivexfour' }, type = 'item' },
{ name = "scratchercard", price = 20, count = 100, metadata = { label = "4x4 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto3.png', scratcherType = 'fourxfour' }, type = 'item' },
{ name = "scratchercard", price = 10, count = 100, metadata = { label = "4x3 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto2.png', scratcherType = 'fourxthree' }, type = 'item' },
{ name = "scratchercard", price = 5, count = 100, metadata = { label = "3x3 Scratcher", imageurl = 'nui://slrn_scratchcard/images/lotto1.png', scratcherType = 'threexthree' }, type = 'item' }
```

# Support
- No support is provided but you can ask questions/submit issues via github.

# Credits
- [Randolio](https://github.com/Randolio) for the bridge stuff
- [project-error](https://github.com/project-error/fivem-react-boilerplate-lua) for the template
- [overextended](https://github.com/overextended) for ox_lib and ox_inventory which make stuff like this possible

# Dependencies
- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)


# Copyright

Copyright © 2024 Solareon <https://github.com/solareon>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

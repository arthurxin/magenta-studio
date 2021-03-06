/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const max = require('max-api')
const { spawn, fork } = require('child_process')
const kill = require('tree-kill')
const opn = require('opn')
const apps = ['continue', 'interpolate', 'groovae', 'generate']
const os = require('os')
const fs = require('fs-extra')
const { resolve } = require('path')

const appNames = ['continue', 'interpolate', 'generate', 'groovae']

max.addHandler('open', async app => {

	if (appNames.includes(app)){
		const appDir = resolve(__dirname, '../.apps')
		const apps = await fs.readdir(appDir)
		const executable = apps.find(a => a.toLowerCase().includes(app))

		const executablePath = resolve(appDir, executable)

		opn(executablePath).then(() => {
			max.outlet(app, 0)
		})
	}
})

max.addHandler('close', app => {

})

appNames.forEach(a => max.outlet(a, 0))

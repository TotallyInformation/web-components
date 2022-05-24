/** Simple ECMA module to load uibuilder module and all of the web component modules
 * Assumes you are using Node-RED/uibuilder
 */

// TODO - Change when this is moved to uibuilder proper
import './uibuilder.module.js'  // Adds `uibuilder` and `$` to globals

import '../components/button-send.js'
import '../components/container-br.js'
import '../components/data-list.js'
import '../components/definition-list.js'
import '../components/html-include.js'
import '../components/labelled-value.js'
import '../components/simple-card.js'
import '../components/simple-container.js'
import '../components/syntax-highlight.js'
import '../components/uib-theme-changer.js'

export default {}
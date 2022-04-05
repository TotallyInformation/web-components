# web-components
A repository of simple W3C Web Components. These have specific capabilities for use with node-red-contrib-uibuilder but will work independently as well.

## Requirements

These are the requirements for any web component to be included in this repository.

* SHOULD have a `<slot>` to allow nested rich content (where it makes sense).
* MUST be standalone with no external requirements. Common include library modules may be permitted however.
* MUST be useable in the majority of modern browsers. IE will not be supported.
* MUST use ES6+. Maxumum JavaScript version should be 2 years behind the leading edge and only features supported by the majority of mainstream browsers are allowed. Other features MAY be permitted as long as they are optional and do not produce errors.
* MUST be linted using ESLINT. SHOULD use JavaScript Standard format.

## Stand-alone use

### Installation and loading

tbc

### Using the components

See the [component documentation](docs) for specific usage information for each component.

## Use with [Node-RED](https://nodered.org/) and [node-red-contrib-uibuilder](https://github.com/TotallyInformation/node-red-contrib-uibuilder)

### Installation and loading

Install this repository using the library manager in a uibuilder node in Node-RED.

<img src="docs/images/2022-04-05-14-03-33.png" alt="uibuilder library manager" width="350"/>

Which results in something like:

<img src="docs/images/2022-04-05-14-09-34.png" alt="uibuilder installed library" width="350"/>

Noting that this library does not actually have a default script so the listed on is spurious.

You can then access the components by loading them into your html by including them in your index.js file using a dynamic import statement:

```javascript
// Load the hello-world web component, no need to assign to a variable
import('../uibuilder/vendor/@totallyinformation/web-components/components/hello-world.js')
```

Dynamic imports are supported by all common modern browsers and you don't need to load index.js as a module in order to use it. However, if you do load your index.js as a module as with `<script type="module" src="./index.js"></script>` in the head, then you can use a static import if you prefer.

### Using the components

The components can, of course, be used in the same way as if not using uibuilder. However, there are additional capabilities aimed at making their use in conjunction with Node-RED and uibuilder even easier. Specifically reducing the amount of code required to use them.

Components will automatically recognise when uibuilder is being used. They will each:

* Have a specific msg schema - when a msg with the matching schema is sent from Node-RED via uibuilder, a singular instance of the component on a page will be automatically updated. Where multiple instances are present, the msg must include an html id so that the msg will target that instance.

See the [component documentation](docs) for specific usage information for each component.

## Discussions and suggestions

The best place to ask questions, or suggest improvements about these components is the [GitHub discussion board for this repository](https://github.com/TotallyInformation/web-components/discussions).

## Contributing

If you would like to contribute to this node, you can contact [Totally Information via GitHub](https://github.com/TotallyInformation) or raise a request in the [GitHub issues log](https://github.com/TotallyInformation/web-components/issues).

<!-- Please refer to the [contributing guidelines](https://github.com/TotallyInformation/node-red-contrib-uibuilder/blob/master/.github/CONTRIBUTING.md) for more information. -->

## Developers/Contributors

- [Julian Knight](https://github.com/TotallyInformation) - the designer and main author.

   <a href="https://stackexchange.com/users/1375993/julian-knight"><img src="https://stackexchange.com/users/flair/1375993.png" width="208" height="58" alt="profile for Julian Knight on Stack Exchange, a network of free, community-driven Q&amp;A sites" title="profile for Julian Knight on Stack Exchange, a network of free, community-driven Q&amp;A sites" /></a>

   Please also check out my blog, [Much Ado About IT](https://it.knightnet.org.uk), it has information about all sorts of topics, mainly IT related, including Node-RED.

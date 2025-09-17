# Web Component Generator

A Node.js command-line script to quickly scaffold new web components for the TotallyInformation web-components project.

## Usage

### Interactive Mode
```bash
npm run new-component
```

### Command Line Mode
```bash
npm run new-component my-widget
# or
node ./libs/create-component.mjs my-widget
```

## What it does

The script creates three new files based on templates:

1. **Documentation** (`docs/components/experiments/[component-name].md`)
   - Uses `docs/_component-doc-template.md` as template
   - Replaces `xxxx-xxxx` with the component name
   - Replaces `XxxxXxxx` with the PascalCase component name

2. **Test HTML** (`tests/experiments/[component-name].html`)
   - Uses `tests/_test-template.html` as template
   - Replaces `xxxx-xxxx` with the component name
   - Replaces `XxxxXxxx` with the PascalCase component name

3. **JavaScript Component** (`src/experiments/[component-name].mjs`)
   - Uses `src/templates/component-template.mjs` as template
   - Replaces `xxxx-xxxx` with the component name
   - Replaces `XxxxXxxx` with the PascalCase component name
   - Also replaces `component-template` and `ComponentTemplate`

4. **Updates Test Index** (`tests/index.html`)
   - Adds a new link to the experiments section
   - Format: `<li><a href="experiments/[component-name].html">[component-name]</a></li>`

## Component Name Rules

- Must be exactly 2 words separated by a single dash
- Only lowercase letters allowed
- Examples: `my-widget`, `data-table`, `form-input`
- Invalid: `mywidget`, `my-widget-extra`, `My-Widget`, `my_widget`

## File Safety

- The script checks if files already exist before creating them
- Existing files will not be overwritten
- A warning message is displayed if files already exist

## Examples

```bash
# Create a new chart component
npm run new-component chart-display

# Create a new form component  
npm run new-component form-builder

# Create a new data component
npm run new-component data-grid
```

This will create:
- `docs/components/experiments/chart-display.md`
- `tests/experiments/chart-display.html`
- `src/experiments/chart-display.js`
- Update `tests/index.html` with the new component link

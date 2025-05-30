# Copilot Instructions

## Core Requirements

- Follow project eslint configuration
- Ensure WCAG 2.2 Level AA compliance
- Apply Shift-Left security practices

## Code Style

### JavaScript/TypeScript

- For node.js, use features available to v22 or below
- For browsers, use features available to 90%+ browsers/users
- No trailing semicolons
- Single quotes for strings
- Indent code blocks with 4 spaces
- Use const by default, let when needed
- Prefer arrow functions
- Use optional chaining
- Add JSDoc if missing
- Add TypeScript types/interfaces
- Use JavaScript Standard Style where possible https://standardjs.com

### Documentation

- Include JSDoc for functions and classes
- Add @param and @returns tags
- Document thrown errors
- Include usage examples for complex functions

### HTML/CSS

- Use semantic HTML elements
- Only use features available to 90%+ browsers/users
- Include ARIA attributes where needed
- Mobile-first responsive design
- Use CSS custom properties
- Follow BEM naming convention
- Include print styles
- Always use hsl colors
- Indent code blocks with 4 spaces

## Testing

- Write unit tests using Vitest
- Include accessibility tests
- Maintain >80% code coverage
- Test error scenarios

## Performance

- Lazy load components when possible
- Optimize images and assets
- Keep bundle size minimal
- Use proper caching strategies

## Security

- Sanitize user inputs
- Validate data on server-side
- Follow OWASP guidelines
- Use Content Security Policy

# Overview

This is a Full-Stack application for public events in Zaporizhia. Users can create their own events and sign up to existing ones.

# Theme colors

- Primary: #27187E
- Secondary: #758BFD
- Background: #F1F2F6
- Accent: #FF8600

# Folder structure

## event-space-zp-front

- src/app - Only for navigation purposes. No UI or business logic at all.
- src/features - Page-specific functions.
  - src/features/[page]/components
  - src/features/[page]/utils
  - src/features/[page]/hooks
  - src/features/[page]/api
  - src/features/[page]/store
  - src/features/[page]/styles
- src/shared - Shared functions that are used across multiple features.
  - src/shared/components
  - src/shared/utils
  - src/shared/hooks
  - src/shared/api
  - src/shared/store
  - src/shared/styles

## event-space-zp-back

- src/common - Shared functions and classes that are used across multiple modules.
- src/[module] - Module-specific functions and classes.

# Data model

## events

- id: integer
- name: string
- createdAt: timestamp
- description: string
- time: timestamp
- category: Category
- userId: uuid

## users

- id: uuid
- email: string
- password: string
- fullname: string
- createdAt: timestamp

## user_event

- userId: uuid
- eventId: integer

# Coding guidelines

## Component file structure

1. Imports
2. Interface
3. export default [component name]

## Callback functions

- Always factor callback functions out of TSX code.
- Use arrow functions inside components.
- Add "on" prefix to function names.

Example:

```JavaScript
export default Component() {
  const onButtonClick = () => {
    console.log("Hello world!");
  }

  return (
    <button onClick={onButtonClick}></button>
  )
}
```

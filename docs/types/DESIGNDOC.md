# Types Directory Design Document

## Purpose
The `types` directory contains TypeScript type definitions used across the application.

## Key Files

### theme.ts
- `TreeNode`: Theme node structure
- `NodeAddPosition`: Node position types
- `ThemeNodeProps`: Theme node component props
- `ThemeHandleProps`: Handle component props
- `ThemeFlowProps`: Flow editor props

### article.ts
- `Article`: Article data structure
- `SortField`: Article sort fields
- `SortDirection`: Sort direction types
- `SortConfig`: Sort configuration

### pagination.ts
- `PaginationState`: Pagination state
- `PaginationProps`: Pagination component props

## Type Categories

### Component Props
- Comprehensive prop types
- Event handler definitions
- Style and variant types

### Data Structures
- API response types
- State management types
- Configuration types

### Utility Types
- Helper type utilities
- Generic type definitions
- Common shared types

## Design Principles
1. Consistency
   - Naming conventions
   - Type structure
2. Reusability
   - Generic types
   - Composition
3. Documentation
   - Clear comments
   - Usage examples
4. Type Safety
   - Strict type checking
   - No any types

## Future Considerations
1. Documentation
   - Add more detailed type documentation
   - Include usage examples
2. Validation
   - Add runtime type validation
   - Zod schema integration
3. Organization
   - Group related types
   - Consider barrel exports
4. Testing
   - Add type tests
   - Validate type coverage


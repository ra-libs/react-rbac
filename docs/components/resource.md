# Resource

Resource component that provides Ra [Resource](https://marmelab.com/react-admin/Resource.html) with permissions, it shows/omit resource routes based on user permissions.

### Usage

```tsx
import { Admin, Resource } from "@ra-libs/react-rbac";

<Admin>
  <Resource name="<resource>" {...props} />
</Admin>
```

### Props

| Prop     | Required | Type    | Default | Description                                          |
| -------- | -------- | ------- | ------- | ---------------------------------------------------- |
| subject  | false    | string  |  -   | CASL permission subject to override resource name |

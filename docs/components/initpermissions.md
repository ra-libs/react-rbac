# InitPermissions

InitPermissions component it initializes the CASL Ability permissions if no Resource is rendered.

### Usage

If all your resources are restricted to specific permission the React-admin won't render any Resource component, that's why you need to use InitPermissions component in a public/home page

If you have at least one public (or with access to the) resource you can ignore this component.

```tsx
import { InitPermissions } from "@ra-libs/react-rbac";

<Dashboard>
  <InitPermissions />
</Dashboard>
```

> You can use it in Dashboard for example or any other component that will be rendered when user logs in.


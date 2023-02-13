# useCASL

Custom hook that returns CASL Ability and [Can](https://casl.js.org/v6/en/package/casl-react) component alongside with setPermissions method to update Ability rules.


## Usage

```tsx
import { useCASL, CASLAction } from "@ra-libs/react-rbac";


function MyComponent() {
  const { ability, Can } = useCASL();

  return (
    <>
      {/* You can use the ability directly  */}
      {ability.can(CASLAction.Read, "Article") && <Article />}
      
      {/* Or you can use the Can component */}
      <Can I={CASLAction.Read} an="Article">
        <Article />
      </Can>
    </>
  );
}
```
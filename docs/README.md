# Home

## @ra-libs/react-rbac

[![NPM Version](https://img.shields.io/npm/v/@ra-libs/react-rbac.svg)](https://www.npmjs.com/org/ra-libs) [![Package License](https://img.shields.io/npm/l/@ra-libs/react-rbac.svg)](https://www.npmjs.com/org/ra-libs) [![Publish Status](https://github.com/ra-libs/react/actions/workflows/semantic-release.yml/badge.svg)](https://github.com/ra-libs/react/actions/workflows/semantic-release.yml/badge.svg)

[React Admin](https://marmelab.com/react-admin/) complementary library that provides RBAC using [CASL](https://casl.js.org/v6/en) 

### Installation

Run npm install

```bash
npm install @ra-libs/react-rbac
```

### Usage

Make sure your **authProvider.getPermissions** method returns the permissions following this interface


```tsx
// authProvider

import { Role, Permission } from '@ra-libs/react-rbac';
import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
    // ...
    getPermissions: (): Role[] => {
        // Fetch your permissions
        // Permissions should follow this type
        return [
            {
                name: 'admin',
                permissions: [
                    {
                        action: 'read',
                        subject: 'Article'
                    }
                ]
            }
        ]
    }
}

```

Check the Permission type for more details.
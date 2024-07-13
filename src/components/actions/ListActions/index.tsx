import React, { cloneElement, useContext, useMemo } from 'react'
import {
  CreateButton,
  ExportButton,
  FilterButton,
  FilterContext,
  ListActionsProps as RAListActionsProps,
  sanitizeListRestProps,
  TopToolbar,
  useListContext,
  useResourceContext,
  useResourceDefinition,
} from 'react-admin'

import { CASLAction } from '../../../config'
import { useCASL } from '../../../contexts'

interface ListActionsProps extends RAListActionsProps {}

// Override ra-ui-materialui/src/list/ListActions.tsx

export function ListActions(props: ListActionsProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, filters: filtersProp, hasCreate: _, ...rest } = props

  const { displayedFilters, filterValues, exporter, showFilter, total } = useListContext()
  const resource = useResourceContext(props)
  const { hasCreate, name } = useResourceDefinition(props)
  const filters = useContext(FilterContext) || filtersProp
  const { Can } = useCASL()

  return useMemo(
    () => (
      <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
        {filtersProp
          ? cloneElement(filtersProp, {
              resource,
              showFilter,
              displayedFilters,
              filterValues,
              context: 'button',
            })
          : filters && <FilterButton />}
        <Can I={CASLAction.Create} a={name}>
          {hasCreate && <CreateButton />}
        </Can>
        {exporter !== false && <ExportButton disabled={total === 0} resource={resource} />}
      </TopToolbar>
    ),
    /* eslint-disable react-hooks/exhaustive-deps */
    [resource, displayedFilters, filterValues, filtersProp, showFilter, filters, total, className, exporter, hasCreate],
  )
}

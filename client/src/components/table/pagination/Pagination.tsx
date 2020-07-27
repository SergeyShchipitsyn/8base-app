import React, { Fragment } from 'react';
import classNames from 'classnames';

import { Button } from '../../button';

type Pagination = {
  pageIndex: number
  pageSize: number
  pageCount: number
  totalCount: number
  shownOnCurrentPage: number
  canPreviousPage: boolean
  canNextPage: boolean
  goToPage: (pageIndex: number) => void
  previousPage: () => void
  nextPage: () => void
  setPageSize: (pageSize: number) => void
}

export const INITIAL_PAGE_SIZE = 20

const SHOWN_PAGES_RANGE = 6

const PAGE_SIZE_OPTIONS: number[] = [10, 20, 30, 40, 50]

// note: pageCount starts with 1
// pageIndex starts with 0
// so for example, last page equals pageCount - 1

// TODO: replace native select with custom select component
const Pagination: React.FC<Pagination> = (
  {
    pageSize = INITIAL_PAGE_SIZE,
    pageIndex,
    pageCount,
    totalCount,
    shownOnCurrentPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    previousPage,
    nextPage,
    goToPage
  }
) => {
  const hasAnyRows = shownOnCurrentPage > 0
  const startRowCount = !hasAnyRows ? 0 : ((pageIndex) * pageSize) + 1
  const endRowCount = !hasAnyRows ? 0 : startRowCount + shownOnCurrentPage - 1

  function renderPagesButtons(): React.ReactNode {
    const firstPageButton = (
      <Button
        onClick={() => goToPage(0)}
        className={classNames({
          isCurrentPage: pageIndex === 0
        })}
      >
        1
      </Button>
    )

    return (
      <Fragment>
        {firstPageButton}
        {renderCurrentPagesButtons()}
        {renderLastPageButton()}
      </Fragment>
    )
  }

  function renderCurrentPagesButtons(): React.ReactNode {
    if (pageCount < 3) {
      return null
    }

    // exclude first and last pages from count
    const leftPagesCount = Math.min(pageCount - 2, SHOWN_PAGES_RANGE - 2)
    const hasPreviousHiddenPages = pageCount > SHOWN_PAGES_RANGE && pageIndex > 1
    const hasNextHiddenPages = pageCount > SHOWN_PAGES_RANGE
    && pageIndex < pageCount - 1 - leftPagesCount

    const getButtonIndex = (index: number): number => {
      const buttonPageIndex = pageIndex === 0
        ? pageIndex + index + 1
        : pageIndex + index
      // in case of the last pages - doing offset from the end, not from current page index
      let normalizedIndex = buttonPageIndex
      if (pageIndex + leftPagesCount >= pageCount) {
        normalizedIndex = pageCount - leftPagesCount + index - 1
      }

      return normalizedIndex
    }

    const currentPagesButtons = [...Array(leftPagesCount)].map((_, index) => {
      const buttonPageIndex = getButtonIndex(index)
      return (
        <Button
          key={buttonPageIndex}
          onClick={() => goToPage(buttonPageIndex)}
          className={classNames({
            isCurrentPage: pageIndex === buttonPageIndex
          })}
        >
          {buttonPageIndex + 1}
        </Button>
      )
    })

    return (
      <Fragment>
        {hasPreviousHiddenPages && (
          <span>...</span>
        )}
        {currentPagesButtons}
        {hasNextHiddenPages && (
          <span>...</span>
        )}
      </Fragment>
    )
  }

  function renderLastPageButton(): React.ReactNode {
    if (pageCount <= 1) {
      return null
    }

    return (
      <Button
        onClick={() => goToPage(pageCount - 1)}
        className={classNames({
          isCurrentPage: pageIndex === pageCount - 1
        })}
      >
        {pageCount}
      </Button>
    )
  }

  return (
    <div>
      <div>
        <Button
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>
        {renderPagesButtons()}
        <Button
          onClick={nextPage}
          disabled={!canNextPage}
        >
          {">"}
        </Button>
      </div>

      <div>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))
          }
        >
          {PAGE_SIZE_OPTIONS.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div>{`${startRowCount} - ${endRowCount} of ${totalCount} records`}</div>
    </div>
  )
}

export { Pagination }

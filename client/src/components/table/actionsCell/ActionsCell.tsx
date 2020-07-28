import React, { useState } from 'react';
import { Row } from 'react-table';

import { Dropdown } from '../../dropdown';
import { Button } from '../../button';


type ActionsCellProps = {
  row: Row
  onEditDialogOpen?: (rowId: string) => void
  onDeleteDialogOpen?: (rowId: string) => void
}

const ActionsCell: React.FC<ActionsCellProps> = ({
  onEditDialogOpen = () => {},
  onDeleteDialogOpen = () => {},
  row
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleOpenEditDialog() {
    onEditDialogOpen(row.id)
    setIsOpen(false)
  }

  function handleOpenDeleteDialog() {
    onDeleteDialogOpen(row.id)
    setIsOpen(false)
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>...</Button>
      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Button onClick={handleOpenEditDialog}>Edit</Button>
        <Button onClick={handleOpenDeleteDialog}>Delete</Button>
      </Dropdown>
    </div>
  )
}

export { ActionsCell };

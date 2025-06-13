'use client';

import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Dialog } from '@/components/Dialog';
import { ColorPicker } from '@/components/ColorPicker';

type ColorAreaProps = {
  color: string | null,
  setColor: Dispatch<SetStateAction<string | null>>,
  colors: string[],
}

export const ColorArea: FC<ColorAreaProps> = ({
  color,
  setColor,
  colors
}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  }

  const handleClick = () => {
    setOpen(true);
  }

  return <>
    <div
      className="aspect-square w-16 border"
      onClick={handleClick}
      style={{ backgroundColor: color || 'transparent' }}
    >

    </div>
    <Dialog
      isOpen={open}
      onClose={onClose}
    >
      <ColorPicker
        setColor={setColor}
        onClose={onClose}
        colors={colors}
      />
    </Dialog>
  </>
}
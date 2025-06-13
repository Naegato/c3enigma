import { Dispatch, FC, SetStateAction } from 'react';

type ColorPickerProps = {
  setColor: Dispatch<SetStateAction<string | null>>;
  onClose: () => void;
  colors: string[];
}

export const ColorPicker: FC<ColorPickerProps> = ({
  setColor,
  onClose,
  colors
}) => {


  return <div className="flex flex-wrap gap-2 p-4 justify-center items-center">
    {colors.map((color) => {
      return <div
        key={color}
        className="w-16 h-16 inline-block cursor-pointer border"
        style={{ backgroundColor: color }}
        onClick={() => {
          setColor(color);
          onClose();
        }}
      >
      </div>
    })}
  </div>
}
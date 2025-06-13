'use client';

import { FC, useMemo, useState } from 'react';
import { ColorArea } from '@/components/ColorArea';
import toast from 'react-hot-toast';

type ColorContainerProps = {
  token?: string,
  colors?: string[],
  defaultColors?: string[],
  settingColors: string[],
}
export const ColorContainer: FC<ColorContainerProps> = ({ token, colors, defaultColors, settingColors}) => {
  const [color, setColor] = useState<string | null>(defaultColors?.[0] || null);
  const [color2, setColor2] = useState<string | null>(defaultColors?.[1] || null);
  const [color3, setColor3] = useState<string | null>(defaultColors?.[2] || null);

  const resColors = useMemo(() => {
    return [color, color2, color3];
  }, [color, color2, color3]);

  const handleSubmit = () => {
    if (!token) {
      if (colors) {
        console.log(resColors, colors)
        if (JSON.stringify(resColors) === JSON.stringify(colors)) {
          toast.success('Bravo! Vous avez la bonne combinaison');
          return;
        }
        toast.error('Mauvaise combinaison');
        return;
      }

      toast.error('Veuillez sélectionner des couleurs');
      return;
    }

    const payload = {
      colors: [
        color,
        color2,
        color3
      ]
    };

    fetch('/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Un problèmes est survenue');
      }
      return response.json();
    })
    .then(() => {
      toast.success('Les couleurs on été soumises');
    })
    .catch((error) => {
      toast.error('Une erreur est survenue: ' + error.message);
    });
  }

  return <div className="flex gap-4 justify-center items-center flex-col p-5">
    <div className="flex gap-4 flex-wrap justify-center items-center">
      <ColorArea
        color={color}
        setColor={setColor}
        colors={settingColors}
      />
      <ColorArea
        color={color2}
        setColor={setColor2}
        colors={settingColors}
      />
      <ColorArea
        color={color3}
        setColor={setColor3}
        colors={settingColors}
      />
    </div>

    {(color && color2 && color3) && <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={handleSubmit}>
      Envoyer
    </button>}
  </div>
}
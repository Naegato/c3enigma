'use client';

import { FC } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type RemoveProps = {
  colors: string[];
}

export const Remove: FC<RemoveProps> = ({
  colors,
}) => {
  const router = useRouter();
  const [color, setColor] = useState<string | null>(null);

  const onSubmit = () => {
    if (!color) {
      toast.error('Color not Selected!');
      return;
    }

    fetch('/api/settings', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer settingscedriccechampion`,
      },
      body: JSON.stringify({ color }),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Probleme lors de la suprresion');
      }

      toast.success('Couleur Supprimer');
      router.push(`/admin?d=${Math.random()}`);
    }).catch(err => {
      toast.error('Settings error', err.message);
    })
  }

  return <div className="flex flex-col gap-5">
    <div className="flex gap-3">
      {colors.map((c, index) => (
        <div
          key={index}
          className={`w-10 aspect-square border-5 ${color === c ? 'border-green-500' : ''}`}
          style={{ backgroundColor: c }} onClick={() => setColor(color === c ? null : c)}
        >
        </div>
      ))}
    </div>
    <button onClick={onSubmit}>
      Supprimer
    </button>
  </div>
}
'use client';

import toast from 'react-hot-toast';
import { FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';

export const Add = () => {
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);


    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer settingscedriccechampion`,
      },
      body: JSON.stringify(Object.fromEntries(data.entries())),
    }).then(res => {
      if (!res.ok) {
        throw new Error('Problème pour Ajouter');
      }

      toast.success('Couleur Ajouter');
      router.push(`/admin?d=${Math.random()}`);
    }).catch(err => {
      toast.error('Erreur d\'ajout', err.message);
    })
  }

  return <form onSubmit={onSubmit} className="flex flex-col gap-5 items-center">
    <h2>Ajouter la couleur</h2>
    <input type="color" name="color" />
    <button type="submit">
      Soumettre
    </button>
  </form>
}
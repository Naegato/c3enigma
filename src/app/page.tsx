import { ColorContainer } from '@/components/ColorContainer';

const Page = async () => {
  const res = (await fetch(`http://localhost:3000/api/colors`, {
    method: 'GET',
  }));

  const data = await res.json();

  const resSettings = (await fetch(`http://localhost:3000/api/settings`, {
    method: 'GET',
  }));

  const dataSettings = await resSettings.json();

  return <div className="flex items-center justify-center flex-col gap-5 min-h-dvh">
    <h1 className="text-center px-2">Trouvé la combinaison !</h1>
    <ColorContainer
      colors={data.colors}
      settingColors={dataSettings.colors}
    />
  </div>
}

export default Page;
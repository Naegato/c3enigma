import { ColorContainer } from '@/components/ColorContainer';
import { Add } from '@/components/settings/Add';
import { Remove } from '@/components/settings/Remove';

const Page = async () => {
  const res = (await fetch(`http://localhost:3000/api/colors`, {
    method: 'GET',
  }));

  const data = await res.json();

  const resSettings = (await fetch(`http://localhost:3000/api/settings `, {
    method: 'GET',
  }));

  const dataSettings = await resSettings.json();

  return <div className="flex items-center justify-center flex-col gap-5 min-h-dvh">
    <h1>Admin</h1>
    <ColorContainer token="cedriccechampion" defaultColors={data.colors} settingColors={dataSettings.colors} />
    <hr className="w-1/2" />
    <Add />
    <hr className="w-1/2" />
    <Remove colors={dataSettings.colors} />
  </div>
}

export default Page;
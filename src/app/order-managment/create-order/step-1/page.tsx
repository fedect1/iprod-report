import StepOneForm from './StepOneForm';

import { getLinesRequest, Line} from '@/app/helpers/linesRequest';

export const metadata = {
  title: 'Params selection',
};

export default async function StepOnePage() {
    const data: Line[] = await getLinesRequest()
    return (
      <div>
       <StepOneForm data = {data}/>        
      </div>
    );
  }
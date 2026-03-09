import { Suspense } from 'react';
import SpecialistDisplay from './specialistDisplay';
import MeetSpecialistsClient from './meetSpecialistsClient';

export default function MeetSpecialists() {
  return (
    <MeetSpecialistsClient>
      <Suspense fallback={<div className="text-center py-12 text-gray-600">Loading specialists...</div>}>
        <SpecialistDisplay />
      </Suspense>
    </MeetSpecialistsClient>
  );
}

import { ShieldAlert, CircleCheck } from 'lucide-react';
import { Status } from '@/types';

type MessageFormProps = {
   message: string | null;
   type: Status;
};

export default function MessageForm({ message, type }: MessageFormProps) {
   const styleBackgroundErr =
      type === Status.SUCCESS
         ? 'bg-green-200 text-green-700'
         : 'bg-red-200 text-red-500';

   return (
      <>
         {message && (
            <div
               className={`mt-4 flex min-h-10 items-center justify-center space-x-1 rounded-sm ${styleBackgroundErr} p-2 text-sm`}
            >
               {type === Status.SUCCESS ? (
                  <CircleCheck className="h-5 w-5" />
               ) : (
                  <ShieldAlert className="h-5 w-5" />
               )}
               <p>{message}</p>
            </div>
         )}
      </>
   );
}

'use client';
import { useRouter } from 'next/navigation';

interface BtnProps {
  url: string;
}

export const BtnDelete = ({ url }: BtnProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/files', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>DELETE</button>
    </div>
  );
};

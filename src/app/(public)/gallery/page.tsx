import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export default function GalleryPage() {
  const directoryPath = path.join(process.cwd(), 'public/preview');
  let files: string[] = [];
  
  try {
      if (fs.existsSync(directoryPath)) {
        files = fs.readdirSync(directoryPath).filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
      }
  } catch (e) {
      console.error(e);
  }

  return (
    <div className="p-10 grid grid-cols-4 gap-4 bg-white text-black">
      {files.map((file) => (
        <div key={file} className="border p-2">
            <p className="text-xs truncate mb-2">{file}</p>
            <div className="relative h-40 w-full">
                <Image src={`/preview/${file}`} alt={file} fill className="object-contain" />
            </div>
        </div>
      ))}
    </div>
  );
}

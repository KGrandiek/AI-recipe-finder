'use client' 

import CopilotChat from '../components/CopilotChat'

export default function Home() {
  
  return (
    <div className="p-20">
      <h2 className="text-center text-4xl font-bold mb-8 text-[#a03c5e]">Recipe Finder</h2>
      <CopilotChat />
    </div>
  );
};
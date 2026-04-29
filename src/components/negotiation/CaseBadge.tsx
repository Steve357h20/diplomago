import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface CaseBadgeProps {
  id: string;
  name: string;
  relevance: string;
}

export default function CaseBadge({ id, name, relevance }: CaseBadgeProps) {
  return (
    <div className="mt-2 p-2 bg-amber-500/5 rounded-lg border border-amber-500/20 text-xs">
      <div className="flex items-center gap-1 text-amber-400 mb-1">
        <BookOpen className="w-3 h-3" />
        <span className="font-medium">历史参考</span>
      </div>
      {id !== 'general' ? (
        <Link href={`/cases/${id}`} className="text-slate-300 hover:text-amber-400 transition-colors">
          {name}
        </Link>
      ) : (
        <span className="text-slate-400">{name}</span>
      )}
      <p className="text-slate-500 mt-0.5">{relevance}</p>
    </div>
  );
}
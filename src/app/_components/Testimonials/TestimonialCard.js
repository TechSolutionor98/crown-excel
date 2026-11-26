import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import google from '@/Components/Images/google.svg';

export default function TestimonialCard({ name, message, image, rating = 0, date }) {
  const stars = [1, 2, 3, 4, 5];
  const isLong = (message?.length || 0) > 180;

  let dateLabel = '';
  if (date) {
    try {
      const d = new Date(date);
      if (!isNaN(d)) {
        dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    } catch {}
  }

  function getBgColor(str) {
    const colors = [
      'bg-[#16CA9A]', 'bg-[#119472]', 'bg-[#13745a]', 'bg-[#0d5c47]', 'bg-[#084032]',
      'bg-[#FF7A00]', 'bg-[#4ade80]', 'bg-[#22c55e]', 'bg-[#3b82f6]', 'bg-[#f59e42]'
    ];
    if (!str) return colors[0];
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }

  return (
    <article className="group relative w-full max-w-[95vw] sm:max-w-[95vw] md:max-w-[520px] lg:max-w-[450px] mx-auto p-[1px] bg-gradient-to-br from-[#16CA9A33] via-white to-[#08403233]">
      <div className="pointer-events-none absolute -top-3 -right-3 h-16 w-16 bg-[#16CA9A33] blur-xl opacity-0" />

      <div className="relative bg-white/95 backdrop-blur p-5 md:p-6 h-[260px] md:h-[270px] flex flex-col rounded overflow-hidden">
        <div className="flex relative items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-1 ring-gray-200 bg-white flex-shrink-0 flex items-center justify-center">
              {image && (typeof image === 'object' || (typeof image === 'string' && image.trim() !== '')) ? (
                <Image src={image} alt={name || 'Reviewer'} width={56} height={56} className="object-cover" />
              ) : (
                <span
                  className={`w-full h-full flex items-center justify-center text-2xl font-bold text-white select-none ${getBgColor(name)}`}
                  style={{ minWidth: 56, minHeight: 56 }}
                >
                  {(name && typeof name === 'string' && name.trim().length > 0)
                    ? name.trim().charAt(0).toUpperCase()
                    : '?'}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="flex max-w-[160px] flex-wrap text-[18px] font-[600] leading-[20px] font-inter text-black break-words whitespace-normal md:max-w-[220px]">
                {name || 'Anonymous'}
              </span>
              <div className="text-gray-400 text-[13px] font-montserrat mt-0.5" suppressHydrationWarning>{dateLabel}</div>
            </div>
          </div>

          <div className="flex items-center ml-4 absolute right-0 top-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 px-2.5 py-1 bg-white/70">
              <Image src={google} alt="Google" width={18} height={18} />
              <span className="text-xs text-gray-600 font-medium">Review</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-2 ml-1">
          {stars.map((s) => (
            <FaStar
              key={s}
              className={`text-[14px] md:text-[16px] ${s <= rating ? 'text-[#FF7A00]' : 'text-gray-300'}`}
            />
          ))}
        </div>

        <div className="relative mt-2 flex-1 ml-1">
          <p
            className="font-google text-[#1f1f1f] tracking-[0.1px] text-[15px] md:text-[14px] leading-[24px] md:leading-[1.25rem] text-left"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={message}
          >
            {message || 'No message provided.'}
          </p>
          {isLong && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-14 h-6 bg-gradient-to-t from-white via-white/70 to-transparent" />
          )}
        </div>

        <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </article>
  );
}


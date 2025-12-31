import React from 'react';

const JhilimiliLights: React.FC = () => {
  // Nepali Jhilimili (Twinkling) colors
  const colors = [
    "bg-rose-500 shadow-rose-500", 
    "bg-amber-400 shadow-amber-400", 
    "bg-emerald-500 shadow-emerald-500", 
    "bg-cyan-400 shadow-cyan-400", 
    "bg-purple-500 shadow-purple-500"
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-30 pointer-events-none select-none overflow-hidden">
      {/* Container for the strings */}
      <div className="flex w-[120%] -ml-[10%] justify-between -mt-2">
        {/* Generate multiple segments of hanging lights */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="relative flex-1 min-w-[80px] md:min-w-[120px] h-32 md:h-48">
            
            {/* The Wire - Curve logic: Starts 0,0 -> Control 50,100 -> End 100,0 */}
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M0,0 Q50,100 100,0" 
                fill="none" 
                stroke="rgba(255,255,255,0.4)" 
                strokeWidth="1.5" 
                className="drop-shadow-sm"
              />
            </svg>
            
            {/* 
               Bulb Positioning Math based on Quad Bezier Q50,100:
               t=0.2 (20% x) -> y = 2(0.8)(0.2)*100 = 32%
               t=0.5 (50% x) -> y = 2(0.5)(0.5)*100 = 50%
               t=0.8 (80% x) -> y = 2(0.2)(0.8)*100 = 32%
            */}

            {/* Bulb 1 (Left 20%) */}
            <div className="absolute top-[32%] left-[20%] -translate-x-1/2 origin-top animate-swing" style={{ animationDelay: `${i * 0.1}s` }}>
               <div className="flex flex-col items-center">
                 {/* Socket sits on line - Pull up slightly with -mt-[2px] to overlap wire */}
                 <div className="w-[4px] h-[5px] bg-slate-700 rounded-t-[1px] -mt-[2px]"></div>
                 {/* Bulb hangs below */}
                 <div 
                   className={`w-2 h-4 rounded-full ${colors[i % 5]} shadow-[0_0_12px_currentColor] animate-pulse`} 
                   style={{ animationDuration: '2s', animationDelay: `${Math.random()}s` }}
                 ></div>
               </div>
            </div>

            {/* Bulb 2 (Center 50%) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 origin-top animate-swing" style={{ animationDelay: `${i * 0.1 + 0.5}s` }}>
               <div className="flex flex-col items-center">
                 <div className="w-[4px] h-[5px] bg-slate-700 rounded-t-[1px] -mt-[2px]"></div>
                 <div 
                   className={`w-2 h-4 rounded-full ${colors[(i + 2) % 5]} shadow-[0_0_12px_currentColor] animate-pulse`} 
                   style={{ animationDuration: '3s', animationDelay: `${Math.random() + 0.5}s` }}
                 ></div>
               </div>
            </div>

            {/* Bulb 3 (Right 80%) */}
            <div className="absolute top-[32%] right-[20%] translate-x-1/2 origin-top animate-swing" style={{ animationDelay: `${i * 0.1 + 1}s` }}>
               <div className="flex flex-col items-center">
                 <div className="w-[4px] h-[5px] bg-slate-700 rounded-t-[1px] -mt-[2px]"></div>
                 <div 
                   className={`w-2 h-4 rounded-full ${colors[(i + 3) % 5]} shadow-[0_0_12px_currentColor] animate-pulse`} 
                   style={{ animationDuration: '2.5s', animationDelay: `${Math.random() + 1}s` }}
                 ></div>
               </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default JhilimiliLights;
(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/orbiting-circles-02-utils/particalsphear.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ParticleSphereAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const PARTICLE_COUNT = 120;
const RADIUS = 75;
function ParticleSphereAnimation() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ParticleSphereAnimation.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const dpr = window.devicePixelRatio || 1;
            const updateCanvasSize = {
                "ParticleSphereAnimation.useEffect.updateCanvasSize": ()=>{
                    canvas.width = canvas.offsetWidth * dpr;
                    canvas.height = canvas.offsetHeight * dpr;
                    ctx.scale(dpr, dpr);
                }
            }["ParticleSphereAnimation.useEffect.updateCanvasSize"];
            updateCanvasSize();
            const particles = [];
            for(let i = 0; i < PARTICLE_COUNT; i++){
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                const r = RADIUS;
                particles.push({
                    x: r * Math.sin(phi) * Math.cos(theta),
                    y: r * Math.sin(phi) * Math.sin(theta),
                    z: r * Math.cos(phi),
                    vx: (Math.random() - 0.5) * 0.01,
                    vy: (Math.random() - 0.5) * 0.01,
                    vz: (Math.random() - 0.5) * 0.01
                });
            }
            const centerX = canvas.offsetWidth / 2;
            const centerY = canvas.offsetHeight / 2;
            let animationId;
            let time = 0;
            const animate = {
                "ParticleSphereAnimation.useEffect.animate": ()=>{
                    animationId = requestAnimationFrame(animate);
                    time += 0.01;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Draw glow
                    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, RADIUS + 20);
                    gradient.addColorStop(0, "rgba(147, 51, 234, 0.4)");
                    gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.1)");
                    gradient.addColorStop(1, "rgba(147, 51, 234, 0)");
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, RADIUS + 20, 0, Math.PI * 2);
                    ctx.fill();
                    // Draw connecting lines
                    ctx.strokeStyle = "rgba(147, 51, 234, 0.15)";
                    ctx.lineWidth = 1;
                    for(let i = 0; i < particles.length; i++){
                        for(let j = i + 1; j < particles.length; j++){
                            const dx = particles[i].x - particles[j].x;
                            const dy = particles[i].y - particles[j].y;
                            const dz = particles[i].z - particles[j].z;
                            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                            if (dist < 50) {
                                const opacity = 1 - dist / 50;
                                ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.3})`;
                                ctx.beginPath();
                                ctx.moveTo(centerX + particles[i].x, centerY + particles[i].y);
                                ctx.lineTo(centerX + particles[j].x, centerY + particles[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                    // Draw particles
                    for(let i = 0; i < particles.length; i++){
                        const p = particles[i];
                        // Rotate around Y axis
                        const cosY = Math.cos(time * 0.3);
                        const sinY = Math.sin(time * 0.3);
                        const rotatedX = p.x * cosY - p.z * sinY;
                        const rotatedZ = p.x * sinY + p.z * cosY;
                        // Rotate around X axis
                        const cosX = Math.cos(time * 0.2);
                        const sinX = Math.sin(time * 0.2);
                        const finalY = p.y * cosX - rotatedZ * sinX;
                        const finalZ = p.y * sinX + rotatedZ * cosX;
                        const scale = 1 + finalZ / RADIUS;
                        const screenX = centerX + rotatedX;
                        const screenY = centerY + finalY;
                        const size = Math.max(0.5, scale * 2.5);
                        // Particle glow
                        const particleGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
                        particleGradient.addColorStop(0, "rgba(147, 51, 234, 0.8)");
                        particleGradient.addColorStop(1, "rgba(147, 51, 234, 0)");
                        ctx.fillStyle = particleGradient;
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.fillStyle = "#9333ea";
                        ctx.beginPath();
                        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }["ParticleSphereAnimation.useEffect.animate"];
            animate();
            const handleResize = {
                "ParticleSphereAnimation.useEffect.handleResize": ()=>{
                    updateCanvasSize();
                }
            }["ParticleSphereAnimation.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "ParticleSphereAnimation.useEffect": ()=>{
                    cancelAnimationFrame(animationId);
                    window.removeEventListener("resize", handleResize);
                }
            })["ParticleSphereAnimation.useEffect"];
        }
    }["ParticleSphereAnimation.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "w-full h-full",
        style: {
            display: "block"
        }
    }, void 0, false, {
        fileName: "[project]/src/components/ui/orbiting-circles-02-utils/particalsphear.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(ParticleSphereAnimation, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ParticleSphereAnimation;
var _c;
__turbopack_context__.k.register(_c, "ParticleSphereAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/orbiting-circles-02.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrbitingCirclesGlobeDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$orbiting$2d$circles$2d$02$2d$utils$2f$particalsphear$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/orbiting-circles-02-utils/particalsphear.tsx [app-client] (ecmascript)");
"use client";
;
;
;
const orbits = [
    {
        size: "w-110 h-110 md:w-180 md:h-180",
        duration: 18,
        icons: [
            {
                src: "/images/html.png",
                alt: "HTML",
                angle: -60
            },
            {
                src: "/images/css.png",
                alt: "CSS",
                angle: 0
            },
            {
                src: "/images/react.png",
                alt: "React",
                angle: 60
            },
            {
                src: "/images/streamlit.png",
                alt: "Streamlit",
                angle: 90
            }
        ]
    },
    {
        size: "w-150 h-150 md:w-220 md:h-220",
        duration: 24,
        icons: [
            {
                src: "/images/pyhton.png",
                alt: "Python",
                angle: 0
            },
            {
                src: "/images/c++.png",
                alt: "C++",
                angle: -90
            },
            {
                src: "/images/java.png",
                alt: "Java",
                angle: 120
            },
            {
                src: "/images/js.png",
                alt: "JavaScript",
                angle: 30
            }
        ]
    },
    {
        size: "w-180 h-180 md:w-265 md:h-265",
        duration: 30,
        icons: [
            {
                src: "/images/claude.png",
                alt: "Claude",
                angle: -60
            },
            {
                src: "/images/Cursor.png",
                alt: "Cursor AI",
                angle: 0
            },
            {
                src: "/images/antigravity.png",
                alt: "AntiGravity",
                angle: 60
            },
            {
                src: "/images/figma.png",
                alt: "Figma",
                angle: 120
            }
        ]
    }
];
function OrbitingCirclesGlobeDemo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-110 md:h-160 overflow-hidden flex justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 aspect-square pointer-events-none w-75 md:w-145 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$orbiting$2d$circles$2d$02$2d$utils$2f$particalsphear$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            orbits.map((orbit, index)=>{
                const isCW = index % 2 === 0;
                const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
                const counterAnim = isCW ? "counter-cw" : "counter-ccw";
                const allIcons = [
                    ...orbit.icons,
                    ...orbit.icons.map((ic)=>({
                            ...ic,
                            angle: ic.angle + 180,
                            alt: `${ic.alt}-mirror`
                        }))
                ];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`,
                    children: allIcons.map((iconData, iconIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-0 left-1/2 h-1/2 -ml-8 origin-bottom flex flex-col justify-start items-center",
                            style: {
                                "--start-angle": `${iconData.angle}deg`,
                                animation: `${orbitAnim} ${orbit.duration}s linear infinite`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 sm:p-4 border border-border rounded-full bg-background -mt-8 relative z-10",
                                style: {
                                    "--counter-offset": `${-iconData.angle}deg`,
                                    animation: `${counterAnim} ${orbit.duration}s linear infinite`
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: iconData.src,
                                    alt: iconData.alt,
                                    width: 32,
                                    height: 32,
                                    className: "w-6 h-6 md:w-8 md:h-8"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                                    lineNumber: 107,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                                lineNumber: 98,
                                columnNumber: 17
                            }, this)
                        }, iconIndex, false, {
                            fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                            lineNumber: 88,
                            columnNumber: 15
                        }, this))
                }, index, false, {
                    fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
                    lineNumber: 83,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/orbiting-circles-02.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = OrbitingCirclesGlobeDemo;
var _c;
__turbopack_context__.k.register(_c, "OrbitingCirclesGlobeDemo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_ui_0jg6l04._.js.map
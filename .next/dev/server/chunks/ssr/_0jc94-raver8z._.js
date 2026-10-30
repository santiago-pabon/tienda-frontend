(()=>{"use strict";module.exports = [
"[project]/components/agregar-al-carrito.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AgregarAlCarrito
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$carrito$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/carrito.ts [app-ssr] (ecmascript)");
"use client";
;
;
function AgregarAlCarrito({ producto }) {
    function agregarAlCarrito() {
        if (producto.stock <= 0) {
            alert("Este producto no está disponible.");
            return;
        }
        try {
            const carrito = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$carrito$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["leerCarrito"])();
            const existente = carrito.find((item)=>item.documentId === producto.documentId);
            if (existente) {
                if (existente.cantidad >= producto.stock) {
                    alert("Ya alcanzaste el stock disponible de este producto.");
                    return;
                }
                existente.cantidad += 1;
            } else {
                carrito.push({
                    documentId: producto.documentId,
                    name: producto.name,
                    price: Number(producto.price),
                    stock: Number(producto.stock),
                    cantidad: 1,
                    image: producto.image ?? null
                });
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$carrito$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["guardarCarrito"])(carrito);
            alert(`${producto.name} se agregó al carrito.`);
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
            alert("No se pudo guardar el producto.");
        }
    }
    if (producto.stock <= 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            disabled: true,
            className: "block w-full cursor-not-allowed rounded-xl bg-gray-700 px-6 py-4 font-black text-gray-400",
            children: "PRODUCTO AGOTADO"
        }, void 0, false, {
            fileName: "[project]/components/agregar-al-carrito.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: agregarAlCarrito,
        className: "block w-full rounded-xl bg-[#d4af37] px-6 py-4 font-black text-black transition hover:-translate-y-1 hover:bg-[#f0d675]",
        children: "AGREGAR AL CARRITO"
    }, void 0, false, {
        fileName: "[project]/components/agregar-al-carrito.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/carrito.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLAVE_CARRITO",
    ()=>CLAVE_CARRITO,
    "guardarCarrito",
    ()=>guardarCarrito,
    "leerCarrito",
    ()=>leerCarrito
]);
const CLAVE_CARRITO = "elite-carrito";
function leerCarrito() {
    try {
        const guardado = localStorage.getItem(CLAVE_CARRITO);
        const datos = guardado ? JSON.parse(guardado) : [];
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        console.error("Error al leer el carrito:", error);
        return [];
    }
}
function guardarCarrito(productos) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(productos));
    window.dispatchEvent(new Event("carrito-actualizado"));
}
}),
];})()

//# sourceMappingURL=_0jc94-raver8z._.js.map
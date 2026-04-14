"use client"

import { toast } from "sonner";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: "Tops" | "Bottoms" | "Shoes" | "Accessories";
  rating: number;
  gradient: string;
  emoji: string;
  description: string;
};

const FLUTTER_BLUE = "#0553B1";
const FLUTTER_LIGHT = "#13B9FD";

const PRODUCTS: Product[] = [
  { id: "p1", name: "Cotton Essentials Tee", price: 28, category: "Tops", rating: 4.8, gradient: "from-blue-400 to-cyan-500", emoji: "👕", description: "Soft combed cotton, tailored fit, ten washes deep." },
  { id: "p2", name: "Classic Denim Jacket", price: 89, category: "Tops", rating: 4.9, gradient: "from-indigo-400 to-blue-600", emoji: "🧥", description: "14oz selvedge denim, brass hardware, made to last." },
  { id: "p3", name: "Relaxed Chinos", price: 64, category: "Bottoms", rating: 4.7, gradient: "from-amber-300 to-orange-400", emoji: "👖", description: "Stretch twill, tapered leg, wrinkle-resistant." },
  { id: "p4", name: "Runner SL Sneaker", price: 124, category: "Shoes", rating: 4.9, gradient: "from-red-400 to-rose-500", emoji: "👟", description: "Knit upper, foam midsole, laceless comfort." },
  { id: "p5", name: "Minimalist Watch", price: 195, category: "Accessories", rating: 5.0, gradient: "from-slate-400 to-slate-700", emoji: "⌚", description: "38mm brushed steel, sapphire glass, leather band." },
  { id: "p6", name: "Canvas Tote Bag", price: 42, category: "Accessories", rating: 4.6, gradient: "from-amber-400 to-yellow-500", emoji: "👜", description: "Heavy canvas, reinforced straps, interior pocket." },
];

const CATEGORIES = ["All", "Tops", "Bottoms", "Shoes", "Accessories"] as const;

export default function FlutterShowcase() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState<"home" | "cart" | "profile">("home");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("solaris-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("solaris-theme", next ? "dark" : "light");
  };

  const filtered = useMemo(
    () => (category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  );

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
  const cartTotal = Object.entries(cart).reduce((s, [id, q]) => {
    const p = PRODUCTS.find((pr) => pr.id === id);
    return s + (p?.price ?? 0) * q;
  }, 0);

  const addToCart = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const removeFromCart = (id: string) =>
    setCart((c) => {
      const n = { ...c };
      if (n[id] > 1) n[id] -= 1;
      else delete n[id];
      return n;
    });

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${FLUTTER_BLUE}, ${FLUTTER_LIGHT})`, boxShadow: `0 8px 24px ${FLUTTER_BLUE}33` }}
            >
              ▲
            </span>
            <div className="leading-tight">
              <div className="text-base font-semibold">Solaris Shop</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Flutter 3 mobile app preview</div>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleDark}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Toggle dark mode"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </header>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px]">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: FLUTTER_LIGHT }} />
              Flutter 3.19 · Dart · Material 3
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Cross-platform mobile, one codebase.
            </h1>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">
              This is a live Flutter-style mini app running inside a phone frame to the right. Tap
              products, add to cart, switch tabs — the whole thing works. The real Flutter app compiles
              to the same UI on iOS and Android.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-lg">
              <Feature
                title="Material Design 3"
                desc="Dynamic color, elevation, motion — the Google design language."
              />
              <Feature
                title="Single codebase"
                desc="One Dart codebase ships iOS, Android, web, macOS, and Linux."
              />
              <Feature
                title="Compiled to native"
                desc="No bridge. Skia renderer draws every pixel at 60/120fps."
              />
              <Feature
                title="Hot reload"
                desc="Sub-second refresh while you're coding — state preserved."
              />
            </div>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Stack
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Flutter 3.19", "Dart 3.3", "Riverpod", "go_router", "dio", "Freezed", "hive_ce"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <PhoneFrame>
              <div
                className="flex h-full flex-col"
                style={{ fontFamily: "Roboto, ui-sans-serif, system-ui" }}
              >
                {/* Status bar */}
                <div
                  className="flex items-center justify-between px-5 pb-1 pt-2 text-[11px] font-semibold text-white"
                  style={{ background: FLUTTER_BLUE }}
                >
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <span>••••</span>
                    <span>◆</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* App bar */}
                <div
                  className="flex items-center justify-between px-5 py-4 text-white"
                  style={{ background: FLUTTER_BLUE }}
                >
                  <div>
                    <div className="text-[10px] opacity-80">Boston · Deliver in 45 min</div>
                    <div className="text-lg font-semibold">
                      {tab === "home" ? "Solaris Shop" : tab === "cart" ? "Cart" : "Profile"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTab("cart")}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15"
                  >
                    <span className="text-lg">🛒</span>
                    {cartCount > 0 && (
                      <span
                        className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
                        style={{ background: FLUTTER_LIGHT, color: FLUTTER_BLUE }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-slate-50">
                  {tab === "home" && !selected && (
                    <>
                      {/* Categories chips */}
                      <div className="flex gap-2 overflow-x-auto px-4 py-3">
                        {CATEGORIES.map((c) => {
                          const active = c === category;
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setCategory(c)}
                              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                active ? "text-white shadow-md" : "bg-white text-slate-700 shadow-sm"
                              }`}
                              style={active ? { background: FLUTTER_BLUE } : {}}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                      {/* Product grid */}
                      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                        {filtered.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelected(p)}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-md"
                          >
                            <div
                              className={`flex h-28 items-center justify-center bg-gradient-to-br ${p.gradient} text-4xl`}
                            >
                              <div className="drop-shadow-lg">{p.emoji}</div>
                            </div>
                            <div className="flex flex-1 flex-col gap-1 p-3">
                              <div className="truncate text-[11px] font-semibold text-slate-900">
                                {p.name}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                <span style={{ color: "#fbbf24" }}>★</span>
                                {p.rating} · {p.category}
                              </div>
                              <div
                                className="mt-1 text-sm font-bold"
                                style={{ color: FLUTTER_BLUE }}
                              >
                                ${p.price}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {tab === "home" && selected && (
                    <div className="flex flex-col">
                      <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${selected.gradient} text-7xl`}>
                        <button
                          type="button"
                          onClick={() => setSelected(null)}
                          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md"
                        >
                          ←
                        </button>
                        <span className="drop-shadow-2xl">{selected.emoji}</span>
                      </div>
                      <div className="flex flex-col gap-3 bg-white p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          {selected.category}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{selected.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span style={{ color: "#fbbf24" }}>★★★★★</span> {selected.rating} (284)
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600">{selected.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="text-xl font-bold" style={{ color: FLUTTER_BLUE }}>
                            ${selected.price}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(selected.id);
                              setSelected(null);
                            }}
                            className="rounded-full px-5 py-2 text-xs font-bold text-white shadow-md"
                            style={{ background: FLUTTER_BLUE }}
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "cart" && (
                    <div className="flex flex-col gap-3 px-4 py-4">
                      {cartCount === 0 ? (
                        <div className="flex h-60 flex-col items-center justify-center gap-2 text-center text-slate-500">
                          <div className="text-4xl">🛍</div>
                          <div className="text-sm">Your cart is empty</div>
                          <button
                            type="button"
                            onClick={() => setTab("home")}
                            className="mt-3 rounded-full px-4 py-1.5 text-xs font-bold text-white"
                            style={{ background: FLUTTER_BLUE }}
                          >
                            BROWSE PRODUCTS
                          </button>
                        </div>
                      ) : (
                        <>
                          {Object.entries(cart).map(([id, qty]) => {
                            const p = PRODUCTS.find((pr) => pr.id === id)!;
                            return (
                              <div
                                key={id}
                                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                              >
                                <div
                                  className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-2xl`}
                                >
                                  {p.emoji}
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-semibold text-slate-900">{p.name}</div>
                                  <div
                                    className="text-sm font-bold"
                                    style={{ color: FLUTTER_BLUE }}
                                  >
                                    ${p.price}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(id)}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm"
                                  >
                                    −
                                  </button>
                                  <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                                  <button
                                    type="button"
                                    onClick={() => addToCart(id)}
                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                          <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between text-xs text-slate-600">
                              <span>Subtotal</span>
                              <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                              <span>Delivery</span>
                              <span className="font-semibold">$4.99</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-sm font-bold">
                              <span>Total</span>
                              <span style={{ color: FLUTTER_BLUE }}>
                                ${(cartTotal + 4.99).toFixed(2)}
                              </span>
                            </div>
                            <button
                              type="button"
                              className="mt-3 w-full rounded-full py-3 text-xs font-bold text-white shadow-md"
                              style={{ background: FLUTTER_BLUE }}
                             onClick={() => toast("Opening checkout...")}>
                              CHECKOUT
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {tab === "profile" && (
                    <div className="flex flex-col items-center gap-4 px-4 py-8 text-center">
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg"
                        style={{ background: FLUTTER_BLUE }}
                      >
                        SA
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Shai A.</div>
                        <div className="text-xs text-slate-500">shai@solaris.demo</div>
                      </div>
                      <div className="mt-4 grid w-full grid-cols-3 gap-2 text-xs">
                        {[
                          { k: "Orders", v: "12" },
                          { k: "Wishlist", v: "8" },
                          { k: "Reviews", v: "4" },
                        ].map((s) => (
                          <div key={s.k} className="rounded-2xl bg-white p-3 shadow-sm">
                            <div
                              className="text-lg font-bold"
                              style={{ color: FLUTTER_BLUE }}
                            >
                              {s.v}
                            </div>
                            <div className="text-[10px] text-slate-500">{s.k}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex w-full flex-col gap-2 text-left text-xs">
                        {[
                          { icon: "📦", label: "My orders" },
                          { icon: "💳", label: "Payment methods" },
                          { icon: "📍", label: "Addresses" },
                          { icon: "🔔", label: "Notifications" },
                          { icon: "↪", label: "Sign out" },
                        ].map((l) => (
                          <button
                            key={l.label}
                            type="button"
                            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-900 shadow-sm"
                          >
                            <span className="text-lg">{l.icon}</span>
                            <span className="flex-1 font-medium">{l.label}</span>
                            <span className="text-slate-400">›</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* FAB */}
                {tab === "home" && !selected && (
                  <button
                    type="button"
                    onClick={() => setTab("cart")}
                    className="absolute bottom-20 right-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-2xl"
                    style={{ background: FLUTTER_LIGHT, boxShadow: `0 12px 32px ${FLUTTER_LIGHT}66` }}
                  >
                    ⇪
                  </button>
                )}

                {/* Bottom nav */}
                <nav className="flex items-center justify-around border-t border-slate-200 bg-white py-2">
                  {[
                    { id: "home", icon: "🏠", label: "Home" },
                    { id: "cart", icon: "🛒", label: "Cart" },
                    { id: "profile", icon: "👤", label: "Profile" },
                  ].map((t) => {
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setTab(t.id as typeof tab);
                          setSelected(null);
                        }}
                        className="flex flex-col items-center gap-0.5 px-4 py-1"
                      >
                        <span className="text-xl">{t.icon}</span>
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: active ? FLUTTER_BLUE : "#94a3b8" }}
                        >
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </PhoneFrame>
          </div>
        </div>

        <footer className="mt-16 text-center text-xs text-slate-400">
          Built with Flutter 3 + Dart · © {new Date().getFullYear()} Solaris Shop
        </footer>
      </div>
    </main>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-[44px] border-[12px] border-slate-900 bg-slate-900 shadow-2xl"
        style={{ width: 360, height: 760 }}
      >
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-slate-900" />
        <div className="relative h-full w-full overflow-hidden rounded-[32px]">
          {children}
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">{desc}</div>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  ChevronRight,
  Info,
  MapPin,
  Clock,
  Phone,
  Search,
  Plus,
  Minus,
  Check,
  Smartphone,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AccentColorKey, FormData } from "../types";

export const ACCENT_THEMES: Record<
  AccentColorKey,
  { name: string; bg: string; text: string; accent: string }
> = {
  dulivi: {
    name: "Dulivi Blue",
    bg: "#1d84ff",
    text: "#ffffff",
    accent: "#0c62e6",
  },
  emerald: {
    name: "Verde Fresh",
    bg: "#10b981",
    text: "#ffffff",
    accent: "#047857",
  },
  amber: {
    name: "Laranja Hot",
    bg: "#f59e0b",
    text: "#ffffff",
    accent: "#b45309",
  },
  violet: {
    name: "Roxo Premium",
    bg: "#8b5cf6",
    text: "#ffffff",
    accent: "#6d28d9",
  },
  rose: {
    name: "Rosa Saboroso",
    bg: "#f43f5e",
    text: "#ffffff",
    accent: "#be123c",
  },
};

interface StorePreviewProps {
  formData: Partial<FormData>;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const StorePreview: React.FC<StorePreviewProps> = ({ formData }) => {
  const [activeCategory, setActiveCategory] = useState("Burger");
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderSent, setOrderSent] = useState(false);

  const storeName = formData.name?.trim() || "Dulivi Burger";
  const accentKey = formData.accentColor || "dulivi";
  const activeTheme = ACCENT_THEMES[accentKey];

  const categories = ["Burger", "Pizzas", "Bebidas"];

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Double Cheddar Burger",
      description:
        "Dois blends suculentos de 120g, cheddar duplo cremoso, cebola grelhada e molho artesanal.",
      price: 28.9,
      category: "Burger",
      image:
        "https://nhjelkpvlxqkibdlzzvm.supabase.co/storage/v1/object/public/dulivi/cardapio/20260605014549543Z_1a1f0094-6081-418a-89e8-e33c27371455.webp",
    },
    {
      id: "2",
      name: "Chicken Burger Special",
      description:
        "Coxa e sobrecoxa de frango desossada e empanada, alface crespa, maionese verde e pão brioche.",
      price: 24.9,
      category: "Burger",
      image:
        "https://nhjelkpvlxqkibdlzzvm.supabase.co/storage/v1/object/public/dulivi/cardapio/20260626071635969Z_ed93193a-0a38-400f-88e8-a9e2b14deb8f.webp",
    },
    {
      id: "3",
      name: "Pizza Calabresa com Catupiry",
      description:
        "Molho de tomate artesanal, muçarela, calabresa fatiada, cebola roxa e o legítimo Catupiry.",
      price: 42.0,
      category: "Pizzas",
      image:
        "https://nhjelkpvlxqkibdlzzvm.supabase.co/storage/v1/object/public/dulivi/cardapio/20260626072258185Z_becf1f08-26b7-4e3f-a141-3c824fddf7f9.webp",
    },
    {
      id: "4",
      name: "Pizza Quatro Queijos",
      description:
        "Muçarela premium, provolone, parmesão ralado e gorgonzola cremosa com orégano fresco.",
      price: 48.0,
      category: "Pizzas",
      image:
        "https://nhjelkpvlxqkibdlzzvm.supabase.co/storage/v1/object/public/dulivi/cardapio/20260626072229095Z_4ecfeee9-f196-4388-b3a5-9f397a1cdefb.webp",
    },
    {
      id: "5",
      name: "Suco Natural Laranja 500ml",
      description:
        "Suco natural feito de laranjas selecionadas, gelado e refrescante.",
      price: 8.5,
      category: "Bebidas",
      image:
        "https://nhjelkpvlxqkibdlzzvm.supabase.co/storage/v1/object/public/dulivi/cardapio/20260626072713058Z_4ecb67e8-26c3-436d-b373-6827fab722d3.webp",
    },
    {
      id: "6",
      name: "Refrigerante Lata 350ml",
      description: "Coca-cola original, zero ou Guaraná Antarctica geladinho.",
      price: 6.0,
      category: "Bebidas",
      image:
        "https://nhjelkpvlxqkibdlzzvm.supabase.co/storage/v1/object/public/dulivi/cardapio/20260626071929149Z_1f536e70-b2cb-45b3-ae96-572390e38d97.webp",
    },
  ];

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory,
  );

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] <= 1) {
        delete copy[id];
      } else {
        copy[id] -= 1;
      }
      return copy;
    });
  };

  const totalItems: number = (Object.values(cart) as number[]).reduce(
    (sum: number, count: number) => sum + count,
    0,
  );
  const totalPrice: number = (
    Object.entries(cart) as [string, number][]
  ).reduce((sum: number, [id, count]: [string, number]) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);

  const handleSendOrder = () => {
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      setCart({});
    }, 4000);
  };

  return (
    <div
      className="relative mx-auto max-w-[340px] w-full"
      id="store-preview-wrapper"
    >
      {/* Decorative Badge */}
      {/* <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 bg-slate-900/95 backdrop-blur-md text-black text-xs px-4 py-2 rounded-full shadow-lg border border-white/10 z-10 whitespace-nowrap">
        <Sparkles size={12} className="text-amber-400 animate-pulse" />
        <span>Demonstração do seu Cardápio</span>
      </div> */}

      {/* Main Phone frame container */}
      <div className="relative border-[10px] border-slate-900 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] bg-slate-50 overflow-hidden w-full aspect-[9/19.5]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-slate-800 rounded-full mb-1" />
          <div className="w-3 h-3 bg-slate-950 rounded-full absolute right-6 top-1.5 border border-slate-800" />
        </div>

        {/* Dynamic Status Bar */}
        <div className="absolute top-6 left-0 right-0 h-6 px-6 flex justify-between items-center text-[10px] font-bold text-slate-700 z-30 select-none">
          <span>17:22</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] bg-slate-200 px-1 py-0.5 rounded text-slate-600 font-mono">
              5G
            </span>
            <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-4 bg-slate-800 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Scrollable Content inside phone screen */}
        <div className="absolute inset-0 pt-12 pb-14 overflow-y-auto no-scrollbar flex flex-col bg-white">
          {/* Header Banner */}
          <div className="p-5 pt-6 text-black transition-all duration-500 relative overflow-hidden">
            {/* Background geometric accents */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -left-10 -top-10 w-24 h-24 bg-black/10 rounded-full blur-lg" />

            <div className="relative flex justify-between items-start">
              <div>
                <span className="inline-block text-[9px] font-extrabold uppercase bg-white/20 backdrop-blur-md text-black px-2 py-0.5 rounded-full mb-1.5 tracking-wider">
                  Aberto • Até 23:59
                </span>
                <h3 className="text-xl font-display font-black leading-tight drop-shadow-xs truncate max-w-[190px]">
                  {storeName}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-lg font-black shadow-inner">
                {storeName.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Meta badges inside store */}
            <div className="flex gap-2.5 mt-4 pt-4 border-t border-white/10 text-[10px]">
              <div className="flex items-center gap-1 opacity-90">
                <Clock size={10} />
                <span>25-45 min</span>
              </div>
              {/* <div className="flex items-center gap-1 opacity-90">
                <MapPin size={10} />
                <span>Apenas Delivery</span>
              </div> */}
              <div className="flex items-center gap-1 opacity-90">
                <ShoppingBag size={10} />
                <span>Pedido Mínimo R$ 20</span>
              </div>
            </div>
          </div>

          {/* Quick Announcement */}
          <div className="bg-amber-50 border-b border-amber-100 p-3 px-4 flex items-center gap-2 text-[11px] text-amber-800 font-medium">
            <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-amber-100 text-amber-700 rounded-full">
              🔔
            </span>
            <span className="truncate">
              Peça pelo WhatsApp com cupom <b>PRIMEIRO10</b>!
            </span>
          </div>

          {/* Categories Tab Bar */}
          <div className="sticky top-0 bg-white border-b border-slate-100 py-3.5 px-4 flex gap-2.5 overflow-x-auto no-scrollbar z-20">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "font-bold"
                      : "bg-slate-50 text-slate-500 hover:text-slate-800"
                  }`}
                  // style={{
                  //   backgroundColor: isSelected ? activeTheme.bg : undefined,
                  //   color: isSelected ? activeTheme.text : undefined,
                  //   borderColor: isSelected ? activeTheme.bg : undefined,
                  // }}
                >
                  {cat === "Burger" && ""}
                  {cat === "Pizzas" && ""}
                  {cat === "Bebidas" && ""}
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Products List */}
          <div className="p-4 space-y-4 flex-1">
            {filteredItems.map((item) => {
              const qtyInCart = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="p-3 bg-white border border-slate-100 hover:border-slate-200 rounded-2xl flex gap-3 cursor-pointer transition-all hover:shadow-xs active:scale-98 relative"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 select-none">
                    <img
                      src={item.image}
                      className="rounded-xl object-cover w-full h-16"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs truncate leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-black text-slate-800 font-mono">
                        R$ {item.price.toFixed(2).replace(".", ",")}
                      </span>

                      {qtyInCart > 0 ? (
                        <div
                          className="flex items-center gap-2 rounded-lg border border-slate-200 p-0.5 shadow-2xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-100 cursor-pointer"
                          >
                            <Minus size={10} strokeWidth={2.5} />
                          </button>
                          <span className="text-xs font-bold text-slate-800 font-mono w-4 text-center select-none">
                            {qtyInCart}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item.id)}
                            className="w-5 h-5 rounded flex items-center justify-center text-black cursor-pointer"
                            style={{ backgroundColor: activeTheme.bg }}
                          >
                            <Plus size={10} strokeWidth={2.5} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item.id);
                          }}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-black shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          style={{ backgroundColor: activeTheme.bg }}
                        >
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer branding of store */}
          <div className="p-6 border-t border-slate-50 bg-slate-50/50 text-center text-[10px] text-slate-400 select-none">
            <p className="font-bold">© {storeName}</p>
            <p className="mt-0.5">
              Powered by{" "}
              <span className="font-semibold text-slate-500">Dulivi</span>
            </p>
          </div>
        </div>

        {/* Fixed Quick Floating Cart Button */}
        <AnimatePresence>
          {totalItems > 0 && !orderSent && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 z-40"
            >
              <button
                onClick={handleSendOrder}
                className="w-full h-11 rounded-xl text-xs font-extrabold text-black flex items-center justify-between px-4 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                style={{ backgroundColor: activeTheme.bg }}
              >
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md font-mono text-[10px]">
                    {totalItems}
                  </span>
                  <span>Ver sacola</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono">
                    R$ {totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <ChevronRight size={14} strokeWidth={2.5} />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simulated Order Sent Screen / Overlay */}
        <AnimatePresence>
          {orderSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-6 text-center text-black"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20 mb-4"
              >
                <Check size={32} strokeWidth={3} />
              </motion.div>

              <h4 className="text-lg font-black">Pedido Enviado!</h4>
              <p className="text-[11px] text-slate-300 mt-2 leading-relaxed max-w-[200px] mx-auto">
                No app real, Dulivi formata e envia uma mensagem perfeita
                diretamente no seu WhatsApp do restaurante!
              </p>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-left font-mono text-[9px] text-slate-400 mt-5 w-full max-w-[240px] space-y-1 select-all">
                <p className="text-emerald-400 font-bold">
                  💬 Mensagem enviada:
                </p>
                <p>--- NOVO PEDIDO ---</p>
                <p>
                  <b>Estabelecimento:</b> {storeName}
                </p>
                <p>
                  <b>Itens:</b>
                </p>
                {Object.entries(cart).map(([id, qty]) => {
                  const item = menuItems.find((i) => i.id === id);
                  return (
                    <p key={id}>
                      - {qty}x {item?.name}
                    </p>
                  );
                })}
                <p>
                  <b>Total:</b> R$ {totalPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Details Drawer */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 z-40 flex items-end"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                className="bg-white rounded-t-3xl w-full p-5 text-slate-800 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-4 items-start">
                  <div className="text-4xl bg-slate-50 p-2 rounded-2xl select-none">
                    <img src={selectedItem.image} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-sm leading-tight">
                      {selectedItem.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      {selectedItem.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                  <span className="text-sm font-black text-slate-900 font-mono">
                    R$ {selectedItem.price.toFixed(2).replace(".", ",")}
                  </span>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedItem.id);
                      setSelectedItem(null);
                    }}
                    className="h-9 px-5 rounded-lg text-xs font-bold text-black shadow-xs flex items-center gap-1 cursor-pointer"
                    style={{ backgroundColor: activeTheme.bg }}
                  >
                    <span>Adicionar à sacola</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

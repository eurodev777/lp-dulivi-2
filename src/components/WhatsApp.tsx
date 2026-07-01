import SvgWhatsApp from "../svg/SvgWhatsApp";

export default function WhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <a
        target="_blank"
        href="https://api.whatsapp.com/send/?phone=5513991027026&text=Ol%C3%A1%2C+vim+pelo+site+e+gostaria+de+saber+mais+sobre+a+Dulivi&type=phone_number&app_absent=0"
        className="flex items-center gap-3 font-medium bg-[#14C65C] text-white px-6 py-3 rounded-xl shadow-lg 
               transition-transform duration-300 ease-out hover:scale-110 hover:shadow-[0_10px_20px_rgba(20,198,92,0.4)]"
      >
        Conversar com especialista
        <SvgWhatsApp width={20} height={20} fill={"#fff"} />
      </a>
    </div>
  );
}

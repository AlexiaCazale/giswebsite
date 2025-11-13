'use client'

const ScrollToTopButton: React.FC = () => {
    // Função que rola suavemente até o topo
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <button
        onClick={scrollToTop}
        className="fixed bottom-12 right-10 p-4 bg-[#b7426c] hover:bg-[#9d365b] text-white rounded-full shadow-lg transition duration-300"
      >
        ↑
      </button>
    );
  };

  export default ScrollToTopButton;